import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = { id, title: 'Sample Product', price: 200, description: 'This is a test product.' };

  const handleAddToCart = () => {
    alert(`${product.title} added to cart`);
    navigate('/cart');
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;
