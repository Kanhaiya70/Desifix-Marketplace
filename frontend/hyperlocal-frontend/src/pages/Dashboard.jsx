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

  return(
    <div>
      <h2>Welcome, { user.name }!</h2>
      <p>Your role: <strong>{ user.role }</strong></p>
    </div>
  );
};

export default Dashboard;