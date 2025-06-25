import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const Dashboard = ()=>{
  const [user, setUser] = useState('');

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      window.location.href = '/login';
      return;
    }

    try{
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch(err) {
      console.log("Invalid token");
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }, []);

  if (!user) return <p>Loading.....</p>;

return (
    <div className="container mt-5">
      <div className="card p-5 shadow-sm">
        <h2 className="mb-3">Welcome, <strong>{user.name}</strong>!</h2>
        <p className="lead">Your role: <span className="badge bg-primary text-uppercase">{user.role}</span></p>

        <hr />
        <div className="mt-4">
          <h4>Quick Links</h4>
          <ul>
            {user.role === 'user' && <li><a href="/my-bookings">📋 View My Bookings</a></li>}
            {user.role === 'provider' && <li><a href="/provider-dashboard">🛠 Go to Provider Dashboard</a></li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;