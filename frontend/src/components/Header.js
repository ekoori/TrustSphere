// File: ./frontend/src/components/Header.js
// Description: Represents the Header component of the application.
// Class: Header - A fixed header that provides navigation and branding.
// Properties: None
// Methods: None

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import { useLogin } from '../App';

const Header = () => {
    const { isLoggedIn, handleLogout } = useLogin(); // Get handleLogout from useLogin hook instead of defining it locally
    
    return (
      <header>
      <div className="logo"><Link to="/">TrustSphere</Link></div>
      
      <nav>
          <ul>
              <li className="notification-icon">
                  <a href="#" id="notification-bell">🔔</a>
                  <div id="notification-panel" className="notification-panel hidden">
                      <h4>Notifications</h4>
                      <ul className="notification-list">
                          <li>
                              <img src="elon_musk_avatar.jpg" alt="Elon Musk" className="notification-avatar" />
                              <a href="user.html">Elon accepted your request for a Roadster drive.</a>
                              <span className="notification-time">2 hours ago</span>
                          </li>
                          <li>
                              <img src="elon_musk_avatar.jpg" alt="OpenAI" className="notification-avatar" />
                              <a href="union.html">You got accepted to the OpenAI union.</a>
                              <span className="notification-time">4 hours ago</span>
                          </li>
                          <li>
                              <img src="elon_musk_avatar.jpg" alt="John Doe" className="notification-avatar" />
                              <a href="user.html">John Doe liked your post.</a>
                              <span className="notification-time">1 day ago</span>
                          </li>
                          <li>
                              <img src="elon_musk_avatar.jpg" alt="Jane Smith" className="notification-avatar" />
                              <a href="project.html">Jane Smith commented on your project.</a>
                              <span className="notification-time">2 days ago</span>
                          </li>
                      </ul>
                  </div>
              </li>
              <li><a href="/marketplace">Marketplace</a></li>
              <li><a href="spheres.html">Spheres</a></li>
              <li><a href="unions.html">Unions</a></li>
              <li><a href="projects.html">Projects</a></li>
              <li><a href="profile.html">Profile</a></li>
              <li><a href="settings.html">Settings</a></li>
              <li><a href="admin.html">Admin</a></li>
              <li><a href="donate.html">Donate 💰</a></li>
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
