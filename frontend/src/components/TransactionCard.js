import React from 'react';
import PropTypes from 'prop-types';
import '../styles/TrustTrail.css';

function TransactionCard({ type, title, sphere, participants, description, project, imageUrl, time }) {
    return (
        <div className={`transaction ${type}`} >
            <div className="transaction-header">
                <div className="left">
                    <small><a href="sphere.html" onClick={(e) => e.stopPropagation()}>{sphere}</a></small>
                    <h3>{title}</h3>
                    <div className="participants">
                        {participants.map((participant, index) => (
                            <span key={index}>👤 <a href="profile.html" onClick={(e) => e.stopPropagation()}>{participant}</a>{index < participants.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                    {project && (
                        <div className="origin-service">
                            <small><a href="#" onClick={(e) => e.stopPropagation()}>{project}</a></small>
                        </div>
                    )}
                </div>
                <div className="right">
                    <div className="like-timestamp">
                        <button className="like-btn like-btn-disabled" onClick={(e) => e.stopPropagation()}>🖤</button>
                        <span className="likes-count">0</span>
                        <span className="time">{time}</span>
                    </div>
                </div>
            </div>
            <div className="description-container">
                {imageUrl && <img src={imageUrl} alt={title} className="transaction-image" onClick={(e) => e.stopPropagation()} />}
                <p className="description">{description}</p>
                <div className="project-link">
                    {project ? <a href="#" onClick={(e) => e.stopPropagation()}>🔗 {project}</a> : <a className="disabled" onClick={(e) => e.stopPropagation()}>🔗 Project not assigned</a>}
                </div>
            </div>
        </div>
    );
}

TransactionCard.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sphere: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    project: PropTypes.string,
    imageUrl: PropTypes.string,
    time: PropTypes.string.isRequired
};

export default TransactionCard;
