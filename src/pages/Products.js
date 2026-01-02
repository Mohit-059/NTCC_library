import React from 'react';

const Products = ({ setView, setSelectedBook }) => {
  const [books, setBooks] = React.useState([]);
  const [term, setTerm] = React.useState('');
  const [visibleCount, setVisibleCount] = React.useState(20);
  const [isGlobal, setIsGlobal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadLocalBooks();
  }, []);

  const loadLocalBooks = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  };

  const categories = React.useMemo(() => {
    if (isGlobal || term) return {};
    const groups = {};
    books.forEach(book => {
      const cat = book.category || 'Classics';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(book);
    });
    return groups;
  }, [books, isGlobal, term]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setTerm(val);

    if (isGlobal && val.length > 2) {
      setLoading(true);
      fetch(`http://localhost:5000/api/search_external?q=${val}`)
        .then(res => res.json())
        .then(data => {
          setBooks(data);
          setLoading(false);
        })
        .catch(err => setLoading(false));
    }
  };

  const toggleGlobal = (mode) => {
    const wantGlobal = mode === 'global';
    if (isGlobal === wantGlobal) return; // No change

    setIsGlobal(wantGlobal);
    setTerm('');
    setLoading(true);

    if (wantGlobal) {
      fetch(`http://localhost:5000/api/search_external?q=bestseller`)
        .then(res => res.json())
        .then(data => {
          setBooks(data);
          setLoading(false);
        });
    } else {
      loadLocalBooks();
    }
  };

  const filteredBooks = isGlobal ? books : books.filter(b =>
    b.title.toLowerCase().includes(term.toLowerCase()) ||
    b.author.toLowerCase().includes(term.toLowerCase())
  );

  const visibleBooks = filteredBooks.slice(0, visibleCount);
  const showGrid = isGlobal || term !== '';

  return (
    <div style={{ padding: '10px', paddingBottom: '50px' }}>
      <div style={styles.header}>
        <h2 style={{ marginBottom: '20px' }}>E-Book Store</h2>
        <input
          style={styles.search}
          placeholder={isGlobal ? "Search 20M+ books..." : "Filter local books..."}
          value={term}
          onChange={handleSearch}
        />
      </div>

      {/* NEW BANNERS */}
      <div style={styles.bannerContainer}>
        <div
          onClick={() => toggleGlobal('local')}
          style={{ ...styles.banner, border: !isGlobal ? '2px solid #FF6B6B' : '2px solid transparent', opacity: !isGlobal ? 1 : 0.7 }}
        >
          <div style={styles.bannerIcon}>🏠</div>
          <div>
            <h3 style={styles.bannerTitle}>Curated Collection</h3>
            <p style={styles.bannerSub}>Fast, reliable classics & genres.</p>
          </div>
        </div>

        <div
          onClick={() => toggleGlobal('global')}
          style={{ ...styles.banner, border: isGlobal ? '2px solid #4CAF50' : '2px solid transparent', opacity: isGlobal ? 1 : 0.7 }}
        >
          <div style={styles.bannerIcon}>🌎</div>
          <div>
            <h3 style={styles.bannerTitle}>Global Library</h3>
            <p style={styles.bannerSub}>Access 20 Million+ books online.</p>
          </div>
        </div>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>Loading library...</p>}

      {!showGrid && !loading && (
        <div style={styles.rowsContainer}>
          {Object.keys(categories).map(cat => (
            <div key={cat} style={{ marginBottom: '30px' }}>
              <h3 style={styles.catTitle}>{cat} <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#888' }}>›</span></h3>
              <div style={styles.row}>
                {categories[cat].map(book => (
                  <ProductCard key={book.id} book={book} setSelectedBook={setSelectedBook} setView={setView} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showGrid && !loading && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
          {visibleBooks.map(book => (
            <ProductCard key={book.id} book={book} setSelectedBook={setSelectedBook} setView={setView} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ book, setSelectedBook, setView }) => (
  <div style={styles.productCard}>
    <div style={{ height: '220px', overflow: 'hidden', borderRadius: '10px', marginBottom: '10px' }}>
      <img src={book.cover_url} alt="book" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <h4 style={{ margin: '10px 0 5px 0', fontSize: '14px', height: '40px', overflow: 'hidden' }}>{book.title}</h4>
    <p style={{ color: '#888', fontSize: '12px', marginBottom: '5px' }}>{book.author}</p>
    <p style={{ color: '#FF6B6B', fontWeight: 'bold' }}>₹{book.price}</p>
    <button
      onClick={() => { setSelectedBook(book); setView('product-detail'); }}
      style={styles.buyBtn}
    >
      View
    </button>
  </div>
);

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  search: { padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', width: '300px' },

  // New Banner Styles
  bannerContainer: { display: 'flex', gap: '20px', marginBottom: '30px' },
  banner: {
    flex: 1,
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: '0.2s'
  },
  bannerIcon: { fontSize: '30px' },
  bannerTitle: { margin: 0, fontSize: '18px' },
  bannerSub: { margin: 0, color: '#888', fontSize: '14px' },

  rowsContainer: { display: 'flex', flexDirection: 'column' },
  catTitle: { fontSize: '20px', marginBottom: '15px', marginLeft: '5px', display: 'flex', alignItems: 'center', gap: '5px' },
  row: {
    display: 'flex',
    overflowX: 'auto',
    gap: '20px',
    paddingBottom: '15px',
    whiteSpace: 'nowrap',
    scrollbarWidth: 'none'
  },
  productCard: { minWidth: '180px', width: '180px', padding: '15px', border: '1px solid #eee', borderRadius: '20px', textAlign: 'center', height: '360px', backgroundColor: 'white' },
  buyBtn: { marginTop: '10px', background: '#82D8FF', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }
};

export default Products;