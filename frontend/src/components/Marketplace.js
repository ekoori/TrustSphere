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

function Marketplace({newServiceVisible}) {
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        setIsFormVisible(newServiceVisible);
    }, [newServiceVisible]);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
      };
      
   // const { isLoggedIn, handleLogout } = useLogin(); // Get handleLogout from useLogin hook instead of defining it locally
    
    return (
<main>
    <ServiceForm isVisible={isFormVisible} />

    <section className="marketplace">
        <ServiceCard type="request" title="Requesting Graphic Design Services" description="ha ha ha" project="none really" spheres={["sphere1"]} imageUrl="static/garden_old.webp" />


        <div className="transaction offer">
            <div className="transaction-header">
                <div className="left">
                    <small><a href="#">Heidelberg Community Sphere</a> | <a href="#">AI Australia Sphere</a></small>
                    <h3>Offering Graphic Design Services</h3>
                    <div className="participants">
                        <span>👤 <a href="profile.html">You</a></span>, <a href="user.html">John Doe</a>
                    </div>
                </div>
                <div className="right">
                    <div className="like-timestamp">
                        <button className="like-btn like-btn-disabled">🖤</button>
                        <span className="likes-count">15</span>
                        <span className="time">2h ago</span>
                    </div>
                </div>
            </div>
            <div className="description-container">
                <p className="description">
                    I am offering my services as a graphic designer for any community project. I specialize in creating modern and sleek designs for both web and print media.
                </p>
                <div className="project-link"><a className="disabled" /*onClick="event.stopPropagation();" */>Project not assigned</a></div>
            </div>
            <div className="status">
                <div className="progress">
                    <div className="step completed">Posted<br/><span className="time white">4d ago</span></div>
                    <div className="step">Accepted<br/><span className="time white"></span></div>
                    <div className="step">Completed<br/><span className="time white"></span></div>
                </div>
            </div>
        </div>

        <div className="transaction request">
            <div className="transaction-header">
                <div className="left">
                    <small><a href="#">OpenAI Sphere</a></small>
                    <h3>Requesting 7 H100 CPUs for OpenAI datacentre from Jansen Huang</h3>
                    <div className="participants">
                        <span>👤 <a href="profile.html">You</a></span>, <a href="user.html">Jansen Huang</a>
                    </div>
                </div>
                <div className="right">
                    <div className="like-timestamp">
                        <button className="like-btn like-btn-disabled">🖤</button>
                        <span className="likes-count">0</span>
                        <span className="time">30 min ago</span>
                    </div>
                </div>
            </div>
            <div className="description-container">
                <img src="h100_cpus.webp" alt="H100 CPUs" className="transaction-image" />
                <p className="description">
                    This transaction involves requesting 7 H100 CPUs for the OpenAI datacentre.
                </p>
               <div className="project-link"><a className="disabled" /* onClick="event.stopPropagation();" */>Project not assigned</a></div>
            </div>
            <div className="status">
                <div className="progress">
                    <div className="step completed">Posted<br/><span className="time white">30 min ago</span></div>
                    <div className="step disabled">Accepted<br/><span className="time white"></span></div>
                    <div className="step disabled">Completed<br/><span className="time white"></span></div>
                </div>
            </div>
        </div>
    </section>
</main>


);
};

export default Marketplace;
