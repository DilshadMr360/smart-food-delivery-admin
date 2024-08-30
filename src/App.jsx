import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from '../pages/Add/Add';
import List from '../pages/List/List';
import Orders from '../pages/Orders/Orders';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import Login from '../pages/Auth/Login';
import ProtectedRoute from '../components/PrivateRoute'; // Import ProtectedRoute
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation(); // Get current location
  const navigate = useNavigate();  // Get navigate function

  const url = "http://localhost:4000";

  const isLoginPage = location.pathname === '/';

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (token && isLoginPage) {
      // If token exists and user is on the login page, redirect to dashboard
      navigate('/dashboard');
    }
  }, [isLoginPage, navigate]);

  return (
    <div>
      <ToastContainer />
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <hr />}
      <div className='app-content'>
        {!isLoginPage && <Sidebar />}
        <Routes>
          <Route path="/" element={<Login url={url} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<AdminDashboard url={url} />} />} />
          <Route path="/add" element={<ProtectedRoute element={<Add url={url} />} />} />
          <Route path="/list" element={<ProtectedRoute element={<List url={url} />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Orders url={url} />} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
