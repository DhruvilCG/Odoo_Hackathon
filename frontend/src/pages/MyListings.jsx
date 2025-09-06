import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../lib/mockApi';
import { useAuth } from '../context/AuthContext';

export default function MyListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (user) api.listMyProducts(user.id).then(setListings);
  }, [user]);

  const del = async (id) => {
    await api.deleteProduct(id);
    setListings(listings.filter((l) => l.id !== id));
  };

  return (
    <div className="bg-gray-100">
      {/* My Listings Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 flex justify-center items-center">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-600">My Listings</h2>
            <Link to="/add-product" className="p-2 sm:p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm sm:text-base">
              + Add
            </Link>
          </div>
          <div className="space-y-4">
            {listings.length === 0 ? (
              <div className="p-4 sm:p-6 bg-white rounded shadow text-center">No listings yet</div>
            ) : (
              listings.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-2 sm:p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-center hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 flex items-center justify-center rounded">Img</div>
                    <div>
                      <div className="font-semibold text-base sm:text-lg">{p.title}</div>
                      <div className="text-purple-600 font-bold mt-1 text-sm sm:text-base">₹{p.price}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <Link
                      to={`/product/${p.id}`}
                      className="px-2 sm:px-3 py-1 border rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
                    >
                      View
                    </Link>
                    <Link
                      to={`/add-product?id=${p.id}`}
                      className="px-2 sm:px-3 py-1 border rounded-lg hover:bg-gray-100 transition text-sm sm:text-base"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => del(p.id)}
                      className="px-2 sm:px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
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