// File: ./frontend/src/components/UserProfile.js
// File Description: React.js file for User Profile Component.
// Class: UserProfile - Presents the user's profile information and allows them to update it.
// Properties: state - contains the profile data of the logged in user.
// Methods: 
//    [+] fetchUserData() - Fetches user profile data from API when component loads, uses localStorage to get session_id.
//    [-] updateUserProfile() - This method is still to be implemented. It should be used to update user data through the API.

import React, { useEffect, useState } from 'react';
import { useLogin } from '../App';
import api from '../api';
import UserLogin from '../components/UserLogin';
import Sidebar from '../components/Sidebar';
import '../styles/Home.css';

function UserProfile() {
  const { isLoggedIn, handleLogin, handleLogout } = useLogin();
  const [userData, setUserData] = useState(null);
  const [sessionId] = useState(localStorage.getItem('session_id'));
  const [userId] = useState(localStorage.getItem('user_id'));

  useEffect(() => {
    if (sessionId) {
      api.post('/api/user', { session_id: sessionId, user_id: userId }).then(response => {
        console.log('UserProfile: ', response.data)
        setUserData(response.data);
      });
    }
  }, [sessionId]);
  
 

  return (
    <div className='container'>
      <Sidebar className="sidebar" onLogout={handleLogout} />
      <div className="main-content">
        {!isLoggedIn && <UserLogin onLogin={handleLogin} />}
        {userData && (
          <div>
            <h3>User Profile</h3>
            <ul>
              <li>Name: {[userData.name]}</li>
              <li>Email: {[userData.email]}</li>
              <li>Location: {[userData.location]}</li>
              <li>Session ID: {sessionId}</li>
            </ul>
          </div>
        )}
      </div>
      {userData && !isLoggedIn && <div>Please log in to view user details.</div>}
    </div>
  );
};
export default UserProfile;