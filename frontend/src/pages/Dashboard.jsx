import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user?.username || '');

  const handleSave = () => {
    alert(`Profile updated: ${username}`);
  };

  if (!user) return <h2>Please log in</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Dashboard</h2>
      <p>Email: {user.email}</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
