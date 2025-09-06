import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProductFeed from './pages/ProductFeed';
import AddProduct from './pages/AddProduct';
import MyListings from './pages/MyListings';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Purchases from './pages/Purchases';

function App() {
  return (
    <div>
      {/* Simple Navigation */}
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
        <Link to="/feed" style={{ marginRight: '10px' }}>Feed</Link>
        <Link to="/my-listings" style={{ marginRight: '10px' }}>My Listings</Link>
        <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>
        <Link to="/purchases">Purchases</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<ProductFeed />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </div>
  );
}

export default App;
