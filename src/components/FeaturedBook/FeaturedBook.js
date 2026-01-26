import React from 'react';

const FeaturedBook = ({ book, onClick }) => {
  if (!book) return null; // Or a loading skeleton

  return (
    <div style={styles.card}>
      <div style={styles.flexContainer}>
        <img src={book.cover_url} alt={book.title} style={styles.cover} />
        <div style={styles.info}>
          <p style={styles.question}>
            Did you read <strong>{book.title}</strong> by {book.author}?
          </p>
          <div style={styles.stars}>
            {['★', '★', '★', '★', '☆'].map((s, i) => (
              <span key={i} style={{ color: s === '★' ? '#FFD700' : '#DDD', marginRight: '2px' }}>{s}</span>
            ))}
          </div>
          <button onClick={() => onClick(book)} style={styles.btn}>Read Today</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: { backgroundColor: '#F8F9FB', borderRadius: '24px', padding: '20px', width: '100%', boxSizing: 'border-box' },
  flexContainer: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  cover: { width: '110px', height: '150px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  info: { flex: '1', minWidth: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  question: { fontSize: '14px', color: '#444', lineHeight: '1.5', margin: 0 },
  stars: { margin: '12px 0', fontSize: '18px' },
  btn: {
    backgroundColor: 'white',
    border: '1px solid #EAEAEA',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    transition: '0.2s'
  }
};

export default FeaturedBook;