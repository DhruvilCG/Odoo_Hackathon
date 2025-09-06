import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as api from '../lib/mockApi'
import { useAuth } from '../context/AuthContext'

const CATEGORIES = ['All','Electronics','Books','Clothing','Misc']

export default function Home(){
  const [products,setProducts] = useState([])
  const [q,setQ] = useState('')
  const [cat,setCat] = useState('All')
  const { user } = useAuth()  // get current user

  useEffect(()=>{ api.listProducts().then(setProducts) }, [])

  const filtered = useMemo(()=>{
    return products.filter(p=>{
      if(cat!=='All' && p.category!==cat) return false
      if(q && !p.title.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  },[products,q,cat])

  return (
    <div>
      {/* Show login button if user not logged in */}
      {!user && (
        <div className="flex justify-end mb-4">
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title..." className="flex-1 p-2 border rounded" />
        <Link to="/add-product" className="p-2 bg-blue-600 text-white rounded">+ Add</Link>
      </div>

      <div className="flex gap-2 mb-4">
        {CATEGORIES.map(c=> (
          <button key={c} onClick={()=>setCat(c)} className={`px-3 py-1 rounded ${cat===c? 'bg-blue-600 text-white' : 'bg-white border'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.length===0 && <div className="p-6 bg-white rounded shadow">No products yet</div>}
        {filtered.map(p=> (
          <Link key={p.id} to={`/product/${p.id}`} className="block bg-white p-4 rounded shadow flex gap-4 items-center hover:shadow-lg">
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">Image</div>
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600">₹{p.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
