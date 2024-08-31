// File: ./frontend/src/components/UserLogin.js
// Description: This is the React.js file for the User Login Component.
// Classes/Methods/Properties: 
//    [+] UserLogin - The main component for the user login form.
//        [+] email - State property to store the user's entered email.
//        [+] password - State property to store the user's entered password.
//        [+] handleLogin - Handles the form submission for logging in the user.



import React, { useState } from 'react';
import api from '../api';
import '../styles/App.css'; 
import '../styles/UserLogin.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../App';  // Import useLogin hook

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn, setUserId } = useLogin();  // Destructure from context
  const navigate = useNavigate();

  // Handles the login process when the form is submitted
  const handleLogin = async (event) => {
    event.preventDefault();
    if (isLoggedIn) {
        alert('You are already logged in. Please log out before logging in again.');
        return;
    }
    try {
        const response = await api.post('/api/login', { email, password }, {
            withCredentials: true
        });
        console.log('Login response:', response.data);
        if (response.status === 200 && response.data && response.data.data) {
            setIsLoggedIn(true);  // Set isLoggedIn to true in context
            setUserId(response.data.user_id);  // Set userId in context
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

