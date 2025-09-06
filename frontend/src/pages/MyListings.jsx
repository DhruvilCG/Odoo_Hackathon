import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as api from '../lib/mockApi'
import { useAuth } from '../context/AuthContext'

export default function MyListings(){
  const { user } = useAuth()
  const [listings,setListings]=useState([])
  useEffect(()=>{ if(user) api.listMyProducts(user.id).then(setListings) },[user])

  const del = async id=>{ await api.deleteProduct(id); setListings(listings.filter(l=>l.id!==id)) }

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">My Listings</h2>
        <Link to="/add-product" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">+ Add</Link>
      </div>
      <div className="space-y-4">
        {listings.map(p=> (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">Img</div>
              <div>
                <div className="font-semibold text-lg">{p.title}</div>
                <div className="text-blue-600 font-bold mt-1">₹{p.price}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/product/${p.id}`} className="px-3 py-1 border rounded-lg hover:bg-gray-100 transition">View</Link>
              <Link to={`/add-product?id=${p.id}`} className="px-3 py-1 border rounded-lg hover:bg-gray-100 transition">Edit</Link>
              <button onClick={()=>del(p.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
