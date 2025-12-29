import React from 'react';

const Products = () => {
  const dummyBooks = [
    { id: 1, title: 'Sustainable Living', price: '$12.00', img: 'https://via.placeholder.com/150x200?text=Ebook+1' },
    { id: 2, title: 'Digital Minimalism', price: '$0.00', img: 'https://via.placeholder.com/150x200?text=Ebook+2' },
    { id: 3, title: 'The Paperless Path', price: '$8.50', img: 'https://via.placeholder.com/150x200?text=Ebook+3' },
  ];

  return (
    <div style={{padding: '10px'}}>
      <h2 style={{marginBottom: '20px'}}>E-Book Store</h2>
      <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
        {dummyBooks.map(book => (
          <div key={book.id} style={styles.productCard}>
            <img src={book.img} alt="book" style={{borderRadius: '10px', width: '100%'}} />
            <h4 style={{margin: '10px 0 5px 0'}}>{book.title}</h4>
            <p style={{color: '#FF6B6B', fontWeight: 'bold'}}>{book.price}</p>
            <button style={styles.buyBtn}>Add to Library</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  productCard: { width: '180px', padding: '15px', border: '1px solid #eee', borderRadius: '20px', textAlign: 'center' },
  buyBtn: { marginTop: '10px', background: '#82D8FF', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }
};

export default Products;