import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MyListings() {
  const [myProducts, setMyProducts] = useState([
    { id: 1, title: 'Laptop', price: 500 },
    { id: 2, title: 'Phone', price: 300 },
  ]);

  const handleDelete = (id) => {
    setMyProducts(myProducts.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Listings</h2>
      <Link to="/add-product">
        <button>+ Add Product</button>
      </Link>
      <div>
        {myProducts.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{p.title}</h3>
            <p>Price: ${p.price}</p>
            <Link to={`/product/${p.id}`}>
              <button>View</button>
            </Link>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;
