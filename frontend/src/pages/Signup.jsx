import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [username,setUsername]=useState('')
  const [err,setErr]=useState('')
  const { signup } = useAuth()
  const nav = useNavigate()

  const submit = async e=>{
    e.preventDefault()
    try{ await signup(email,password,username); nav('/') }catch(er){ setErr(er.message) }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">Sign Up</h2>
        {err && <div className="text-red-600 mb-4 text-center">{err}</div>}
        <form onSubmit={submit} className="space-y-4">
          <input
            value={username}
            onChange={e=>setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="w-full p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">Create Account</button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-green-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
