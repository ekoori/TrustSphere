import React, { useState } from 'react';
import '../styles/User.css';
import '../styles/TrustTrail.css';
import '../styles/Marketplace.css';

import TrustTrail from '../components/TrustTrail';
import Marketplace from '../components/Marketplace';
import NewShoutoutForm from '../components/NewShoutoutForm';

function UserPage() {
    const [activeTab, setActiveTab] = useState('trusttrail');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [shoutoutFormVisible, setShoutoutFormVisible] = useState(false);

    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const toggleShoutoutFormVisibility = () => {
        setShoutoutFormVisible(!shoutoutFormVisible);
    };

    const items = [
        {
            id: 'transaction-tesla-dojo',
            type: 'request',
            spheres: ['AI Development Sphere'],
            title: 'Requesting AI Research Collaboration for Tesla Dojo Upgrades from Sam Altman',
            participants: ['Elon Musk', 'You'],
            description: 'I requested a collaboration with Sam Altman to enhance the AI capabilities of Tesla\'s Dojo project. This collaboration focused on integrating advanced machine learning techniques to optimize performance and efficiency. The project was a resounding success, with significant improvements seen in the AI models. I have left a detailed trustifact highlighting the contributions and dedication of Sam Altman.',
            project: 'AI Consulting Services',
            imageUrl: '',
            time: '1d ago',
            status: 'Finished',
            likesCount: 50,
            likedByCurrentUser: true,
            originService: '🔍 AI Consulting Services',
            initiatedTime: '5d ago',
            inProgressTime: '3d ago',
            finishedTime: '1d ago',
            trustifactedTime: '',
            additionalCommentsTime: '',
            trustifacts: [
                {
                    author: 'Elon Musk',
                    text: 'Sam\'s expertise and dedication were crucial to the success of our AI research collaboration...',
                    time: '1d ago',
                    likesCount: 5,
                    likedByCurrentUser: true,
                    imageUrl: null
                }
            ],
            shoutouts: [],
            canModify: false,
            onAddTrustifact: () => console.log('Add Trustifact'),
            onAddShoutout: () => console.log('Add Shoutout'),
            onModifyTransaction: () => console.log('Modify Transaction')
        },
        {
            id: 'transaction-tesla-ride',
            type: 'offer',
            spheres: ['Renewable Energy Sphere'],
            title: 'Offering Tesla Roadster Ride',
            participants: ['Elon Musk', 'Joe Rogan'],
            description: 'I am offering a thrilling Tesla Roadster ride to interested parties. This offer is a unique opportunity to experience the high-performance electric vehicle firsthand, with me as the driver. The Roadster, known for its exceptional speed and cutting-edge technology, promises an unforgettable ride. Joe Rogan has already accepted the offer and is one of the participants enjoying this exhilarating experience.',
            project: 'Project not assigned',
            imageUrl: '',
            time: '3d ago',
            status: 'In Progress',
            likesCount: 30,
            likedByCurrentUser: true,
            originService: '🔍 View Transaction: Requesting Renewable Energy Solutions',
            initiatedTime: '3d ago',
            inProgressTime: '1d ago',
            finishedTime: '',
            trustifactedTime: '',
            additionalCommentsTime: '',
            trustifacts: [
                {
                    author: 'Joe Rogan',
                    text: 'The ride with Elon was exhilarating! His knowledge of the Roadster and the technology behind it is impressive.',
                    time: '2d ago',
                    likesCount: 8,
                    likedByCurrentUser: true,
                    imageUrl: null
                }
            ],
            shoutouts: [],
            canModify: true,
            onAddTrustifact: () => console.log('Add Trustifact'),
            onAddShoutout: () => console.log('Add Shoutout'),
            onModifyTransaction: () => console.log('Modify Transaction')
        },
        {
            id: 'shoutout-1',
            type: 'shoutout',
            spheres: [],
            author: 'Jane Doe',
            text: 'Elon has been an incredible collaborator on the AI research project. His insights and leadership are invaluable.',
            time: '5d ago',
            likesCount: 15,
            likedByCurrentUser: true
        }
    ];

    const services = [
        {
            id: 'service-ai-consulting',
            type: 'offer',
            spheres: ['AI Development Sphere'],
            title: 'Offering AI Consulting Services',
            provider: 'Elon Musk',
            description: 'Elon is offering his expertise in AI consulting to help innovative projects reach their full potential. His deep knowledge and experience in AI development can provide valuable insights and guidance for your next big project.',
            project: 'Project not assigned',
            imageUrl: '',
            time: '2d ago',
            status: 'Posted',
            likesCount: 20,
            likedByCurrentUser: true,
            relatedTransactions: ['Requesting AI Research Collaboration for Tesla Dojo Upgrades from Sam Altman - 1d ago'],
            canModify: true
        },
        {
            id: 'service-renewable-energy',
            type: 'request',
            spheres: ['Renewable Energy Sphere'],
            title: 'Requesting Renewable Energy Solutions',
            provider: 'Elon Musk',
            description: 'I am seeking innovative solutions to enhance the renewable energy infrastructure at Tesla. The goal is to implement sustainable and efficient energy systems that can power the future of electric vehicles and other Tesla projects.',
            project: 'Project not assigned',
            imageUrl: '',
            time: '4d ago',
            status: 'Posted',
            likesCount: 25,
            likedByCurrentUser: true,
            relatedTransactions: ['Offering Tesla Roadster Ride - involving Joe Rogan - Initiated 3d ago'],
            canModify: true
        }
    ];

    return (
        <div className="container">
            <aside>
                <div className="profile-header">
                    <img src="static/elon_musk_avatar.jpg" alt="Elon Musk" className="user-avatar" />
                    <div className="user-info">
                        <h2>Elon Musk</h2>
                        <p className="user-bio">CEO of SpaceX and Tesla, Co-founder of Neuralink and OpenAI.</p>
                        <div className="interaction-buttons">
                            <button className="btn-orange">Send Message</button>
                            <button className="btn-blue">Follow</button>
                            <button className="btn-purple" id="give-shoutout-btn" onClick={toggleShoutoutFormVisibility}>Give Shoutout</button>
                        </div>
                    </div>
                </div>
                <h3>Spheres</h3>
                <ul className="sphere-list">
                    <li><a href="/sphere">AI Development Sphere</a></li>
                    <li><a href="/sphere">Renewable Energy Sphere</a></li>
                    <li><a href="/sphere">Space Exploration Sphere</a></li>
                </ul>
                <h3>AI Summary</h3>
                <p>Elon's activities resonate with your interests in <strong>#community</strong>, <strong>#technology</strong>, and <strong>#sustainability</strong>. His recent collaborations in AI and renewable energy align with your focus on technological advancement and environmental sustainability. Based on his TrustTrail, Elon has shown himself to be a trustworthy person.</p>
            </aside>
            <main>
                <div className="selector-buttons">
                    <button className={`btn-selector ${activeTab === 'trusttrail' ? 'active' : ''}`} onClick={() => toggleTab('trusttrail')}>TrustTrail</button>
                    <button className={`btn-selector ${activeTab === 'offers-requests' ? 'active' : ''}`} onClick={() => toggleTab('offers-requests')}>Offers/Requests</button>
                </div>
                {activeTab === 'trusttrail' && (
                    <div>
                        {shoutoutFormVisible && <NewShoutoutForm onSave={(data) => console.log('Shoutout saved:', data)} onCancel={toggleShoutoutFormVisibility()} />}
                        <TrustTrail items={items} />
                    </div>
                )}
                {activeTab === 'offers-requests' && <Marketplace services={services} newServiceVisible={isFormVisible} />}
            </main>
        </div>
    );
}

export default UserPage;
