// File: ./frontend/src/components/TransactionCard.js

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import LikeTimestamp from './LikeTimestamp';
import '../styles/TrustTrail.css';

function TransactionCard({
    type,
    title,
    spheres,
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
    const [editableImageUrl, setEditableImageUrl] = useState(imageUrl || '');
    const [liked, setLiked] = useState(likedByCurrentUser);
    const [likes, setLikes] = useState(likesCount);
    const [isTitleEditable, setIsTitleEditable] = useState(false);
    const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
    const fileInputRef = useRef(null);

    const handleTitleChange = (e) => setEditableTitle(e.target.innerText);
    const handleDescriptionChange = (e) => setEditableDescription(e.target.innerText);

    const handleKeyPress = (e, field) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsTitleEditable(false);
            setIsDescriptionEditable(false);
            onModifyTransaction(field, e.target.innerText);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditableImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImagePlaceholderClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
        // Implement further logic to update like status in the backend if necessary
    };

    const renderStatusButtons = () => {
        const statusMapping = {
            'Initiated': initiatedTime,
            'In Progress': inProgressTime,
            'Finished': finishedTime,
            'Trustifacted': trustifactedTime,
            'Additional Comments Added': additionalCommentsTime
        };

        return (
            <div className="progress">
                {Object.entries(statusMapping).map(([key, value], index) => (
                    <div key={index} className={`step ${status === key ? 'completed' : ''}`}>
                        {key}<br /><span className="time white">{value}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`transaction ${type}`}>
            <div className="transaction-header">
                <div className="left">
                    <small>
                        {spheres.map((sphere, index) => (
                            <React.Fragment key={index}>
                                <a href="/sphere" onClick={(e) => e.stopPropagation()}>{sphere}</a>
                                {index < spheres.length - 1 && ', '}
                            </React.Fragment>
                        ))}
                    </small>
                    <h3
                        contentEditable={isTitleEditable}
                        suppressContentEditableWarning={true}
                        onBlur={handleTitleChange}
                        onClick={() => canModify && setIsTitleEditable(true)}
                        onKeyPress={(e) => handleKeyPress(e, 'title')}
                        className={canModify ? 'editable' : ''}
                        style={{ backgroundColor: isTitleEditable ? '#f0f0f0' : 'transparent' }}
                    >
                        {editableTitle}
                    </h3>
                    <div className="participants">
                        {participants.map((participant, index) => (
                            <span key={index}>👤 <a href="/user" onClick={(e) => e.stopPropagation()}>{participant}</a>{index < participants.length - 1 ? ', ' : ''}</span>
                        ))}
                    </div>
                    {originService && (
                        <div className="origin-service">
                            <small><a href="#" onClick={(e) => e.stopPropagation()}>{originService}</a></small>
                        </div>
                    )}
                </div>
                <div className="right">
                    <LikeTimestamp
                        likedByCurrentUser={liked}
                        likesCount={likes}
                        time={time}
                        onLike={(e) => {
                            e.stopPropagation();
                            handleLike();
                        }}
                    />
                </div>
            </div>
            <div className="description-container">
                {editableImageUrl ? (
                    <img
                        src={editableImageUrl}
                        alt={editableTitle}
                        className="transaction-image"
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <div className="image-placeholder" onClick={handleImagePlaceholderClick}>
                        Image Placeholder
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <p
                    contentEditable={isDescriptionEditable}
                    suppressContentEditableWarning={true}
                    onBlur={handleDescriptionChange}
                    onClick={() => canModify && setIsDescriptionEditable(true)}
                    onKeyPress={(e) => handleKeyPress(e, 'description')}
                    className={`description ${canModify ? 'editable' : ''}`}
                    style={{ backgroundColor: isDescriptionEditable ? '#f0f0f0' : 'transparent' }}
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
                {renderStatusButtons()}
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
                                <LikeTimestamp
                                    likedByCurrentUser={trustifact.likedByCurrentUser}
                                    likesCount={trustifact.likesCount}
                                    time={trustifact.time}
                                    onLike={(e) => {
                                        e.stopPropagation();
                                        // Logic for liking trustifact
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div id="trustifact-entry">
                    <button id="save-trustifact-btn" onClick={onAddTrustifact}>Add Trustifact</button>
                </div>
            )}
            <hr />
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
                            <LikeTimestamp
                                likedByCurrentUser={shoutout.likedByCurrentUser}
                                likesCount={shoutout.likesCount}
                                time={shoutout.time}
                                onLike={(e) => {
                                    e.stopPropagation();
                                    // Logic for liking shoutout
                                }}
                            />
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
    spheres: PropTypes.arrayOf(PropTypes.string).isRequired,
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
