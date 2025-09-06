// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user if cookie exists
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetch("https://odoo-hackathon-psi.vercel.app/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.email) setUser(data);
        })
        .catch(() => {
          Cookies.remove("token");
          setUser(null);
        });
    }
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await fetch("https://odoo-hackathon-psi.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    Cookies.set("token", data.token, { expires: 7, secure: true, sameSite: "Strict" });
    setUser(data.user);
  };

  // Signup
  const signup = async (displayName, email, password) => {
    const res = await fetch("https://odoo-hackathon-psi.vercel.app/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");

    Cookies.set("token", data.token, { expires: 7, secure: true, sameSite: "Strict" });
    setUser(data.user);
  };

  // Logout
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
