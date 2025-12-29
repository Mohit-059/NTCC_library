import React from 'react';

const About = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>The Future is Paperless</h1>
      <p style={styles.desc}>
        Every year, the publishing industry consumes millions of tons of paper. 
        Our E-Book platform is built on the <b>Sustainability First</b> principle.
      </p>
      
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>🌳</div>
          <h3>Save Trees</h3>
          <p>Switching to digital reading prevents deforestation on a massive scale.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardIcon}>🚀</div>
          <h3>Zero Carbon</h3>
          <p>No physical logistics means no shipping emissions. Just instant knowledge.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { maxWidth: '900px', animation: 'fadeIn 0.5s ease' },
  title: { fontSize: '36px', color: '#333', marginBottom: '20px' },
  desc: { fontSize: '18px', color: '#666', lineHeight: '1.6', marginBottom: '40px' },
  grid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: { flex: '1 1 250px', padding: '30px', borderRadius: '25px', backgroundColor: '#f9f9f9', border: '1px solid #eee' },
  cardIcon: { fontSize: '40px', marginBottom: '15px' }
};

export default About;