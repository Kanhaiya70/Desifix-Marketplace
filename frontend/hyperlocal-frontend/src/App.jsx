import Footer from './components/Footer';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import MyBookings from './pages/MyBookings';
import ProviderDashboard from './pages/ProviderDashboard';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



function App(){
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#fdf6ed', minHeight: '100vh' }}>
        <Navbar />
        <Layout>
          <Routes>
            <Route path='/' element= {<Home />} />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/dashboard' element={ <Dashboard /> } />
            <Route path='/services/:id' element= {<ServiceDetail />} />
            <Route path='/my-bookings' element= {<MyBookings /> } />
            <Route path='/provider-dashboard' element= {<ProviderDashboard />} />
          </Routes>
        </Layout>
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;