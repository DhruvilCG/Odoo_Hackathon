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
import Navbar from './components/Navbar'

export default function App(){
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

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
