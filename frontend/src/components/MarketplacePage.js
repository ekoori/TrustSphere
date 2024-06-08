/*
File : ./frontend/src/components/MarketplacePage.js
Description: This file creates a React component for the Marketplace, where users can post and view services. 
        It contains functionality for loading the services from the API and displaying them.
Class: Marketplace
Properties: 
  [-] state: contains a list of services fetched from the API.
Methods: 
  [-] componentDidMount(): calls the API to fetch the list of services when the component is first mounted.
  [-] handleServiceSubmission(): submits a new service to the API (not yet implemented).
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import '../styles/Marketplace.css';

import SphereBanner from './SphereBanner';
import ServiceForm from './ServiceForm';
import ServiceCard from './ServiceCard';
import Marketplace from './Marketplace';

// import { useLogin } from '../App';

/*
 * Header component displaying the navigation bar
 * @param {object} props 
 * @returns JSX elements
 */

function MarketplacePage() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
      };
   // const { isLoggedIn, handleLogout } = useLogin(); // Get handleLogout from useLogin hook instead of defining it locally
    
    return (
<div className="container">
<aside>

    <button className="btn-orange" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Hide New Service Form' : 'New Service'}
      </button>



    <div className="search-box">
        <input type="text" placeholder="Search..." />
    </div>
    <div className="filters">
        <button>Show All</button>
        <button>Filter by Sphere</button>
        <button>Your Contacts</button>
        <button>My Offers/Requests</button>
        <button>Offers</button>
        <button>Requests</button>
        <button>Active</button>
        <button>Completed</button>
    </div>
</aside>

<Marketplace newServiceVisible={isFormVisible}/>

</div>


);
};

export default MarketplacePage;
