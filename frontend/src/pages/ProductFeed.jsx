import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductFeed() {
  const [products] = useState([
    { id: 1, title: 'Laptop', price: 500 },
    { id: 2, title: 'Phone', price: 300 },
  ]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product Listings</h2>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
      </select>
      <div>
        {filtered.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <Link to={`/product/${p.id}`}>
              <h3>{p.title}</h3>
            </Link>
            <p>Price: ${p.price}</p>
          </div>
        ))}
      </div>
      <Link to="/add-product">
        <button>+ Add Product</button>
      </Link>
    </div>
  );
}

export default ProductFeed;
