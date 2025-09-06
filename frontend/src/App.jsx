import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddProduct from './pages/AddProduct'
import MyListings from './pages/MyListings'
import ProductDetail from './pages/ProductDetail'
import Dashboard from './pages/Dashboard'
import CartPage from './pages/CartPage'
import Purchases from './pages/Purchases'
import { useAuth } from './context/AuthContext'

export default function App(){
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">Entrestt Market</Link>
          <nav className="space-x-4 flex items-center">
            <Link to="/">Feed</Link>
            {user ? (
              <>
                <Link to="/my-listings">My Listings</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/cart">Cart</Link>
                <button onClick={logout} className="ml-2 px-3 py-1 bg-red-500 text-white rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
                <Link to="/signup" className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/my-listings" element={<MyListings/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/purchases" element={<Purchases/>} />
        </Routes>
      </main>
    </div>
  )
}
