// File: ./frontend/src/components/Sidebar.js:
// Description: React component file for the navigation sidebar.
// Class: Sidebar - Contains links to different pages/sections of the web application.
// Properties: None
// Methods: None

//import Projects from './Projects';
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Sidebar.css"

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <nav>
        <ul>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;