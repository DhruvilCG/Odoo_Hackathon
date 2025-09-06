import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../lib/mockApi'
import { useAuth } from '../context/AuthContext'

const CATEGORIES = ['Electronics','Books','Clothing','Misc']

export default function AddProduct(){
  const { user } = useAuth()
  const nav = useNavigate()
  const [title,setTitle]=useState('')
  const [desc,setDesc]=useState('')
  const [price,setPrice]=useState('')
  const [category,setCategory]=useState(CATEGORIES[0])

  const submit = async e=>{
    e.preventDefault()
    if(!user){ alert('login first'); return }
    const payload = { title, description: desc, price: Number(price), category, ownerId: user.id }
    await api.createProduct(payload)
    nav('/')
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-16">
      <h2 className="text-2xl font-bold mb-6 text-green-600">Add New Product</h2>
      <form onSubmit={submit} className="space-y-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Product Title" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
        <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
          {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" type="number" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
        <div>
          <button type="button" className="p-2 border rounded-lg hover:bg-gray-100 transition">+ Add Image (Placeholder)</button>
        </div>
        <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">Submit Listing</button>
      </form>
    </div>
  )
}
