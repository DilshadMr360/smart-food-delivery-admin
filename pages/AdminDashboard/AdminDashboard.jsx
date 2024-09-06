import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import axios from 'axios';
import PieChart from '../../components/PieChart'; // Import the PieChart component

const AdminDashboard = ({ url }) => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foodCount, setFoodCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/api/user/users-list`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/category/categories`);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${url}/api/food/food-count`);
        setFoodCount(response.data.count);
      } catch (error) {
        console.log('Error Fetching Foods:', error);
      }
    };

    const fetchOrdersList = async () => {
      try {
        const response = await axios.get(`${url}/api/order/list`);
        setOrderCount(response.data.data.length || 0);
      } catch (error) {
        console.log('Error Fetching orders', error);
      }
    };

    fetchUsers();
    fetchCategories();
    fetchFoods();
    fetchOrdersList();
  }, [url]);

  return (
    <div className='admin-title'>
      <h1>Welcome to Admin Dashboard</h1>
      <div className="dashboard-content">
        <div className='chart-container'>
          <PieChart data={[users.length, foodCount, categories.length, orderCount]} />
        </div>
        <div className="counts-container">
          <h2>Total Users: {users.length}</h2>
          <h2>Total Foods: {foodCount}</h2>
          <h2>Total Categories: {categories.length}</h2>
          <h2>Total Orders: {orderCount}</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
