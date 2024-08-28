import React from 'react';
import './Navbar.css';
import {assets} from '../../assets/admin_assets/assets.js';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/dashboard'>
      <img  className='logo' src={assets.logo2} alt="" />
      </Link>
      <Link to='/'>
        <img className='profile' src={assets.profile_image} alt="" />
      </Link>
    </div>
  )
}

export default Navbar