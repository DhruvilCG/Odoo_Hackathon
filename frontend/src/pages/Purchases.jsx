import React from 'react';

function Purchases() {
  // Dummy data – you can replace with real purchased items
  const purchasedItems = [
    { id: 1, title: 'Laptop', price: 45000 },
    { id: 2, title: 'Phone', price: 20000 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Previous Purchases</h2>
      {purchasedItems.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <ul>
          {purchasedItems.map((item) => (
            <li key={item.id}>
              {item.title} – ₹{item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Purchases;
