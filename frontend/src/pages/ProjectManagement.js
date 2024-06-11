import React, { useState } from 'react';
import '../styles/ProjectManagement.css';
import SphereBanner from '../components/SphereBanner';
import TrustTrail from '../components/TrustTrail';
import Marketplace from '../components/Marketplace';

const ProjectManagement = () => {
  const [project, setProject] = useState({
    title: 'Project Title',
    description: 'Detailed description of the project goes here. This should provide an overview of the project objectives, timeline, and other relevant information.',
    ownerUnion: 'AI Australia Sphere',
    leaders: ['John Doe', 'Jane Smith'],
    bannerImage: 'static/A_banner_image_for_a_tech_union_in_a_solar_punk_en.png',
  });

  const [previewUrl, setPreviewUrl] = useState(project.bannerImage);
  const [activeTab, setActiveTab] = useState('trusttrail');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setProject((prevProject) => ({
        ...prevProject,
        bannerImage: file,
      }));
    }
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const transactions = [
    // Example transactions from the mockup
    {
      id: 'transaction-cpus',
      type: 'request',
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
  ];

  const services = [
    // Example services from the mockup
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
        <h1>{project.title}</h1>
        <SphereBanner previewUrl={previewUrl} onImageChange={handleImageChange} />
        <p className="project-description">{project.description}</p>
        <h2>Owner Union</h2>
        <p><a href="union.html">{project.ownerUnion}</a></p>
        <h2>Project Leaders</h2>
        <ul className="leaders-list">
          {project.leaders.map((leader, index) => (
            <li key={index}><a href="profile.html">{leader}</a></li>
          ))}
        </ul>
        <button className="btn-orange" onClick={() => setIsFormVisible(true)}>Request Service</button>
      </aside>
      <main>
        <div className="selector-buttons">
          <button className={`btn-selector ${activeTab === 'trusttrail' ? 'active' : ''}`} onClick={() => toggleTab('trusttrail')}>TrustTrail</button>
          <button className={`btn-selector ${activeTab === 'offers-requests' ? 'active' : ''}`} onClick={() => toggleTab('offers-requests')}>Offers/Requests</button>
        </div>
        {activeTab === 'trusttrail' && <TrustTrail items={transactions} />}
        {activeTab === 'offers-requests' && <Marketplace services={services} newServiceVisible={isFormVisible} />}
      </main>
    </div>
  );
};

export default ProjectManagement;
