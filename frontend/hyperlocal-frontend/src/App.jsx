import Footer from './components/Footer';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Layout>
        <Routes>
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/dashboard' element={ <Dashboard /> } />
        </Routes>
      </Layout>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;