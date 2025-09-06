import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as api from '../lib/mockApi'
import { useAuth } from '../context/AuthContext'

export default function ProductDetail(){
  const { id } = useParams()
  const [product,setProduct]=useState(null)
  const { user } = useAuth()
  const nav = useNavigate()

  useEffect(()=>{ api.getProduct(id).then(setProduct) },[id])
  if(!product) return <div className="text-center mt-16 text-gray-500 font-semibold">Loading...</div>

  const buy = ()=>{
    api.addToCart(product)
    nav('/cart')
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-16">
      <button onClick={()=>nav(-1)} className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Back</button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-gray-200 h-64 flex items-center justify-center rounded-lg text-gray-500 font-semibold">Image</div>
        <div className="col-span-2">
          <h2 className="text-3xl font-bold text-blue-600">{product.title}</h2>
          <div className="text-2xl my-2 font-bold text-green-600">₹{product.price}</div>
          <div className="text-sm text-gray-600 mb-4">Category: {product.category}</div>
          <p className="text-gray-700">{product.description}</p>
          <button onClick={buy} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
