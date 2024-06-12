// File: ./frontend/src/components/LikeTimestamp.js

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

function LikeTimestamp({ likedByCurrentUser, likesCount, time, onLike }) {
    return (
        <div className="like-timestamp">
            <button className={`like-btn ${likedByCurrentUser ? 'liked' : ''}`} onClick={onLike}>
                {likedByCurrentUser ? '❤️' : '🖤'}
            </button>
            <span className="likes-count">{likesCount}</span>
            <span className="time">{time}</span>
        </div>
    );
}

LikeTimestamp.propTypes = {
    likedByCurrentUser: PropTypes.bool.isRequired,
    likesCount: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    onLike: PropTypes.func.isRequired
};

export default LikeTimestamp;
