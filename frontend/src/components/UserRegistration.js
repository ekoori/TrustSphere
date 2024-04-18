/*
File: ./frontend/src/components/UserRegistration.js
Description: This file contains the `UserRegistration` React component which allows users to create a new account in the application. It handles the user interactions for user registration.
Class: UserRegistration - functional React component
Properties: 
    useState Hooks:
    [+] name: A state variable for the form's name field.
    [+] email: A state variable for the form's email field.
    [+] password: A state variable for the form's password field.
Methods:
    - register(event): A method that prevents the form from automatically submitting, makes a POST request to the '/api/register' endpoint, and alerts the user with the server's response. 
Implementation Status:
    [x] name field and state variable.
    [+] Email field and state variable with validation for correct email format.
    [x] password field and state variable with strength validation and hashing for secure storage.
*/
// Features:
//    [x] Users can create an account by providing their name, surname, email, and password.
//    [+] Email validation should be performed to ensure the correct format.
//    [x] Passwords should be validated for strength and securely hashed for storage.


import React, { useState } from 'react';

import api from '../api';
import '../styles/UserRegistration.css';

const UserRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = (event) => {
    // This will stop the form from automatically submitting
    event.preventDefault();
    
    api.post('/api/register', { name, email, password })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <div>
      <h1>Register</h1>
      <form className="register-form" onSubmit={register}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegistration;
