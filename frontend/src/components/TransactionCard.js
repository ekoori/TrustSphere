import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/TrustTrail.css';

function TransactionCard({
    type,
    title,
    sphere,
    participants,
    description,
    project,
    imageUrl,
    time,
    status,
    likesCount,
    likedByCurrentUser,
    originService,
    initiatedTime,
    inProgressTime,
    finishedTime,
    trustifactedTime,
    additionalCommentsTime,
    trustifacts,
    shoutouts,
    onAddTrustifact,
    onAddShoutout,
    onModifyTransaction,
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
            onModifyTransaction(field, e.target.innerText);
        }
    };

    return (
        <div className={`transaction ${type}`} >
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
                        {participants.map((participant, index) => (
                            <span key={index}>👤 <a href="profile.html" onClick={(e) => e.stopPropagation()}>{participant}</a>{index < participants.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                    {originService && (
                        <div className="origin-service">
                            <small><a href="#" onClick={(e) => e.stopPropagation()}>{originService}</a></small>
                        </div>
                    )}
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
                    <div className={`step ${status === 'Initiated' ? 'completed' : ''}`}>Initiated<br /><span className="time white">{initiatedTime}</span></div>
                    <div className={`step ${status === 'In Progress' ? 'completed' : ''}`}>In Progress<br /><span className="time white">{inProgressTime}</span></div>
                    <div className={`step ${status === 'Finished' ? 'completed' : ''}`}>Finished<br /><span className="time white">{finishedTime}</span></div>
                    <div className={`step ${status === 'Trustifacted' ? 'completed' : ''}`}>Trustifacted<br /><span className="time white">{trustifactedTime}</span></div>
                    <div className={`step ${status === 'Additional Comments Added' ? 'completed' : ''}`}>Additional Comments Added<br /><span className="time white">{additionalCommentsTime}</span></div>
                </div>
            </div>
            <hr />
            {trustifacts && trustifacts.length > 0 ? (
                <div className="trustifacts">
                    {trustifacts.map((trustifact, index) => (
                        <div key={index} className="trustifact">
                            <div className="left">
                                {trustifact.imageUrl && <img src={trustifact.imageUrl} alt={trustifact.text} className="trustifact-image" onClick={(e) => e.stopPropagation()} />}
                                <p><strong>{trustifact.author}:</strong> {trustifact.text}</p>
                            </div>
                            <div className="right">
                                <div className="like-timestamp">
                                    <button className="like-btn" onClick={(e) => e.stopPropagation()}>{trustifact.likedByCurrentUser ? '❤️' : '🖤'}</button>
                                    <span className="likes-count">{trustifact.likesCount}</span>
                                    <span className="time">{trustifact.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div id="trustifact-entry">
                    <button id="save-trustifact-btn" onClick={onAddTrustifact}>Add Trustifact</button>
                </div>
            )}
            <div className="shoutouts">
                <div id="shoutout-entry">
                    <button id="save-shoutout-btn" onClick={onAddShoutout}>Add Shoutout</button>
                </div>
                {shoutouts && shoutouts.length > 0 && shoutouts.map((shoutout, index) => (
                    <div key={index} className="shoutout">
                        <div className="left">
                            <p><strong>{shoutout.author}:</strong> {shoutout.text}</p>
                        </div>
                        <div className="right">
                            <div className="like-timestamp">
                                <button className="like-btn" onClick={(e) => e.stopPropagation()}>{shoutout.likedByCurrentUser ? '❤️' : '🖤'}</button>
                                <span className="likes-count">{shoutout.likesCount}</span>
                                <span className="time">{shoutout.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
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
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
    likedByCurrentUser: PropTypes.bool.isRequired,
    originService: PropTypes.string,
    initiatedTime: PropTypes.string,
    inProgressTime: PropTypes.string,
    finishedTime: PropTypes.string,
    trustifactedTime: PropTypes.string,
    additionalCommentsTime: PropTypes.string,
    trustifacts: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        likesCount: PropTypes.number.isRequired,
        likedByCurrentUser: PropTypes.bool.isRequired,
        imageUrl: PropTypes.string
    })),
    shoutouts: PropTypes.arrayOf(PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        likesCount: PropTypes.number.isRequired,
        likedByCurrentUser: PropTypes.bool.isRequired
    })),
    onAddTrustifact: PropTypes.func.isRequired,
    onAddShoutout: PropTypes.func.isRequired,
    onModifyTransaction: PropTypes.func.isRequired,
    canModify: PropTypes.bool.isRequired
};

export default TransactionCard;
