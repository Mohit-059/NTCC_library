import React from 'react';

const ContinueReading = () => {
  const books = [
    { title: "The Adventures of Tom Sawyer", author: "Mark Twain", progress: 60, image: "https://images-na.ssl-images-amazon.com/images/I/71YdbvS-t9L.jpg" },
    { title: "The Old Man and the Sea", author: "Ernest Hemingway", progress: 40, image: "https://m.media-amazon.com/images/I/716uY860+6L._AC_UF1000,1000_QL80_.jpg" },
    { title: "Sherlock Holmes", author: "Arthur Conan Doyle", progress: 85, image: "https://m.media-amazon.com/images/I/719fH8Xn89L._AC_UF1000,1000_QL80_.jpg" },
    { title: "The Time Machine", author: "H.G. Wells", progress: 20, image: "https://m.media-amazon.com/images/I/718V8f59S7L._AC_UF1000,1000_QL80_.jpg" },
  ];

  return (
    <div style={styles.section}>
      <h3 style={styles.title}>Continue Reading</h3>
      <div style={styles.scrollContainer} className="hide-scrollbar">
        {books.map((book, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img src={book.image} alt={book.title} style={styles.cover} />
            </div>
            <h4 style={styles.bookTitle}>{book.title}</h4>
            <p style={styles.bookAuthor}>{book.author}</p>
            <div style={styles.progressBg}>
              <div style={{ ...styles.progressFill, width: `${book.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const styles = {
  section: { marginTop: '30px', width: '100%' },
  title: { color: '#444', marginBottom: '20px', fontSize: '18px', fontWeight: '600' },
  scrollContainer: { 
    display: 'flex', 
    gap: '25px', 
    overflowX: 'auto', 
    paddingBottom: '15px',
    width: '100%',
    WebkitOverflowScrolling: 'touch' 
  },
  card: { minWidth: '140px', width: '140px' },
  imageWrapper: { width: '100%', height: '190px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' },
  cover: { width: '100%', height: '100%', objectFit: 'cover' },
  bookTitle: { fontSize: '14px', fontWeight: '700', margin: '12px 0 4px 0', color: '#333' },
  bookAuthor: { fontSize: '12px', color: '#999', marginBottom: '12px' },
  progressBg: { width: '100%', height: '4px', backgroundColor: '#eee', borderRadius: '10px' },
  progressFill: { height: '100%', backgroundColor: '#FF6B6B', borderRadius: '10px' }
};

export default ContinueReading;