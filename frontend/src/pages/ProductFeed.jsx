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
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || category === 'all' || p.category === category)
  );

  return (
    <div className="bg-gray-100">
      {/* Product Feed Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 flex justify-center items-center">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-purple-600 text-center">Product Listings</h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-2/3 p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            />
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-1/3 p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="p-4 sm:p-6 bg-white rounded shadow text-center">No products found</div>
            ) : (
              filtered.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-2 sm:p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 flex items-center justify-center rounded">Img</div>
                    <div>
                      <Link to={`/product/${p.id}`}>
                        <h3 className="font-semibold text-base sm:text-lg text-gray-700 hover:text-purple-600 transition">{p.title}</h3>
                      </Link>
                      <p className="text-purple-600 font-bold mt-1 text-sm sm:text-base">₹{p.price}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-6">
            <Link to="/add-product">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm sm:text-base">
                + Add Product
              </button>
            </Link>
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
              <li><a href="#" className="hover:text-gray-300 text-sm">Contact</a></li