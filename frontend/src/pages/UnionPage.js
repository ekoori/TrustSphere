import React, { useState } from 'react';
import '../styles/UnionPage.css';
import SphereBanner from '../components/SphereBanner';

const UnionPage = () => {
  const [union, setUnion] = useState({
    name: 'Tech Union',
    location: 'San Francisco, USA',
    status: 'Active',
    lead: 'John Doe',
    description: 'The Tech Union is focused on advancing technology and innovation through collaboration and resource sharing.',
    governance: ['>50% majority', 'Vote on: accepting new member', 'Delegates: project management to a single PM', 'TrustiFacting'],
    activeVoting: 'Current Voting',
    orgchart: [
      { role: 'Lead', name: 'John Doe' },
      { role: 'Trustifactors', names: ['Jane Smith', 'Michael Green'] },
      { role: 'PMs', names: ['Sarah Brown', 'Chris Johnson'] },
    ],
    members: ['John Doe', 'Jane Smith', '50 more...'],
    projects: ['OpenAI Datacenter Expansion', 'Community Garden Initiative'],
    values: ['innovation', 'technology', 'collaboration'],
    bannerImage: 'static/A_banner_image_for_a_tech_union_in_a_solar_punk_en.png'
  });
  const [previewUrl, setPreviewUrl] = useState(union.bannerImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setUnion((prevUnion) => ({
        ...prevUnion,
        bannerImage: file
      }));
    }
  };

  return (
    <div className="container">
      <aside className="union-sidebar">
        <h2>{union.name}</h2>
        <p><strong>Location:</strong> {union.location}</p>
        <p><strong>Status:</strong> <span className="status active">{union.status}</span></p>
        <p><strong>Lead:</strong> <a href="/user">{union.lead}</a></p>
        <a href="/union-management" className="btn-orange">Manage Union</a>
        <p><strong>Governance:</strong></p>
        <ul>
          {union.governance.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p><strong>Active voting:</strong></p>
        <a href="/voting" className="btn-orange">{union.activeVoting}</a>
      </aside>
      <main>
        <div className="union-section">
          <SphereBanner previewUrl={previewUrl} onImageChange={handleImageChange} />

          <div className="union-description">
            <h3>Description</h3>
            <p>{union.description}</p>
          </div>
          <div className="union-orgchart">
            <h3>Orgchart</h3>
            <ul className="orgchart-list">
              {union.orgchart.map((item, index) => (
                <li key={index}>
                  <strong>{item.role}:</strong> {Array.isArray(item.names) ? item.names.map((name, idx) => (
                    <span key={idx}><a href="/user">{name}</a>{idx < item.names.length - 1 ? ', ' : ''}</span>
                  )) : <a href="/user">{item.name}</a>}
                </li>
              ))}
            </ul>
          </div>
          <div className="union-members">
            <h3>All Members</h3>
            <ul className="member-list">
              {union.members.map((member, index) => (
                <li key={index}><a href={index < union.members.length - 1 ? "/user" : "/members"}>{member}</a></li>
              ))}
            </ul>
          </div>
          <div className="union-projects">
            <h3>Current Projects</h3>
            <ul className="project-list">
              {union.projects.map((project, index) => (
                <li key={index}><a href="/project">{project}</a></li>
              ))}
            </ul>
          </div>
          <div className="union-values">
            <h3>Value Graph</h3>
            {union.values.map((value, index) => (
              <span key={index}>#{value}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnionPage;
