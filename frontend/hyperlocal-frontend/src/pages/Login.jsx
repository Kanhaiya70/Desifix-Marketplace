import { useState } from "react";
import API from '../api/axios';
import { useNavigate } from "react-router-dom";

const Login = ()=>{
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = e=> setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      console.log("Login response:", data);  // <- add this

      navigate('/dashboard');
    } catch(err){
      alert('Login Failed!');
    }
  };

return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-5">
        <div className="card p-5 shadow-sm border-0">
          <h2 className="text-center mb-4">Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg"
                value={password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2">
              Login
            </button>
          </form>
          <p className="text-center mt-3 text-muted">
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;