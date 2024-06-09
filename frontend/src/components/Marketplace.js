/*
File : ./frontend/src/components/Marketplace.js
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

// import { useLogin } from '../App';

/*
 * Header component displaying the navigation bar
 * @param {object} props 
 * @returns JSX elements
 */

function Marketplace({services, newServiceVisible}) {
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        setIsFormVisible(newServiceVisible);
    }, [newServiceVisible]);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
      };
      
   // const { isLoggedIn, handleLogout } = useLogin(); // Get handleLogout from useLogin hook instead of defining it locally
    
    return ( 
<div>
    <ServiceForm isVisible={isFormVisible} />

    <section className="marketplace">
        {services.map(service => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </section>
</div>


);
};

export default Marketplace;
