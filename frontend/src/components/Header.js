// File: ./frontend/src/components/Header.js
// Description: Represents the Header component of the application.
// Class: Header - A fixed header that provides navigation and branding.
// Properties: None
// Methods: None
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import { useLogin } from '../App';
import NotificationPanel from './NotificationPanel';

const Header = () => {
    const { isLoggedIn, handleLogout } = useLogin();
    const [notificationsVisible, setNotificationsVisible] = useState(false);

    const toggleNotifications = () => {
        setNotificationsVisible(!notificationsVisible);
    };

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
                        <a href="#" id="notification-bell" onClick={toggleNotifications}>🔔</a>
                        <NotificationPanel notifications={notifications} isVisible={notificationsVisible} onClose={toggleNotifications} />
                    </li>
                    <li><a href="/marketplace">Marketplace</a></li>
                    <li><a href="/spheres">Spheres</a></li>
                    <li><a href="/unions">Unions</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/settings">Settings</a></li>
                    <li><a href="/admin">Admin</a></li>
                    <li><a href="/donate">Donate 💰</a></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {isLoggedIn 
                        ? <li><button onClick={handleLogout}>Logout</button></li>
                        : <li><Link to="/login">Login</Link></li>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;
