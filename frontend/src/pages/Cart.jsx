import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [items, setItems] = useState([
    { id: 1, title: 'Laptop', price: 500 },
    { id: 2, title: 'Phone', price: 300 },
  ]);
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert('Checkout complete!');
    setItems([]);
    navigate('/purchases');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {items.map((it) => (
            <div key={it.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{it.title}</h3>
              <p>${it.price}</p>
            </div>
          ))}
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
