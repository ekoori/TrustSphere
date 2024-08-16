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
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Utility function to get session_id from cookies
  const getSessionIdFromCookie = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; session_id=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Handles the login process when the form is submitted
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
        const response = await api.post('/api/login', { email, password });
        console.log('Login response:', response.data);
        if (response.data && response.data.data) {
            // Retrieve the session ID from the cookie after login
            const sessionId = getSessionIdFromCookie();  
            if (!sessionId) {
                console.error('No session ID found after login');
            } else {
                console.log('Session ID:', sessionId);
            }
            console.log('User ID:', response.data.data.user_id);
            
            navigate('/'); // Redirect to home page after successful login
        } else {
            console.error('Login failed:', response.data.message);
            alert('Login failed: ' + response.data.message);
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Login failed';
        console.error('Login error:', errorMessage);
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
          required 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="login-form-button">Login</button>
        <Link to="/register" className="login-form-link">Don't have an account? Register here!</Link>
      </form>
    </div>
  );
};

export default UserLogin;
