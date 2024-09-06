import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Food</p>
            </NavLink>
            <NavLink to='/category' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Category</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Food List</p>
            </NavLink>
            <NavLink to='/category-list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Category List</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
            <NavLink to='/users-list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Users Lsit</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar