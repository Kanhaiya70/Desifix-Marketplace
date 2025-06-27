import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // tracks route changes
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('')
  const [userName, setUserName] = useState("");
  

  // Update login status on route change
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);
    console.log("Navbar role:", storedRole);


    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if(token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setUserName(decoded.name);
        console.log('Navbar role:', decoded.role);
      } catch (err) {
        console.error('Failed to decode token:', err);
        setRole('');
      }
    } else {
      setRole('');
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    toast.info("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/login");
  };

  return (
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
    <nav className="navbar navbar-expand-lg bg-transparent navbar-dark fixed-top shadow custom-glass">
      <div className="container">
        <Link className="navbar-brand" to="/">Hyperlocal Services</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>

                {role === 'provider' && (
                  <li className="nav-item">
                    <NavLink className='nav-link' to='/provider-dashboard'>Provider Dashboard</NavLink>
                  </li>
                )}

                <button
  className="btn btn-outline-danger fw-semibold px-3 ms-2"
  onClick={handleLogout}
>
  🔓 Logout
</button>

                {userName && (
                  <li className="nav-item">
                    <span className="nav-link fw-bold text-primary">👤Hi, {userName}!</span>
                  </li>
                )}

              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
