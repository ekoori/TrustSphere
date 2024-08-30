// File: ./frontend/src/components/Header.js
// Description: Represents the Header component of the application.
// Class: Header - A fixed header that provides navigation and branding.
// Properties: None
// Methods: None
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import { useLogin } from '../App';  // Import the useLogin hook from App.js
import NotificationPanel from './NotificationPanel';

const Header = () => {
    const { isLoggedIn, handleLogout } = useLogin();  // Destructure the isLoggedIn and handleLogout from context
    const [notificationsVisible, setNotificationsVisible] = useState(false);

    const toggleNotifications = () => {
        setNotificationsVisible(!notificationsVisible);
    };

    console.log('Header - isLoggedIn:', isLoggedIn); // Debug log to check login state

    const notifications = [
        {
            avatar: 'static/elon_musk_avatar.jpg',
            author: 'Elon Musk',
            link: 'user.html',
            message: 'Elon accepted your request for a Roadster drive.',
            time: '2 hours ago'
        },
        {
            avatar: 'static/elon_musk_avatar.jpg',
            author: 'OpenAI',
            link: 'union.html',
            message: 'You got accepted to the OpenAI union.',
            time: '4 hours ago'
        },
        {
            avatar: 'static/elon_musk_avatar.jpg',
            author: 'John Doe',
            link: 'user.html',
            message: 'John Doe liked your post.',
            time: '1 day ago'
        },
        {
            avatar: 'static/elon_musk_avatar.jpg',
            author: 'Jane Smith',
            link: 'project.html',
            message: 'Jane Smith commented on your project.',
            time: '2 days ago'
        }
    ];

    return (
        <header>
            <div className="logo"><Link to="/">TrustSphere</Link></div>
            <nav>
                <ul>
                    <li className="notification-icon">
                        <button id="notification-bell" onClick={toggleNotifications} aria-label="Toggle notifications">🔔</button>
                        <NotificationPanel notifications={notifications} isVisible={notificationsVisible} onClose={toggleNotifications} />
                    </li>
                    <li><Link to="/marketplace">Marketplace</Link></li>
                    <li><Link to="/spheres">Spheres</Link></li>
                    <li><Link to="/unions">Unions</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/donate">Donate 💰</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {isLoggedIn 
                        ? <li><button onClick={handleLogout}>Logout</button></li>  // Show Logout if logged in
                        : <li><Link to="/login">Login</Link></li>  // Show Login if not logged in
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;
