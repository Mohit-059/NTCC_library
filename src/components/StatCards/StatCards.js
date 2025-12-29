import React from 'react';

const StatCards = () => {
  const stats = [
    { label: 'Books Read', value: 25, color: '#FFE5E5', icon: '📚' },
    { label: 'Authors', value: 12, color: '#FFF9E5', icon: '✍️' },
    { label: 'Trees Saved', value: '2.4', color: '#E5F6FF', icon: '🌳' }, // Sustainability move!
  ];

  return (
    <div style={styles.container}>
      {stats.map((stat, index) => (
        <div key={index} style={styles.card} className="stat-card">
          <div style={{ ...styles.iconBox, backgroundColor: stat.color }}>{stat.icon}</div>
          <div style={styles.info}>
            <span style={styles.value}>{stat.value}</span>
            <span style={styles.label}>{stat.label}</span>
          </div>
        </div>
      ))}
      <style>{`
        .stat-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      `}</style>
    </div>
  );
};

const styles = {
  container: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  card: { flex: '1 1 180px', backgroundColor: 'white', padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #f0f0f0', cursor: 'pointer' },
  iconBox: { width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  info: { display: 'flex', flexDirection: 'column' },
  value: { fontSize: '22px', fontWeight: '800', color: '#333' },
  label: { fontSize: '12px', color: '#999', fontWeight: '600' }
};

export default StatCards;