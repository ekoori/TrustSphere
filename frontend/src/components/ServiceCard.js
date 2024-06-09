import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Marketplace.css';

function ServiceCard({
    type,
    title,
    sphere,
    provider,
    description,
    project,
    imageUrl,
    time,
    status,
    likesCount,
    likedByCurrentUser,
    relatedTransactions,
    onAddRelatedTransaction,
    canModify
}) {
    const [editableTitle, setEditableTitle] = useState(title);
    const [editableDescription, setEditableDescription] = useState(description);
    const [editableProject, setEditableProject] = useState(project);
    const [editableImageUrl, setEditableImageUrl] = useState(imageUrl || 'placeholder.jpg');

    const handleTitleChange = (e) => setEditableTitle(e.target.innerText);
    const handleDescriptionChange = (e) => setEditableDescription(e.target.innerText);

    const handleKeyPress = (e, field) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onAddRelatedTransaction(field, e.target.innerText);
        }
    };

    return (
        <div className={`service ${type}`} >
            <div className="transaction-header">
                <div className="left">
                    <small><a href="sphere.html" onClick={(e) => e.stopPropagation()}>{sphere}</a></small>
                    <h3
                        contentEditable={canModify}
                        suppressContentEditableWarning={true}
                        onBlur={handleTitleChange}
                        onKeyPress={(e) => handleKeyPress(e, 'title')}
                        className={canModify ? 'editable' : ''}
                    >
                        {editableTitle}
                    </h3>
                    <div className="participants">
                        <span>👤 <a href="profile.html" onClick={(e) => e.stopPropagation()}>{provider}</a></span>
                    </div>
                </div>
                <div className="right">
                    <div className="like-timestamp">
                        <button className="like-btn" onClick={(e) => e.stopPropagation()}>{likedByCurrentUser ? '❤️' : '🖤'}</button>
                        <span className="likes-count">{likesCount}</span>
                        <span className="time">{time}</span>
                    </div>
                </div>
            </div>
            <div className="description-container">
                {editableImageUrl ? (
                    <img
                        src={editableImageUrl}
                        alt={editableTitle}
                        className="transaction-image"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => canModify && setEditableImageUrl('')}
                    />
                ) : (
                    <div className="image-placeholder" onMouseEnter={() => canModify && setEditableImageUrl('')}>
                        Image Placeholder
                    </div>
                )}
                <p
                    contentEditable={canModify}
                    suppressContentEditableWarning={true}
                    onBlur={handleDescriptionChange}
                    onKeyPress={(e) => handleKeyPress(e, 'description')}
                    className={`description ${canModify ? 'editable' : ''}`}
                >
                    {editableDescription}
                </p>
                <div className="project-link" onMouseEnter={() => canModify && setEditableProject('')}>
                    {editableProject ? (
                        <a href="#" onClick={(e) => e.stopPropagation()}>{editableProject}</a>
                    ) : (
                        <select onChange={(e) => setEditableProject(e.target.value)}>
                            <option value="Project 1">Project 1</option>
                            <option value="Project 2">Project 2</option>
                        </select>
                    )}
                </div>
            </div>
            <div className="status">
                <div className="progress">
                    <div className={`step ${status === 'Posted' ? 'completed' : ''}`}>Posted<br /><span className="time white">{time}</span></div>
                    <div className={`step ${status === 'In Progress' ? 'completed' : ''}`}>Request this<br /><span className="comment white">Click to Request</span></div>
                    <div className={`step ${status === 'Completed' ? 'completed' : ''}`}>Completed<br /><span className="time white"></span></div>
                </div>
            </div>
            <hr />
            {relatedTransactions && relatedTransactions.length > 0 ? (
                <div className="service-transactions">
                    {relatedTransactions.map((transaction, index) => (
                        <div key={index} className="transaction-summary">
                            <small><a href="#" onClick={(e) => e.stopPropagation()}>{transaction}</a></small>
                        </div>
                    ))}
                </div>
            ) : (
                <div id="related-transaction-entry">
                    <button id="save-related-transaction-btn" onClick={onAddRelatedTransaction}>Add Related Transaction</button>
                </div>
            )}
        </div>
    );
}

ServiceCard.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sphere: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    project: PropTypes.string,
    imageUrl: PropTypes.string,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
    likedByCurrentUser: PropTypes.bool.isRequired,
    relatedTransactions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAddRelatedTransaction: PropTypes.func.isRequired,
    canModify: PropTypes.bool.isRequired
};

export default ServiceCard;
