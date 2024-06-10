import React from 'react';
import PropTypes from 'prop-types';

const ShoutoutCard = ({ shoutout }) => {
    return (
        <div className="shoutout-card">
            <div className="shoutout-header">
                <div className="left">
                    <span>👤 <a href="/user">{shoutout.author}</a></span>
                </div>
                <div className="right">
                    <div className="like-timestamp">
                        <button className="like-btn">{shoutout.likedByCurrentUser ? '❤️' : '🖤'}</button>
                        <span className="likes-count">{shoutout.likesCount}</span>
                        <span className="time">{shoutout.time}</span>
                    </div>
                </div>
            </div>
            <p className="shoutout-text">{shoutout.text}</p>
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
