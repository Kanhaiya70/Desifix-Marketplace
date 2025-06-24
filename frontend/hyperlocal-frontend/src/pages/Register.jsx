import { useState } from "react";
import API from "../api/axios";
import  { useNavigate } from 'react-router-dom';

const Register = ()=>{
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

  const handleSubmit = async e =>{
    e.preventDefault();
    try{
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch(err) {
      alert('Registration failed!');
    }
  };

return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6">
        <div className="card p-5 shadow-sm border-0">
          <h2 className="text-center mb-4">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                name="name"
                type="text"
                className="form-control form-control-lg"
                value={name}
                onChange={handleChange}
                placeholder="Kanhaiya Agarwal"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                name="email"
                type="email"
                className="form-control form-control-lg"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control form-control-lg"
                value={password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Register As</label>
              <select
                name="role"
                className="form-select form-select-lg"
                value={role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="provider">Provider</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100 py-2">
              Register
            </button>
          </form>
          <p className="text-center mt-3 text-muted">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;