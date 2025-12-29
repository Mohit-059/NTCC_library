import React from 'react';

const QuoteBanner = () => {
  return (
    <div style={styles.banner}>
      <div style={styles.badge}>Quote Today</div>
      <h2 style={styles.text}>"I have always imagined that Paradise will be a kind of library."</h2>
      <p style={styles.author}>- Jorge Luis Borges</p>
      
      <style>{`
        @media (max-width: 768px) {
          h2 { fontSize: '20px' !important; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  banner: { 
    background: '#fcfcfc', 
    backgroundImage: `radial-gradient(#eee 1px, transparent 1px)`, 
    backgroundSize: '20px 20px',
    padding: '30px', 
    borderRadius: '25px', 
    border: '1px solid #f0f0f0',
    marginBottom: '30px'
  },
  badge: { display: 'inline-block', backgroundColor: '#82D8FF', color: 'white', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px' },
  text: { fontSize: '26px', color: '#333', margin: '0 0 10px 0', lineHeight: '1.4', maxWidth: '90%' },
  author: { color: '#888', fontSize: '14px', fontStyle: 'italic' }
};

export default QuoteBanner;