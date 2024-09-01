// File: ./frontend/src/pages/ProfilePage.js
// Description: This is the React.js file for the user profile page. It displays user information and allows editing if the user is logged in.
// Classes/Methods/Properties:
//    [+] ProfilePage - The main component for the profile page.
//        [+] isEditing - State property to track whether the profile is in edit mode.
//        [+] profileData - State property to store the user's profile information.
//        [+] handleEditToggle - Toggles the edit mode for the profile.
//        [+] handleInputChange - Handles changes to the input fields in the edit mode.
//        [+] handleImageChange - Handles changes to the profile image.
//        [+] handleSaveChanges - Saves the changes made to the profile.


import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import { useLogin } from '../App';
import api from '../api';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sam Altman',
    email: 'sam.altman@example.com',
    location: 'San Francisco, USA',
    joined: 'January 2023',
    image: 'static/user-image.jpg',
    values: ['#community', '#technology', '#sustainability'],
    spheres: ['AI Development Sphere', 'Renewable Energy Sphere'],
    unions: ['Tech Union', 'AI Enthusiasts Union'],
    projects: ['OpenAI Datacenter Expansion', 'Community Garden Initiative'],
    following: ['Elon Musk', 'Joe Rogan']
  });

  const { isLoggedIn, userId } = useLogin();  // Use login context to get login status

  useEffect(() => {
    if (isLoggedIn) {
      api.get('api/user', { withCredentials: true })
        .then(response => {
          const data = response.data;
          setProfileData({
            name: data.name || 'N/A',
            email: data.email || 'N/A',
            location: data.location || 'N/A',
            joined: 'January 2023',  // This should be retrieved from backend if available
            image: data.profile_picture || 'static/user-image.jpg',
            values: data.values || ['#community', '#technology', '#sustainability'],
            spheres: data.spheres || ['AI Development Sphere', 'Renewable Energy Sphere'],
            unions: data.unions || ['Tech Union', 'AI Enthusiasts Union'],
            projects: data.projects || ['OpenAI Datacenter Expansion', 'Community Garden Initiative'],
            following: data.following || ['Elon Musk', 'Joe Rogan']
          });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          // Optionally handle error, e.g., show a message to the user
        });
    } else {
      // When not logged in, retain mockup data
      setProfileData({
        name: 'Sam Altman',
        email: 'sam.altman@example.com',
        location: 'San Francisco, USA',
        joined: 'January 2023',
        image: 'static/user-image.jpg',
        values: ['#community', '#technology', '#sustainability'],
        spheres: ['AI Development Sphere', 'Renewable Energy Sphere'],
        unions: ['Tech Union', 'AI Enthusiasts Union'],
        projects: ['OpenAI Datacenter Expansion', 'Community Garden Initiative'],
        following: ['Elon Musk', 'Joe Rogan']
      });
    }
  }, [isLoggedIn]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileData({ ...profileData, image: URL.createObjectURL(file) });
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    api.post('/api/updateuser', profileData, { withCredentials: true })
      .then(response => {
        setProfileData(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error saving user data:', error);
        // Optionally handle error, e.g., show a message to the user
      });
  };

  return (
    <div className="container">
      <aside className="profile-sidebar">
        <img src={profileData.image} alt="User Image" className="profile-image" />
        <div className="profile-info">
          <h2>{profileData.name}</h2>
          <p>Location: {profileData.location}</p>
          <p>Joined: {profileData.joined}</p>
          <button className="btn-orange" onClick={handleEditToggle}>Edit Profile</button>
          {isEditing && (
            <form className="profile-form" onSubmit={handleSaveChanges}>
              <div className="form-group">
                <label htmlFor="profileImage">Profile Image</label>
                <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} />
              </div>
              <div className="form-group">
                <label htmlFor="userName">Name</label>
                <input type="text" id="userName" name="name" value={profileData.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="eMail">Email</label>
                <input type="text" id="eMail" name="email" value={profileData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="userLocation">Location</label>
                <input type="text" id="userLocation" name="location" value={profileData.location} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="userJoined">Joined</label>
                <input type="text" id="userJoined" name="joined" value={profileData.joined} readOnly />
              </div>
              <button type="submit" className="btn-orange">Save Changes</button>
            </form>
          )}
        </div>
      </aside>
      <main>
        <div className="profile-section">
          <div className="profile-header">
            <h2>{profileData.name}</h2>
          </div>
          <div className="profile-values">
            <h3>Your Value Graph</h3>
            {profileData.values && profileData.values.map((value, index) => (
              <span key={index}>{value}</span>
            ))}
          </div>
          <div className="profile-spheres">
            <h3>Spheres you are a member of</h3>
            <ul className="sphere-list">
              {profileData.spheres && profileData.spheres.map((sphere, index) => (
                <li key={index}><a href="sphere.html">{sphere}</a></li>
              ))}
            </ul>
          </div>
          <div className="profile-unions">
            <h3>Unions you are a member of</h3>
            <ul className="sphere-list">
              {profileData.unions && profileData.unions.map((union, index) => (
                <li key={index}><a href="union.html">{union}</a></li>
              ))}
            </ul>
          </div>
          <div className="profile-projects">
            <h3>Currently active projects</h3>
            <ul className="sphere-list">
              {profileData.projects && profileData.projects.map((project, index) => (
                <li key={index}><a href="project.html">{project}</a></li>
              ))}
            </ul>
          </div>
          <div className="profile-projects">
            <h3>Users you are following</h3>
            <ul className="sphere-list">
              {profileData.following && profileData.following.map((user, index) => (
                <li key={index}><a href="user.html">{user}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
