// ./frontend/src/pages/Home.js:
// File Description: This file contains the Home component which is essentially the landing page of the application.
// Class: 
//    Home - Main landing page of the application showing main content on the platform, depending on the user context.
// Properties: None
// Methods: None



import React, { useState } from 'react';
import '../styles/TrustTrail.css';
import '../styles/Marketplace.css';

import TrustTrail from '../components/TrustTrail';
import Marketplace from '../components/Marketplace';


function Home() {
    const [activeTab, setActiveTab] = useState('trusttrail');
    const [notificationsVisible, setNotificationsVisible] = useState(false);

    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    const toggleNotifications = () => {
        setNotificationsVisible(!notificationsVisible);
    };
    const [isFormVisible, setIsFormVisible] = useState(false);
    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
      };


    
    const transactions = [
      {
        id: 'transaction-cpus',
        type: 'request',
        title: 'Requesting 7 H100 CPUs for OpenAI datacentre from Jansen Huang',
        sphere: 'OpenAI Sphere',
        participants: ['You', 'Jansen Huang'],
        description: 'This transaction involves requesting 7 H100 CPUs for the OpenAI datacentre. The request was initiated by Sam and is awaiting a response from Jansen Huang.',
        project: 'OpenAI Datacentre Upgrades',
        imageUrl: 'static/h100_cpus.webp',
        time: '30 min ago'
     },   
     {
        id: 'transaction-cpus',
        type: 'request',
        title: 'Requesting 7 H100 CPUs for OpenAI datacentre from Jansen Huang',
        sphere: 'OpenAI Sphere',
        participants: ['You', 'Jansen Huang'],
        description: 'This transaction involves requesting 7 H100 CPUs for the OpenAI datacentre. The request was initiated by Sam and is awaiting a response from Jansen Huang.',
        project: 'OpenAI Datacentre Upgrades',
        imageUrl: 'static/h100_cpus.webp',
        time: '30 min ago'
     },
        // Add more transactions here
    ];

    return (
        <div className="container">
            <aside>
                <h3>Marketplace</h3>
                <button className="btn-orange" onClick={toggleFormVisibility}>
                  {isFormVisible ? 'Hide New Service Form' : 'New Service'}
                </button>
                <h3>TrustTrail</h3>
                <div className="filters">
                    <button>Show All</button>
                    <button>Only Active</button>
                    <button>Only Past</button>
                    <button>Only Shoutouts</button>
                    <button>Only Trustifacts</button>
                </div>
            </aside>
            <main>
                <div className="selector-buttons">
                    <button className={`btn-selector ${activeTab === 'trusttrail' ? 'active' : ''}`} onClick={() => toggleTab('trusttrail')}>TrustTrail</button>
                    <button className={`btn-selector ${activeTab === 'offers-requests' ? 'active' : ''}`} onClick={() => toggleTab('offers-requests')}>Offers/Requests</button>
                </div>
                {activeTab === 'trusttrail' && <TrustTrail transactions={transactions} />}
                {activeTab === 'offers-requests' && <Marketplace newServiceVisible={isFormVisible}/>}
            </main>
        </div>
    );
}

export default Home;

