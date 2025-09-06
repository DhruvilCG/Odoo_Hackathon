import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../lib/mockApi';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['Electronics', 'Books', 'Clothing', 'Misc'];

export default function AddProduct() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('login first');
      return;
    }
    const payload = { title, description: desc, price: Number(price), category, ownerId: user.id };
    await api.createProduct(payload);
    nav('/');
  };

  return (
    <div className="bg-gray-100">
      {/* Add Product Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 flex justify-center items-center">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-purple-600 text-center">Add New Product</h2>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Title"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                type="number"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              />
            </div>
            <div>
              <button
                type="button"
                className="p-2 sm:p-3 border rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
              >
                + Add Image (Placeholder)
              </button>
            </div>
            <button
              type="submit"
              className="w-full p-3 sm:p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-sm sm:text-base"
            >
              Submit Listing
            </button>
          </form>
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