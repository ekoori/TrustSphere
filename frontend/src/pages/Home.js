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

    const items = [
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
            id: 'shoutout-2',
            type: 'shoutout',
            author: 'John Doe',
            text: 'Working with Sam has been a fantastic experience. His expertise in project management is top-notch.',
            time: '3h ago',
            likesCount: 5,
            likedByCurrentUser: true
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
        },
        {
            id: 'shoutout-1',
            type: 'shoutout',
            author: 'Emily Johnson',
            text: 'Sam is an amazing collaborator! His insights and dedication are invaluable.',
            time: '1h ago',
            likesCount: 10,
            likedByCurrentUser: true
        },

    ];

    const services = [
        {
            id: 'service-ai-consulting',
            type: 'offer',
            sphere: 'AI Development Sphere',
            title: 'Offering AI Consulting Services',
            provider: 'Elon Musk',
            description: 'Elon is offering his expertise in AI consulting to help innovative projects reach their full potential. His deep knowledge and experience in AI development can provide valuable insights and guidance for your next big project.',
            project: 'Project not assigned',
            imageUrl: 'static/garden_old.webp',
            time: '2d ago',
            status: 'Posted',
            likesCount: 20,
            likedByCurrentUser: false,
            relatedTransactions: ['Requesting 7 H100 CPUs - involving Jansen Huang - Initiated 30 min ago'],
            canModify: true
        },
        {
            id: 'service-garden-fences',
            type: 'offer',
            sphere: 'Community Garden Sphere',
            title: 'Building garden fences',
            provider: 'Sam',
            description: 'I am offering my services to build garden fences. With extensive experience in carpentry and landscaping, I can provide sturdy and aesthetically pleasing fences for your garden.',
            project: 'Project not assigned',
            imageUrl: '',
            time: '15 min ago',
            status: 'Posted',
            likesCount: 10,
            likedByCurrentUser: false,
            relatedTransactions: ['Rebuilding fence on the garden - involving Jane Doe - Initiated 15 min ago'],
            canModify: true
        }
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
                {activeTab === 'trusttrail' && <TrustTrail items={items} />}
                {activeTab === 'offers-requests' && <Marketplace services={services} newServiceVisible={isFormVisible}/>}
            </main>
        </div>
    );
}

export default Home;
