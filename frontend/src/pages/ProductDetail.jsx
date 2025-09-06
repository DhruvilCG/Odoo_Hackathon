import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../lib/mockApi';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    api.getProduct(id).then(setProduct);
  }, [id]);
  if (!product) return <div className="text-center mt-16 text-gray-500 font-semibold">Loading...</div>;

  const buy = () => {
    api.addToCart(product);
    nav('/cart');
  };

  return (
    <div className="bg-gray-100">
      {/* Product Detail Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 flex justify-center items-center">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <button
            onClick={() => nav(-1)}
            className="mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
          >
            Back
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-gray-200 h-64 sm:h-80 flex items-center justify-center rounded-lg text-gray-500 font-semibold">
              Image
            </div>
            <div className="col-span-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-purple-600">{product.title}</h2>
              <div className="text-2xl sm:text-3xl my-2 font-bold text-purple-600">₹{product.price}</div>
              <div className="text-sm sm:text-base text-gray-600 mb-4">Category: {product.category}</div>
              <p className="text-gray-700 text-sm sm:text-base">{product.description}</p>
              <button
                onClick={buy}
                className="mt-6 px-6 py-3 sm:py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-sm sm:text-base"
              >
                Add to Cart
              </button>
            </div>
          </div>
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