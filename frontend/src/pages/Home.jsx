import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['All', 'Electronics', 'Books', 'Clothing', 'Misc'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const { user } = useAuth();

  // Fetch all products initially
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://odoo-hackathon-psi.vercel.app/api/products', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Handle search by ID or title
  const handleSearch = async () => {
    if (!q) return;

    if (q.length === 24) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://odoo-hackathon-psi.vercel.app/api/products/${q}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProducts([data]);
      } catch (err) {
        console.error(err.message);
        setProducts([]);
      }
    } else {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(q.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://odoo-hackathon-psi.vercel.app/api/cart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      const data = await res.json();
      alert('Product added to cart!');
      console.log(data);
    } catch (err) {
      console.error('Add to cart error:', err.message);
      alert('Failed to add product to cart');
    }
  };

  const displayedProducts = products.filter((p) => (cat !== 'All' && p.category !== cat ? false : true));

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 text-center relative">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Discover Amazing Products</h1>
        <p className="text-base sm:text-lg mb-6">Your one-stop marketplace for everything you need</p>
        <div className="max-w-xs sm:max-w-md mx-auto flex flex-col sm:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title or ID..."
            className="flex-1 p-2 sm:p-3 rounded-l border-none text-black mb-2 sm:mb-0"
          />
          <button
            onClick={handleSearch}
            className="bg-purple-600 text-white p-2 sm:p-3 rounded-r"
          >
            Search
          </button>
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
                cat === c ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.length === 0 && (
            <div className="p-4 sm:p-6 bg-white rounded shadow">No products found</div>
          )}
          {displayedProducts.map((p) => (
            <div
              key={p._id}
              className="block bg-white p-2 sm:p-4 rounded-lg shadow hover:shadow-xl transition-shadow"
            >
              <Link to={`/product/${p._id}`}>
                <div className="w-full h-32 sm:h-48 bg-gray-200 flex items-center justify-center mb-2 sm:mb-4">
                  Image
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-1 sm:mb-2">{p.description}</p>
                <p className="text-purple-600 font-bold mb-1 sm:mb-2">₹{p.price}</p>
              </Link>
              <button
                onClick={() => addToCart(p)}
                className="w-full bg-purple-600 text-white py-1 sm:py-2 rounded hover:bg-purple-700 text-sm sm:text-base mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
