import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from '../pages/Add/Add';
import List from '../pages/List/List';
import Orders from '../pages/Orders/Orders';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import Login from '../pages/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation(); // Get current location

  const url = "http://localhost:4000";

  // Determine if the current path is not the login path
  const isLoginPage = location.pathname === '/';

  return (
    <div>
      <ToastContainer />
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <hr />}
      <div className='app-content'>
        {!isLoginPage && <Sidebar />}
        <Routes>
          <Route path="/" element={<Login url={url} />} />
          <Route path="/dashboard" element={<AdminDashboard url={url} />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
