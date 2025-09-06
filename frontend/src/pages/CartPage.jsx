import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../lib/mockApi'
import { useAuth } from '../context/AuthContext'

export default function CartPage(){
  const [items,setItems]=useState([])
  const { user } = useAuth()
  const nav = useNavigate()
  useEffect(()=> setItems(api.getCart()), [])

  const checkout = ()=>{
    if(!user){ alert('Login to purchase'); return }
    api.addPurchase(user.id, items)
    api.clearCart()
    nav('/purchases')
  }

  if(items.length===0) return <div className="text-center mt-16 text-gray-500 font-semibold">Cart is empty</div>

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Cart</h2>
      <div className="space-y-4">
        {items.map((it,idx)=> (
          <div key={idx} className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500 font-semibold">Img</div>
              <div>
                <div className="font-semibold text-lg">{it.title}</div>
                <div className="text-green-600 font-bold mt-1">₹{it.price}</div>
              </div>
            </div>
            <div className="text-gray-600 font-semibold">Qty: 1</div>
          </div>
        ))}
      </div>
      <button onClick={checkout} className="mt-6 w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">Checkout</button>
    </div>
  )
}
