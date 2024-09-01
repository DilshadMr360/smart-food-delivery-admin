import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ url }) => {

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // Log URL and endpoint for verification
      const response = await axios.post(`${url}/api/user/admin/login`, data);

      // Log response data
      console.log('Response data:', response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.name); 
        toast.success("Login successfully");
        navigate('/dashboard');
      } else {
        alert(response.data.message); // Show error message if login fails
      }
    } catch (error) {
      // Log the full error object
      console.error("Error during authentication:", error);
    
      // Log error response details if available
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    
      alert("Error during authentication.");
    }
    
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>
        <div className="login-popup-inputs">
          <input
            type="email"
            placeholder='Your Email'
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            type="password"
            placeholder='******'
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            required
          />
        </div>
        <button type='submit'>
          Login
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
