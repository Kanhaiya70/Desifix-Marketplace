import { useState } from "react";
import API from "../api/axios";
import  { useNavigate } from 'react-router-dom';

const Register = ()=>{
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [showPassword, setShowPassword] = useState(false);
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
    <div
      className="container-fluid d-flex justify-content-center align-items-center bg-light"
      style={{ 
        minHeight: '100vh',
        backgroundImage: 'url(https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg?semt=ais_items_boosted&w=740)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      data-aos= "fade-right"
    >
      <div className="col-md-6">
        <div className="card shadow-lg border-0 rounded-4 px-4 py-5 bg-white">
          <h2 className="text-center mb-3 fw-bold text-primary">Create Your Account ✌</h2>
          <p className="text-center text-muted mb-4">Join our Hyperlocal Service Marketplace</p>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-primary">Full Name</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white">
                  <i className="bi bi-person text-primary"></i>
                </span>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={handleChange}
                  placeholder="Team Work"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-primary">Email Address</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white">
                  <i className="bi bi-envelope text-primary"></i>
                </span>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password with toggle */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-primary">Password</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white">
                  <i className="bi bi-lock text-primary"></i>
                </span>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                </button>
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label className="form-label fw-semibold text-primary">Register As</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white">
                  <i className="bi bi-person-badge text-primary"></i>
                </span>
                <select
                  name="role"
                  className="form-select"
                  value={role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="provider">Provider</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Register Button */}
            <button type="submit" className="btn btn-primary w-100 py-2 shadow-sm">
              <i className="bi bi-person-plus me-2"></i>Register
            </button>
          </form>

          {/* Link to Login */}
          <p className="text-center mt-4 text-muted small">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none text-primary fw-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;