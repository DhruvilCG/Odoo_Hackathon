import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return <div className="text-center text-red-500 font-semibold">Please login</div>;

  return (
    <div className="bg-gray-100">
      {/* Dashboard Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 flex justify-center items-center">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-purple-600 text-center">User Dashboard</h2>
          <div className="mb-4">
            <div className="text-gray-600 font-semibold text-sm sm:text-base">Username:</div>
            <div className="text-lg sm:text-xl font-bold">{user.username}</div>
          </div>
          <div className="mb-4">
            <div className="text-gray-600 font-semibold text-sm sm:text-base">Email:</div>
            <div className="text-lg sm:text-xl font-bold">{user.email}</div>
          </div>
          <div className="text-gray-500 text-sm sm:text-base">You can extend this to edit fields (username, avatar, etc.)</div>
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