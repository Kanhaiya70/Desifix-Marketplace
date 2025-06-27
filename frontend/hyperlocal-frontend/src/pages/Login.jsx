import { useState } from "react";
import API from '../api/axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ()=>{
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch(err){
      alert('Login Failed!');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh', 
        backgroundImage: 'url(https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg?semt=ais_items_boosted&w=740)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      data-aos= "fade-right"
    >
      <div className="col-md-5">
        <div 
          className="card shadow-lg border-0 rounded-4 px-4 py-5" 
          style={{ 
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)", 
          }}
        >
          <h2 className="text-center mb-4 fw-bold text-primary">Welcome Back</h2>
          <p className="text-center text-muted mb-4">Login to your account</p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email address</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white">
                  <i className="bi bi-envelope text-primary"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white">
                  <i className="bi bi-lock text-primary"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100 py-2 shadow-sm">
              <i className="bi bi-box-arrow-in-right me-2"></i>Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center mt-4 text-muted small">
            Don’t have an account? <a href="/register" className="text-decoration-none text-primary fw-medium">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;