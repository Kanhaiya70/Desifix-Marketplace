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

  return(
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;