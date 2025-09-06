// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="font-bold text-xl text-purple-700">
          Entrestt Market
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-purple-600">
            Feed
          </Link>

          {user ? (
            <>
              <Link to="/my-listings" className="hover:text-purple-600">
                My Listings
              </Link>
              <Link to="/dashboard" className="hover:text-purple-600">
                Dashboard
              </Link>
              <Link to="/cart" className="hover:text-purple-600">
                Cart
              </Link>
              <button
                onClick={logout}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
