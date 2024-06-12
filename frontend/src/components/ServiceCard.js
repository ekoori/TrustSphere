// File: ./frontend/src/components/ServiceCard.js

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import LikeTimestamp from './LikeTimestamp';
import '../styles/Marketplace.css';

function ServiceCard({
    type,
    title,
    spheres,
    provider,
    description,
    project,
    imageUrl,
    time,
    status,
    likesCount,
    likedByCurrentUser,
    relatedTransactions,
    canModify,
    onAccept,
    onConfirm
}) {
    const [editableTitle, setEditableTitle] = useState(title);
    const [editableDescription, setEditableDescription] = useState(description);
    const [editableProject, setEditableProject] = useState(project);
    const [editableImageUrl, setEditableImageUrl] = useState(imageUrl || '');
    const [isTitleEditable, setIsTitleEditable] = useState(false);
    const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
    const [liked, setLiked] = useState(likedByCurrentUser);
    const [likes, setLikes] = useState(likesCount);
    const fileInputRef = useRef(null);

    const handleTitleChange = (e) => setEditableTitle(e.target.innerText);
    const handleDescriptionChange = (e) => setEditableDescription(e.target.innerText);

    const handleKeyPress = (e, field) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsTitleEditable(false);
            setIsDescriptionEditable(false);
            // Add any additional handling for Enter key press here
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
        switch (status) {
            case 'Posted Offer':
            case 'Posted Request':
                return (
                    <div className="progress">
                        <div className="step completed">Posted<br /><span className="comment white">{time}</span></div>
                        <div className="step in-progress" onClick={onAccept}>Accept<br /><span className="comment white">Click to Accept</span></div>
                        <div className="step disabled">Completed<br /><span className="comment white"></span></div>
                    </div>
                );
            case 'p Posted Offer':
            case 'p Posted Request':
                return (
                    <div className="progress">
                        <div className="step completed">Posted<br /><span className="comment white">{time}</span></div>
                        <div className="step disabled">Waiting...<br /><span className="comment white">on requesters</span></div>
                        <div className="step disabled">Completed<br /><span className="comment white"></span></div>
                    </div>
                );
            case 'Accepted Offer':
            case 'Accepted Request':
                return (
                    <div className="progress">
                        <div className="step completed">Posted<br /><span className="comment white">{time}</span></div>
                        <div className="step completed">Accepted Awaiting Confirm<br /><span className="comment white">{time}</span></div>
                        <div className="step disabled">Completed<br /><span className="comment white"> </span></div>
                    </div>
                );
            case 'p Accepted Offer':
            case 'p Accepted Request':
                return (
                    <div className="progress">
                        <div className="step completed">Posted<br /><span className="comment white">{time}</span></div>
                        <div className="step in-progress" onClick={onConfirm}>Accepted<br /><span className="comment white">Click to Confirm</span></div>
                        <div className="step disabled" >Completed<br /><span className="comment white"> </span></div>
                    </div>
                );
            case 'Confirmed Offer':
            case 'Confirmed Request':
                return (
                    <div className="progress">
                        <div className="step completed">Posted<br /><span className="comment white">{time}</span></div>
                        <div className="step completed">Accepted<br /><span className="comment white">{time}</span></div>
                        <div className="step disabled">In Progress<br /><span className="comment white">{time}</span></div>
                    </div>
                );
            case 'p Confirmed Offer':
            case 'p Confirmed Request':
                return (
                    <div className="progress">
                        <div className="step completed">Posted<br /><span className="comment white">{time}</span></div>
                        <div className="step completed">Accepted<br /><span className="comment white">{time}</span></div>
                        <div className="step disabled">In Progress<br /><span className="comment white">{time}</span></div>
                    </div>
                );
            case 'Completed':
                return (
                    <div className="progress">
                        <div className="step completed">Posted<br /><span className="comment white">{time}</span></div>
                        <div className="step completed">Accepted<br /><span className="comment white">{time}</span></div>
                        <div className="step completed">Completed<br /><span className="comment white">{time}</span></div>
                    </div>
                );
            case 'Cancelled':
                return (
                    <div className="progress">
                        <div className="step completed">Posted<br /><span className="comment white">{time}</span></div>
                        <div className="step completed">Accepted<br /><span className="comment white">{time}</span></div>
                        <div className="step completed">Cancelled<br /><span className="comment white">{time}</span></div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`service ${type}`}>
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
                        <span>👤 <a href="/user" onClick={(e) => e.stopPropagation()}>{provider}</a></span>
                    </div>
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
            {relatedTransactions && relatedTransactions.length > 0 && (
                <div className="service-transactions">
                    {relatedTransactions.map((transaction, index) => (
                        <div key={index} className="transaction-summary">
                            <small><a href="#" onClick={(e) => e.stopPropagation()}>{transaction}</a></small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

ServiceCard.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    spheres: PropTypes.arrayOf(PropTypes.string).isRequired,
    provider: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    project: PropTypes.string,
    imageUrl: PropTypes.string,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
    likedByCurrentUser: PropTypes.bool.isRequired,
    relatedTransactions: PropTypes.arrayOf(PropTypes.string),
    canModify: PropTypes.bool.isRequired,
    onAccept: PropTypes.func,
    onConfirm: PropTypes.func
};

export default ServiceCard;
