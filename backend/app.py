from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import sqlite3
import os
from database import get_db_connection, init_db

app = Flask(__name__)
CORS(app)

# Initialize DB on startup
init_db()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "AI eBook Backend"})

# --- REAL STORE API ---

@app.route('/api/books', methods=['GET'])
def get_books():
    """Returns the full catalog from the database."""
    conn = get_db_connection()
    books = conn.execute('SELECT * FROM books').fetchall()
    conn.close()
    books_list = [dict(row) for row in books]
    return jsonify(books_list)

@app.route('/api/read/<int:book_id>', methods=['GET'])
def get_book_content(book_id):
    """Returns the Internet Archive Embed URL."""
    conn = get_db_connection()
    book = conn.execute('SELECT title, ia_id FROM books WHERE id = ?', (book_id,)).fetchone()
    conn.close()
    
    if not book:
        return jsonify({"error": "Book not found"}), 404
        
    # Return the Embed URL for the Iframe
    return jsonify({
        "title": book['title'],
        "type": "iframe",
        "url": f"https://archive.org/embed/{book['ia_id']}?ui=embed&wrapper=false"
    })

@app.route('/api/library', methods=['GET'])
def get_library():
    """Returns books purchased by a specific user."""
    user_id = request.args.get('user_id') 
    if not user_id:
        return jsonify([])
        
    conn = get_db_connection()
    # Join books and purchases
    query = '''
        SELECT b.*, p.purchase_date, p.progress, p.user_id 
        FROM books b
        JOIN purchases p ON b.id = p.book_id
        WHERE p.user_id = ?
    '''
    library = conn.execute(query, (user_id,)).fetchall()
    conn.close()
    return jsonify([dict(row) for row in library])

@app.route('/api/purchase', methods=['POST'])
def purchase_book():
    data = request.json
    user_id = data.get('user_id')
    raw_book_id = data.get('book_id')
    
    conn = get_db_connection()
    c = conn.cursor()
    
    # 1. Check if this is a GLOBAL book (string ID) or LOCAL (int ID)
    final_book_id = raw_book_id
    
    if isinstance(raw_book_id, str) and raw_book_id.startswith('ext_'):
        # It's a Global Book. We must importing it into our 'books' table first.
        # We need the metadata (passed from frontend preferably, or we fetch again)
        # For simplicity, let's assume the frontend passes the basic book details in 'book_data'
        book_data = data.get('book_data')
        
        if book_data:
            # Check if we already imported it
            existing = c.execute("SELECT id FROM books WHERE ia_id = ?", (book_data.get('ia_id'),)).fetchone()
            if existing:
                final_book_id = existing['id']
            else:
                # Import new book
                try:
                    c.execute('''
                        INSERT INTO books (ia_id, title, author, category, description, price, rating, cover_url, year)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        book_data.get('ia_id'),
                        book_data.get('title'),
                        book_data.get('author'),
                        'Imported', 
                        'Imported from Global Library',
                        book_data.get('price'),
                        4.5,
                        book_data.get('cover_url'),
                        book_data.get('year')
                    ))
                    final_book_id = c.lastrowid
                except Exception as e:
                    print(f"Import Error: {e}")
                    conn.close()
                    return jsonify({"success": False, "error": "Import failed"})
        else:
             # If frontend didn't send data, we can't save it effectively
             conn.close()
             return jsonify({"success": False, "error": "Missing book data for import"})

    # 2. Record Purchase
    try:
        c.execute('INSERT INTO purchases (user_id, book_id) VALUES (?, ?)', (user_id, final_book_id))
        conn.commit()
        success = True
    except sqlite3.IntegrityError:
        success = False # Already owned
    finally:
        conn.close()
    
    return jsonify({"success": success})

@app.route('/api/progress', methods=['POST'])
def update_progress():
    data = request.json
    user_id = data.get('user_id')
    book_id = data.get('book_id')
    progress = data.get('progress')

    conn = get_db_connection()
    conn.execute('UPDATE purchases SET progress = ? WHERE user_id = ? AND book_id = ?', (progress, user_id, book_id))
    conn.commit()
    conn.close()
    
    return jsonify({"success": True})

@app.route('/recommend', methods=['GET'])
def recommend():
    # ... (Keep existing recommendation logic, but point to DB later)
    # For now, let's just return random distinct books from DB as 'AI' to keep it fast
    # or keep usage of the old pandas frame if we still have catalog.json
    # Let's use the DB for a "real" SQL-based recommendation (e.g. same category)
    
    book_title = request.args.get('book_title', '')
    conn = get_db_connection()
    
    # Simple Content-Based: Find books in same category
    target_book = conn.execute('SELECT category FROM books WHERE title LIKE ?', (f'%{book_title}%',)).fetchone()
    
    if target_book:
        cat = target_book['category']
        recommendations = conn.execute('SELECT * FROM books WHERE category = ? AND title != ? LIMIT 5', (cat, book_title)).fetchall()
        return jsonify([dict(row) for row in recommendations])
    else:
        # Fallback: Random popular books
        recommendations = conn.execute('SELECT * FROM books ORDER BY RANDOM() LIMIT 5').fetchall()
        return jsonify([dict(row) for row in recommendations])

@app.route('/api/search_external', methods=['GET'])
def search_external():
    """Proxies search to OpenLibrary for 'Infinite' content."""
    query = request.args.get('q')
    if not query:
        return jsonify([])
        
    # Enforce English language to avoid random German/Foreign editions
    url = f"https://openlibrary.org/search.json?q={query}&language=eng&limit=20&has_fulltext=true"
    try:
        res = requests.get(url).json()
        results = []
        for doc in res.get('docs', []):
            if 'ia' in doc and 'cover_i' in doc:
                # Deterministic Price Logic (same as ingest)
                price_seed = sum(ord(char) for char in doc['title'])
                price = (price_seed % 500) + 99
                
                results.append({
                    'id': f"ext_{doc.get('key')}", # distinctive ID
                    'ia_id': doc.get('ia')[0],
                    'title': doc.get('title'),
                    'author': doc.get('author_name', ['Unknown'])[0],
                    'cover_url': f"https://covers.openlibrary.org/b/id/{doc.get('cover_i')}-L.jpg",
                    'price': price,
                    'year': doc.get('first_publish_year', 2000),
                    'description': "Imported from Global Library" # Simplified
                })
        return jsonify(results)
    except Exception as e:
        print(f"External Search Error: {e}")
        return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)
