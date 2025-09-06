import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as api from '../lib/mockApi';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title'); // get product title from URL ?title=...
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!title) return;

    const fetchProductByName = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://odoo-hackathon-psi.vercel.app/api/products?q=${title}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        // data is an array, pick first match
        if (data.length > 0) setProduct(data[0]);
        else setProduct(null);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    fetchProductByName();
  }, [title]);

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
    </div>
  );
}
