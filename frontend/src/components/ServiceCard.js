import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Marketplace.css';

function ServiceCard({ type, title, description, project, spheres, imageUrl }) {
  return (
    <div className={`transaction ${type}`}>

      <div className="transaction-header">
        <div className="left">
        {spheres && (
        <div className="spheres">
          {spheres.map((sphere, index) => (
            <span key={index} className="sphere">{sphere}</span>
          ))}
        </div>
      )}
          <h3>{title}</h3>
          <small>{type.charAt(0).toUpperCase() + type.slice(1)}</small>
          <div className='participants'>👤</div>
        </div>
        <div className="right">
                            <div className="like-timestamp">
                                <button className="like-btn like-btn-disabled">🖤</button>
                                <span className="likes-count">0</span>
                                <span className="time">30 min ago</span>
                            </div>
                        </div>
      </div>


      

      <div className="description-container">
      {imageUrl && <img src={imageUrl} alt="Service" className="transaction-image" />}
        <p className='description'>{description}</p>
        {project && (
        <div className="project-link">
          <a href={`/projects/${project}`}>View Project</a>
        </div>
      )}
      </div>
                    <div className="status">
                        <div className="progress">
                            <div className="step completed">Posted<br/><span className="time white">4d ago</span></div>
                            <div className="step">Accepted<br/><span className="time white"></span></div>
                            <div className="step">Completed<br/><span className="time white"></span></div>
                        </div>
                    </div>



    </div>
  );
}

ServiceCard.propTypes = {
  type:        PropTypes.string.isRequired,
  title:       PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  project:     PropTypes.string,
  spheres:     PropTypes.arrayOf(PropTypes.string),
  imageUrl:    PropTypes.string
};

export default ServiceCard;
