import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const NotificationPanel = ({ notifications, isVisible, onClose }) => {
    const panelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    return (
        <div ref={panelRef} id="notification-panel" className={`notification-panel ${isVisible ? '' : 'hidden'}`}>
            <h4>Notifications</h4>
            <ul className="notification-list">
                {notifications.map((notification, index) => (
                    <li key={index}>
                        <img src={notification.avatar} alt={notification.author} className="notification-avatar" />
                        <a href={notification.link}>{notification.message}</a>
                        <span className="notification-time">{notification.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

NotificationPanel.propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired
    })).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default NotificationPanel;
