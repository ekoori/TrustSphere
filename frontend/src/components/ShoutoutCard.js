// File: ./frontend/src/components/ShoutoutCard.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LikeTimestamp from './LikeTimestamp';
import '../styles/App.css';

const ShoutoutCard = ({ shoutout }) => {
    const [liked, setLiked] = useState(shoutout.likedByCurrentUser);
    const [likes, setLikes] = useState(shoutout.likesCount);

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
        // Implement further logic to update like status in the backend if necessary
    };

    return (
        <div className="shoutout-card">
            <div className="shoutout-header">
                <div className="left">
                    <span>👤 <a href="/user">{shoutout.author}</a></span>
                </div>
                <p className="shoutout-text">{shoutout.text}</p>
                <div className="right">
                    <LikeTimestamp
                        likedByCurrentUser={liked}
                        likesCount={likes}
                        time={shoutout.time}
                        onLike={(e) => {
                            e.stopPropagation();
                            handleLike();
                        }}
                    />
                </div>
            </div>

        </div>
    );
};

ShoutoutCard.propTypes = {
    shoutout: PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        likesCount: PropTypes.number.isRequired,
        likedByCurrentUser: PropTypes.bool.isRequired,
    }).isRequired,
};

export default ShoutoutCard;
