// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../utils/api"; // fetch with JWT from cookie

const CATEGORIES = ["All", "Electronics", "Books", "Clothing", "Misc"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const { user } = useAuth();

  useEffect(() => {
    apiFetch("https://odoo-hackathon-psi.vercel.app/api/products")
      .then(setProducts)
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [products, q, cat]);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 text-center relative">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Discover Amazing Products</h1>
        <p className="text-base sm:text-lg mb-6">Your one-stop marketplace for everything you need</p>
        <div className="max-w-xs sm:max-w-md mx-auto flex flex-col sm:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 p-2 sm:p-3 rounded-l border-none text-black mb-2 sm:mb-0"
          />
          <button className="bg-purple-600 text-white p-2 sm:p-3 rounded-r">Search</button>
        </div>
      </section>

      {/* Categories */}
      <div className="p-4 sm:p-6 bg-white">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded ${
                cat === c ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.length === 0 && (
            <div className="p-4 sm:p-6 bg-white rounded shadow">No products yet</div>
          )}
          {filtered.map((p) => (
            <Link
              key={p._id}
              to={`/product/${p._id}`}
              className="block bg-white p-2 sm:p-4 rounded-lg shadow hover:shadow-xl transition-shadow"
            >
              <div className="w-full h-32 sm:h-48 bg-gray-200 flex items-center justify-center mb-2 sm:mb-4">
                <img src={p.image} alt={p.title} className="object-cover w-full h-full rounded" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-1 sm:mb-2">{p.description}</p>
              <p className="text-purple-600 font-bold mb-1 sm:mb-2">₹{p.price}</p>
              <button className="w-full bg-purple-600 text-white py-1 sm:py-2 rounded hover:bg-purple-700 text-sm sm:text-base">
                Add to Cart
              </button>
            </Link>
          ))}
        </div>

        <div className="text-center mt-4 sm:mt-6">
          <button className="px-4 sm:px-6 py-1 sm:py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base">
            Load More Products
          </button>
        </div>
      </div>

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
