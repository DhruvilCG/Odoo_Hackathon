import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Login function
  const login = async (email, password) => {
    const res = await fetch("https://odoo-hackathon-psi.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    // Store token and user in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ id: data.userId, displayName: data.displayName, email: data.email })
    );

    setToken(data.token);
    setUser({ id: data.userId, displayName: data.displayName, email: data.email });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth
export const useAuth = () => useContext(AuthContext);
