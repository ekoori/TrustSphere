// File: ./frontend/src/components/Header.js
// Description: Represents the Header component of the application.
// Class: Header - A fixed header that provides navigation and branding.
// Properties: None
// Methods: None

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useLogin } from '../App';

/*
 * Header component displaying the navigation bar
 * @param {object} props 
 * @returns JSX elements
 */

const Header = () => {
    const { isLoggedIn, handleLogout } = useLogin(); // Get handleLogout from useLogin hook instead of defining it locally
    
    return (
        <header className='header'>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                {isLoggedIn 
                  ? <li><button onClick={handleLogout}>Logout</button></li> // use handleLogout from useLogin hook
                  : <li><Link to="/login">Login</Link></li> // assumed /login route, otherwise use button with onClick event. 
                } 
              </ul>
            </nav>
        </header>
    );
};

export default Header;
