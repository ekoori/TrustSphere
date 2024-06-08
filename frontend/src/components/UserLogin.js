// File: ./frontend/src/components/UserLogin.js:
// Description: This is React.js file for User Login Component.
// Class: UserLogin - Consists of form to allow user login to the application.
// Properties:
//    state - contains the user's entered email and password.
// Methods:
//    handleLogin - submits the form and calls the API endpoint for login.

import React, { useState } from 'react';
import api from '../api';
import '../styles/App.css'; 
import '../styles/UserLogin.css'; 
import { Link } from 'react-router-dom';

// We have destructured the onLogin property for cleaner code
const UserLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {   // Using async for better error handling
    event.preventDefault();
    try {
      const response = await api.post('/api/login', { email, password }); // Using async-await approach for cleaner code
      console.log(response.data);
      localStorage.setItem('session_id', response.data.data.session_id);
      console.log('user logged in: ', response.data.data.user_id)
      localStorage.setItem('user_id', response.data.data.user_id);
      onLogin();      

      // console.log("session_id stored in local storage:", response.data.session_id);  
    } catch (error) {
      const errorMessage = error?.response?.data?.data?.message || 'Login failed'; // Graceful error handling
      alert(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-form-title">Welcome to TrustSphere!</h2>
        <input 
          type="email" 
          placeholder="Email" 
          required // Add required for form input validation
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required // Add required for form input validation
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="login-form-button">Login</button>
        <Link to="/register" className="login-form-link">Don't have an account? Register here!</Link>
      </form>
    </div>
  );
};

export default UserLogin;