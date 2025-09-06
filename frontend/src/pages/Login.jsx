import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // login stores token in localStorage
      nav("/");
    } catch (er) {
      setErr(er.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-b from-purple-900 to-purple-700 text-white p-6 sm:p-12 flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-purple-600 text-center">Login</h2>
          {err && <div className="text-red-600 mb-4 text-center">{err}</div>}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 sm:p-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition text-sm sm:text-base"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
            Don't have an account? <Link to="/signup" className="text-purple-600 font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
