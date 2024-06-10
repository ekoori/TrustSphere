import React, { useState } from 'react';
import '../styles/Profile.css';

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
    setIsEditing(false);
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
              {profileData.values.map((value, index) => (
                <span key={index}>{value}</span>
              ))}
            </div>
            <div className="profile-spheres">
              <h3>Spheres you are a member of</h3>
              <ul className="sphere-list">
                {profileData.spheres.map((sphere, index) => (
                  <li key={index}><a href="sphere.html">{sphere}</a></li>
                ))}
              </ul>
            </div>
            <div className="profile-unions">
              <h3>Unions you are a member of</h3>
              <ul className="sphere-list">
                {profileData.unions.map((union, index) => (
                  <li key={index}><a href="union.html">{union}</a></li>
                ))}
              </ul>
            </div>
            <div className="profile-projects">
              <h3>Currently active projects</h3>
              <ul className="sphere-list">
                {profileData.projects.map((project, index) => (
                  <li key={index}><a href="project.html">{project}</a></li>
                ))}
              </ul>
            </div>
            <div className="profile-projects">
              <h3>Users you are following</h3>
              <ul className="sphere-list">
                {profileData.following.map((user, index) => (
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
