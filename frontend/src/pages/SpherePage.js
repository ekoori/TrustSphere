import React, { useState } from 'react';
import '../styles/Sphere.css';
import SphereBanner from '../components/SphereBanner';



const SpherePage = () => {
  const [sphere, setSphere] = useState({
    name: 'AI Development Sphere',
    location: 'Global',
    status: 'Active',
    admin: 'Jane Doe',
    description: 'The AI Development Sphere is dedicated to advancing artificial intelligence technologies and fostering collaboration among AI researchers and developers.',
    unions: ['Tech Union', 'AI Enthusiasts Union'],
    members: ['Jane Doe', 'John Smith', '50 more...'],
    projects: ['AI Ethics Initiative', 'OpenAI Collaboration'],
    values: ['innovation', 'technology', 'collaboration'],
    bannerImage: 'static/A_banner_image_for_an_AI_Development_Sphere_in_a_s.png'
  });

  const handleImageChange = (newImage) => {
    setSphere((prevSphere) => ({
      ...prevSphere,
      bannerImage: newImage
    }));
  };

  return (
    <div className="container">
      <aside className="sphere-sidebar">
        <h2>{sphere.name}</h2>
        <p><strong>Location:</strong> {sphere.location}</p>
        <p><strong>Status:</strong> <span className="status active">{sphere.status}</span></p>
        <p><strong>Admin:</strong> <a href="/user">{sphere.admin}</a></p>
        <a href="/sphere-management" className="btn-orange">Manage Sphere</a>
      </aside>
      <main>
        <div className="sphere-section">
          <SphereBanner image={sphere.bannerImage} onImageChange={handleImageChange} />

          <div className="sphere-description">
            <h3>Description</h3>
            <p>{sphere.description}</p>
          </div>
          <div className="sphere-unions">
            <h3>Member Unions</h3>
            <ul className="union-list">
              {sphere.unions.map((union, index) => (
                <li key={index}><a href="/union">{union}</a></li>
              ))}
            </ul>
          </div>
          <div className="sphere-members">
            <h3>All Members</h3>
            <ul className="member-list">
              {sphere.members.map((member, index) => (
                <li key={index}><a href={index < sphere.members.length - 1 ? "/user" : "/members"}>{member}</a></li>
              ))}
            </ul>
          </div>
          <div className="sphere-projects">
            <h3>Current Projects</h3>
            <ul className="project-list">
              {sphere.projects.map((project, index) => (
                <li key={index}><a href="/project">{project}</a></li>
              ))}
            </ul>
          </div>
          <div className="sphere-values">
            <h3>Value Graph</h3>
            {sphere.values.map((value, index) => (
              <span key={index}>#{value}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpherePage;
