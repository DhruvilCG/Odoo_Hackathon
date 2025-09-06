import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import * as api from '../lib/mockApi'

export default function Purchases(){
  const { user } = useAuth()
  const [purchases,setPurchases]=useState([])
  useEffect(()=>{ if(user) setPurchases(api.listPurchases(user.id)) },[user])

  if(!user) return <div className="text-center mt-16 text-red-500 font-semibold">Please login to view purchases</div>
  if(purchases.length===0) return <div className="text-center mt-16 text-gray-500 font-semibold">No previous purchases</div>

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Previous Purchases</h2>
      <div className="space-y-6">
        {purchases.map(p=> (
          <div key={p.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-gray-500 text-sm mb-3">{new Date(p.date).toLocaleString()}</div>
            <div className="space-y-2">
              {p.items.map(it=> (
                <div key={it.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500 font-semibold">Img</div>
                  <div>
                    <div className="font-semibold text-lg">{it.title}</div>
                    <div className="text-green-600 font-bold">₹{it.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
