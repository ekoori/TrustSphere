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
            type: 'offer',
            sphere: 'OpenAI Sphere',
            title: 'Requesting 7 H100 CPUs for OpenAI datacentre from Jansen Huang',
            participants: ['You', 'Jansen Huang'],
            description: 'This transaction involves requesting 7 H100 CPUs for the OpenAI datacentre. The request was initiated by Sam and is awaiting a response from Jansen Huang.',
            project: 'OpenAI Datacentre Upgrades',
            imageUrl: 'static/h100_cpus.webp',
            time: '30 min ago',
            status: 'Initiated',
            likesCount: 0,
            likedByCurrentUser: false,
            originService: '🔍 Requesting 7 H100 CPUs',
            initiatedTime: '30 min ago',
            inProgressTime: '',
            finishedTime: '',
            trustifactedTime: '',
            additionalCommentsTime: '',
            trustifacts: [],
            shoutouts: [],
            canModify: true,
            onAddTrustifact: () => console.log('Add Trustifact'),
            onAddShoutout: () => console.log('Add Shoutout'),
            onModifyTransaction: () => console.log('Modify Transaction')
        },
        {
            id: 'transaction-server-rack',
            type: 'request',
            sphere: 'OpenAI Sphere',
            title: 'Designing and building a server rack in OpenAI datacentre with Ilya S',
            participants: ['Ilya S', 'You'],
            description: 'This transaction involves the design and construction of a new server rack in the OpenAI datacentre. Ilya S, the project manager for the datacentre upgrade, initiated the transaction.',
            project: 'Project not assigned',
            imageUrl: '',
            time: '1h ago',
            status: 'Requested',
            likesCount: 0,
            likedByCurrentUser: false,
            originService: '🔍 Offering Tesla Roadster Ride',
            initiatedTime: '1h ago',
            inProgressTime: '',
            finishedTime: '',
            trustifactedTime: '',
            additionalCommentsTime: '',
            trustifacts: [],
            shoutouts: [],
            canModify: true,
            onAddTrustifact: () => console.log('Add Trustifact'),
            onAddShoutout: () => console.log('Add Shoutout'),
            onModifyTransaction: () => console.log('Modify Transaction')
        },
        {
            id: 'transaction-garden-fences',
            type: 'completed',
            sphere: 'Community Garden Sphere',
            title: 'Rebuilding fence on the garden with Jane Doe',
            participants: ['You', 'Jane Doe'],
            description: 'This transaction involved the replacement of the garden fence. I designed and installed the new fence, while Jane, the project manager for the Community Garden, coordinated the efforts and managed the project timeline.',
            project: 'Service: Offering Tesla Roadster Ride',
            imageUrl: 'static/garden_old.webp',
            time: '15 min ago',
            status: 'Initiated',
            likesCount: 10,
            likedByCurrentUser: true,
            originService: '🔍 Building Garden Fences',
            initiatedTime: '7d ago',
            inProgressTime: '5d ago',
            finishedTime: '3d ago',
            trustifactedTime: '2d ago',
            additionalCommentsTime: '15 min ago',
            trustifacts: [
                {
                    author: 'Jane Doe',
                    text: 'Working with Sam on the garden fence project was a fantastic experience...',
                    time: '1d ago',
                    likesCount: 3,
                    likedByCurrentUser: true,
                    imageUrl: null
                },
                {
                    author: 'You',
                    text: 'Jane\'s project management skills were top-notch...',
                    time: '12h ago',
                    likesCount: 5,
                    likedByCurrentUser: true,
                    imageUrl: 'static/garden_new.webp'
                }
            ],
            shoutouts: [
                {
                    author: 'Emily Johnson',
                    text: 'The new fence looks amazing! Great job, both of you!',
                    time: '30 min ago',
                    likesCount: 0,
                    likedByCurrentUser: false
                }
            ],
            canModify: false,
            onAddTrustifact: () => console.log('Add Trustifact'),
            onAddShoutout: () => console.log('Add Shoutout'),
            onModifyTransaction: () => console.log('Modify Transaction')
        }
    ];
    
    
    


    const services = [
        {
          id: 'offer-cpus',
          sphere: 'AI Development Sphere',
          title: 'Offering AI Consulting Services',
          provider: 'You',
          description: 'Elon is offering his expertise in AI consulting...',
          projectLink: 'Project not assigned',
          status: 'Posted',
          likesCount: 20,
          likedByCurrentUser: false,
          relatedTransactions: ['transaction-cpus'],
          timestamp: '2d ago'
        },
        // Add other services here
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

