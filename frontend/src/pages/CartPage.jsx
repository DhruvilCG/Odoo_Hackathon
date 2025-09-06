import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const nav = useNavigate();

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://odoo-hackathon-psi.vercel.app/api/cart', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        setItems(Array.isArray(data) ? data : data.cart || []);
      } catch (err) {
        console.error(err.message);
        setItems([]);
      }
    };
    fetchCart();
  }, []);

  // Delete a single item from cart
  const deleteItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://odoo-hackathon-psi.vercel.app/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to delete item');
      // Remove locally
      setItems(items.filter((it) => (it.product?._id || it._id) !== productId));
    } catch (err) {
      console.error(err.message);
      alert('Failed to remove item');
    }
  };

  // Checkout function
  const checkout = async () => {
    if (!user) {
      alert('Login to purchase');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://odoo-hackathon-psi.vercel.app/api/purchases', {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, items }),
      });
      if (!res.ok) throw new Error('Purchase failed');
      await res.json();

      // Clear cart in backend
      await fetch('https://odoo-hackathon-psi.vercel.app/api/cart', {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });

      setItems([]);
      nav('/purchases');
    } catch (err) {
      console.error(err.message);
      alert('Checkout failed');
    }
  };

  if (!items || items.length === 0) {
    return <div className="text-center text-gray-500 font-semibold mt-16">Cart is empty</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 flex justify-center items-center">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-purple-600 text-center">Cart</h2>
          <div className="space-y-4">
            {items.map((it, idx) => {
              const product = it.product || it;
              const productId = product._id || it._id;
              return (
                <div
                  key={idx}
                  className="bg-white p-2 sm:p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500 font-semibold">
                      Img
                    </div>
                    <div>
                      <div className="font-semibold text-base sm:text-lg">{product.title}</div>
                      <div className="text-purple-600 font-bold mt-1 text-sm sm:text-base">₹{product.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-gray-600 font-semibold text-sm sm:text-base">
                      Qty: {it.quantity || 1}
                    </div>
                    <button
                      onClick={() => deleteItem(productId)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={checkout}
            className="mt-6 w-full p-3 sm:p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-sm sm:text-base"
          >
            Checkout
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 sm:p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Enrestt</h3>
            <p className="text-sm">Your trusted marketplace for quality products and exceptional service.</p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-300 text-sm">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300 text-sm">Contact</a></li>
              <li><a href="#" className="hover:text-gray-300 text-sm">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-300 text-sm">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Categories</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-300 text-sm">Electronics</a></li>
              <li><a href="#" className="hover:text-gray-300 text-sm">Books</a></li>
              <li><a href="#" className="hover:text-gray-300 text-sm">Clothing</a></li>
              <li><a href="#" className="hover:text-gray-300 text-sm">Home & Garden</a></li>
            </ul>
          </div>
          <div className="text-center sm:text-right">
            <h3 className="text-base sm:text-lg font-bold mb-2">Follow Us</h3>
            <div className="space-x-2 flex justify-center sm:justify-end">
              <a href="#" className="hover:text-gray-300 text-2xl">🇫</a>
              <a href="#" className="hover:text-gray-300 text-2xl">📸</a>
            </div>
          </div>
        </div>
        <p className="text-center text-sm mt-4">© 2024 Enrestt. All rights reserved.</p>
      </footer>
    </div>
  );
}
