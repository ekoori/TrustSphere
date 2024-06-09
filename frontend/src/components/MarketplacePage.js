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
    

   const services = [
    {
      id: 'service-graphic-design',
      type: 'offer',
      sphere: 'Heidelberg Community Sphere | AI Australia Sphere',
      title: 'Offering Graphic Design Services',
      provider: 'You, John Doe',
      description: 'I am offering my services as a graphic designer for any community project. I specialize in creating modern and sleek designs for both web and print media.',
      project: 'Project not assigned',
      imageUrl: '',
      time: '2h ago',
      status: 'Posted',
      likesCount: 15,
      likedByCurrentUser: false,
      relatedTransactions: [],
      canModify: true
    },
    {
      id: 'service-h100-cpus',
      type: 'request',
      sphere: 'OpenAI Sphere',
      title: 'Requesting 7 H100 CPUs for OpenAI datacentre from Jansen Huang',
      provider: 'You, Jansen Huang',
      description: 'This transaction involves requesting 7 H100 CPUs for the OpenAI datacentre.',
      project: 'Project not assigned',
      imageUrl: 'static/h100_cpus.webp',
      time: '30 min ago',
      status: 'Posted',
      likesCount: 0,
      likedByCurrentUser: false,
      relatedTransactions: [],
      canModify: true
    }
  ];
  



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
<main>
<Marketplace services={services} newServiceVisible={isFormVisible}/>
</main>
</div>


);
};

export default MarketplacePage;
