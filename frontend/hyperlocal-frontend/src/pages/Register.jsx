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
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Register as</label>
              <select
                name="role"
                className="form-select"
                value={role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="provider">Provider</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;