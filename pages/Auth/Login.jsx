import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { assets } from '../../src/assets/admin_assets/assets.js';


const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const url = currentState === 'Login' ? "/api/user/login" : "/api/user/register";
    
    try {
      const response = await axios.post(url, data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred during authentication.");
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          {/* <img src={assets.cross_icon} alt=""  /> */}
        </div>
        <div className="login-popup-inputs">
          {currentState === 'Register' && (
            <input
              type="text"
              placeholder='Your Name'
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              required
            />
          )}
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
          {currentState === "Register" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>Don't have an account? <span onClick={() => setCurrentState("Register")}>Sign Up</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login Here</span></p>
        )}
      </form>
    </div>
  );
};

export default Login;
