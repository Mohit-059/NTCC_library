import React from 'react';

const ProductDetail = ({ book, onBack }) => {
  // Dummy book data for preview if no book is passed
  const currentBook = book || {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "$12.99",
    description: "A classic novel about the American dream in the 1920s. Paperless version ensures zero trees were harmed.",
    rating: 4.8,
    image: "https://m.media-amazon.com/images/I/71FTb9X6wsL.jpg"
  };

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>← Back to Store</button>
      
      <div style={styles.content}>
        <div style={styles.imageCol}>
          <img src={currentBook.image} alt="cover" style={styles.cover} />
        </div>
        
        <div style={styles.infoCol}>
          <h1 style={styles.title}>{currentBook.title}</h1>
          <p style={styles.author}>by {currentBook.author}</p>
          
          <div style={styles.impactBadge}>🌱 Sustainable Digital Choice</div>
          
          <p style={styles.desc}>{currentBook.description}</p>
          
          <div style={styles.priceSection}>
            <span style={styles.price}>{currentBook.price}</span>
            <button style={styles.buyBtn}>Purchase E-Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', animation: 'fadeIn 0.5s' },
  backBtn: { background: 'none', border: 'none', color: '#FF6B6B', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' },
  content: { display: 'flex', gap: '40px', flexWrap: 'wrap' },
  imageCol: { flex: '1', minWidth: '250px' },
  cover: { width: '100%', maxWidth: '300px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' },
  infoCol: { flex: '2', minWidth: '300px' },
  title: { fontSize: '32px', marginBottom: '10px' },
  author: { fontSize: '18px', color: '#888', marginBottom: '20px' },
  impactBadge: { display: 'inline-block', padding: '5px 15px', borderRadius: '20px', backgroundColor: '#e8f5e9', color: '#2e7d32', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' },
  desc: { lineHeight: '1.6', color: '#555', marginBottom: '30px' },
  priceSection: { display: 'flex', alignItems: 'center', gap: '20px' },
  price: { fontSize: '28px', fontWeight: 'bold', color: '#333' },
  buyBtn: { padding: '15px 30px', borderRadius: '12px', border: 'none', background: '#FF6B6B', color: 'white', fontWeight: 'bold', cursor: 'pointer' }
};

export default ProductDetail;