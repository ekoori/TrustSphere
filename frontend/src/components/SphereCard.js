import React from 'react';
import '../styles/Spheres.css';

const SphereCard = ({ id, name, unions, participants, description, projects, values, onJoin }) => {
  return (
    <div className="sphere-card" onClick={() => window.location.href = `sphere.html?id=${id}`}>
      <div className="sphere-card-header">
        <div className="sphere-card-left">
          <h3>{name}</h3>
          <div className="sphere-card-participants">
            <span>🔗 {unions.map((union, index) => (
              <a key={index} href="union.html" onClick={(e) => e.stopPropagation()}>{union}{index < unions.length - 1 ? ', ' : ''}</a>
            ))}</span>
          </div>
          <div className="sphere-card-participants">
            <span>👤 {participants.slice(0, 3).map((participant, index) => (
              <a key={index} href="user.html" onClick={(e) => e.stopPropagation()}>{participant}{index < 2 ? ', ' : ''}</a>
            ))}, <a href="members.html" onClick={(e) => e.stopPropagation()}>{participants.length - 3} more...</a></span>
          </div>
        </div>
        <div className="sphere-card-right">
          <button className="btn-orange" onClick={(e) => { e.stopPropagation(); onJoin(id); }}>Join Sphere</button>
        </div>
      </div>
      <div className="sphere-card-description-container">
        <p className="sphere-card-description">{description}</p>
      </div>
      <div className="sphere-card-project-link">
        {projects.slice(0, 3).map((project, index) => (
          <button key={index} className="btn-status" onClick={(e) => { e.stopPropagation(); window.location.href = 'project.html'; }}>{project}</button>
        ))}
        {projects.length > 3 && <a href="projects.html" onClick={(e) => e.stopPropagation()}>{projects.length - 3} more...</a>}
      </div>
      <div className="sphere-card-values">
        {values.map((value, index) => (
          <span key={index}>#{value}</span>
        ))}
      </div>
    </div>
  );
};

export default SphereCard;
