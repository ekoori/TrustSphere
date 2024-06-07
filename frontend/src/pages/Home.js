// ./frontend/src/pages/Home.js:
// File Description: This file contains the Home component which is essentially the landing page of the application.
// Class: 
//    Home - Main landing page of the application showing main content on the platform, depending on the user context.
// Properties: None
// Methods: None

import React from 'react';
import { useLogin } from '../App';
import UserLogin from '../components/UserLogin';
import Sidebar from '../components/Sidebar';
import TrustTrail from '../components/TrustTrail';
import '../styles/App.css';
import '../styles/Marketplace.css';
import '../styles/TrustTrail.css';


const Home = () => {
  const { isLoggedIn, handleLogin, handleLogout } = useLogin();

  return (


    
    <main className="container"> 
        
          <Sidebar className="sidebar" onLogout={handleLogout} />
          <div className="main-content">
          {isLoggedIn ? (
            <TrustTrail className="trusttrail" onLogout={handleLogout} />
          ) : (
            <UserLogin onLogin={handleLogin} />
          )}
          </div>
    </main>
  );
};

export default Home;