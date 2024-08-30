import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/admin_assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Remove authentication-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');

    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/dashboard'>
        <img className='logo' src={assets.logo2} alt="Logo" />
      </Link>
        <img className='profile' src={assets.profile_image} alt="Profile" />
      <button onClick={handleLogout} className='logout-button'>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
