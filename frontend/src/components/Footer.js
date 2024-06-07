// File: ./frontend/src/components/Footer.js
// Description: Represents the Footer component of the application.
// Class: Footer - A fixed footer that provides navigation.
// Properties: None
// Methods: None

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

/*
 * Header component displaying the navigation bar
 * @param {object} props 
 * @returns JSX elements
 */

const Footer = () => {

    
    return (
      <footer>
        <ul>
            <li><a href="/about">About TrustSphere</a></li>
            <li><a href="contribute.html">Contribute</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="tos.html">Terms of Service</a></li>
        </ul>
      </footer>




    );
};

export default Footer;
