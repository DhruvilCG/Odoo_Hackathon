import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(){
  const { user } = useAuth()
  if(!user) return <div className="text-center mt-16 text-red-500 font-semibold">Please login</div>

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-16">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">User Dashboard</h2>
      <div className="mb-4">
        <div className="text-gray-600 font-semibold">Username:</div>
        <div className="text-lg font-bold">{user.username}</div>
      </div>
      <div className="mb-4">
        <div className="text-gray-600 font-semibold">Email:</div>
        <div className="text-lg font-bold">{user.email}</div>
      </div>
      <div className="text-gray-500">You can extend this to edit fields (username, avatar, etc.)</div>
    </div>
  )
}
