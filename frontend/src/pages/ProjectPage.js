import React, { useState } from 'react';
import '../styles/ProjectPage.css';
import SphereBanner from '../components/SphereBanner';

const ProjectPage = () => {
  const [project, setProject] = useState({
    name: 'OpenAI Datacenter Expansion',
    owner: 'Tech Union',
    location: 'San Francisco, USA',
    status: 'In Progress',
    description: 'This project focuses on expanding the datacenter capacity for OpenAI to accommodate new AI models and enhance computational resources.',
    transactions: [
      { title: 'Transaction 1', status: 'In Progress', participants: ['Jane Smith'], details: 'Details about transaction 1.' },
      { title: 'Transaction 2', status: 'Completed', participants: ['Jane Smith'], details: 'Details about transaction 2.' },
      { title: 'Transaction 3', status: 'Initiated', participants: ['Jane Smith'], details: 'Details about transaction 3.' }
    ],
    values: ['innovation', 'technology', 'expansion'],
    shoutouts: [
      { author: 'Jane Smith', text: 'Great progress on expanding the datacenter!', likes: 12, time: '30m ago' },
      { author: 'John Doe', text: 'Excellent collaboration with the Tech Union!', likes: 8, time: '1h ago' }
    ],
    bannerImage: 'static/A_banner_image_for_a_tech_union_in_a_solar_punk_en.png'
  });
  const [previewUrl, setPreviewUrl] = useState(project.bannerImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setProject((prevProject) => ({
        ...prevProject,
        bannerImage: file
      }));
    }
  };

  return (
    <div className="container">
      <aside className="project-sidebar">
        <h2>{project.name}</h2>
        <p><strong>Owner:</strong> <a href="/union">{project.owner}</a></p>
        <p><strong>Location:</strong> {project.location}</p>
        <p><strong>Status:</strong> <span className={`status ${project.status.replace(' ', '-').toLowerCase()}`}>{project.status}</span></p>
        <a href="/project-management" className="btn-orange">Manage Project</a>
      </aside>
      <main>
        <div className="project-section">
          <SphereBanner previewUrl={previewUrl} onImageChange={handleImageChange} />

          <div className="project-description">
            <h3>Description</h3>
            <p>{project.description}</p>
          </div>
          <div className="project-transactions">
            <h3>Transactions</h3>
            {project.transactions.map((transaction, index) => (
              <div className="transaction" key={index}>
                <div className="transaction-header">
                  <h4><a href="/transaction">{transaction.title}</a></h4>
                  <button className="transaction-status-btn">{transaction.status}</button>
                </div>
                <p>{transaction.details}</p>
                <div className="transaction-participants">
                  {transaction.participants.map((participant, idx) => (
                    <span key={idx}>👤 <a href="/user">{participant}</a></span>
                  ))}
                </div>
              </div>
            ))}
            <a href="/transactions">5 more...</a>
          </div>
          <div className="project-values">
            <h3>Value Graph</h3>
            {project.values.map((value, index) => (
              <span key={index}>#{value}</span>
            ))}
          </div>
          <div className="project-shoutouts">
            <h3>Shoutouts</h3>
            {project.shoutouts.map((shoutout, index) => (
              <div className="shoutout" key={index}>
                <p><strong>👤 <a href="/user">{shoutout.author}</a></strong> {shoutout.text}</p>
                <div className="like-timestamp">
                  <button className="like-btn">❤️ {shoutout.likes}</button>
                  <div className="time">{shoutout.time}</div>
                </div>
              </div>
            ))}
            <a href="/shoutouts">More shoutouts...</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectPage;
