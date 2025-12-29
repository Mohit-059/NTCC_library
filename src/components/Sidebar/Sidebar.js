import React from 'react';

const Sidebar = ({ activeView, setView, onLogout }) => {
  const menu = [
    { id: 'home', icon: '🏠' },
    { id: 'products', icon: '📚' },
    { id: 'focus', icon: '⏳' },
    { id: 'about', icon: '🌱' },
  ];

  return (
    <div className="sidebar-inner" style={styles.inner}>
      <style>{`
        .sidebar-inner { display: flex; flex-direction: column; align-items: center; height: 100%; width: 100%; }
        .nav-group { display: flex; flex-direction: column; gap: 25px; flex: 1; justify-content: center; }
        .logo-box { margin-bottom: 40px; font-size: 24px; padding-top: 20px; }
        .exit-btn { margin-top: auto; padding-bottom: 30px; cursor: pointer; font-size: 24px; color: white; }

        @media (max-width: 768px) {
          .sidebar-inner { flex-direction: row !important; justify-content: space-around; padding: 0 10px; }
          .nav-group { flex-direction: row !important; gap: 15px; margin: 0; }
          .logo-box, .exit-btn { display: none; } /* Hide logo/exit on mobile bar to save space */
        }
      `}</style>

      <div className="logo-box">📖</div>
      
      <div className="nav-group">
        {menu.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setView(item.id)}
            style={{
              fontSize: '22px',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '12px',
              backgroundColor: activeView === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: activeView === item.id ? '#fff' : 'rgba(255,255,255,0.6)'
            }}
          >
            {item.icon}
          </div>
        ))}        
      </div>

      <div className="exit-btn" onClick={onLogout}>↳</div>
      
      <style>{`
        @media (max-width: 768px) { .mobile-only-logout { display: block !important; } }
      `}</style>
    </div>
  );
};

const styles = {
  inner: { width: '100%', color: 'white' }
};

export default Sidebar;