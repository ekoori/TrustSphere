import React from 'react';
import '../styles/Unions.css';

const UnionCard = ({ id, name, participants, description, projects, values, onJoin }) => {
  return (
    <div className="union-card" onClick={() => window.location.href = `/union`}>
      <div className="union-card-header">
        <div className="union-card-left">
          <h3>{name}</h3>
          <div className="union-card-participants">
            <span>👤 {participants.slice(0, 3).map((participant, index) => (
              <a key={index} href="/user" onClick={(e) => e.stopPropagation()}>{participant}{index < 2 ? ', ' : ''}</a>
            ))}, <a href="/union" onClick={(e) => e.stopPropagation()}>{participants.length - 3} more...</a></span>
          </div>
        </div>
        <div className="union-card-right">
          <button className="btn-orange" onClick={(e) => { e.stopPropagation(); onJoin(id); }}>Request to join</button>
        </div>
      </div>
      <div className="union-card-description-container">
        <p className="union-card-description">{description}</p>
      </div>
      <div className="union-card-project-link">
        {projects.slice(0, 3).map((project, index) => (
          <button key={index} className="btn-status" onClick={(e) => { e.stopPropagation(); window.location.href = '/project'; }}>{project}</button>
        ))}
        {projects.length > 3 && <a href="/projects" onClick={(e) => e.stopPropagation()}>{projects.length - 3} more...</a>}
      </div>
      <div className="union-card-values">
        {values.map((value, index) => (
          <span key={index}>#{value}</span>
        ))}
      </div>
    </div>
  );
};

export default UnionCard;
