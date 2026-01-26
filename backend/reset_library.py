import sqlite3
from database import DB_NAME, get_db_connection
from ingest_archive import seed_database

def reset_library():
    print("🧹 Cleaning up Library (keeping Users intact)...")
    conn = get_db_connection()
    c = conn.cursor()
    
    # Clear tables
    tables_to_clear = ['purchases', 'books', 'comments', 'interactions']
    for table in tables_to_clear:
        c.execute(f"DELETE FROM {table}")
        print(f"   - Cleared {table}")
        
    conn.commit()
    conn.close()
    print("✨ Library cleared! Ready for re-seeding.")
    seed_database()

if __name__ == "__main__":
    reset_library()
