import React, { useState } from 'react';
import '../styles/Spheres.css';
import NewSphereForm from '../components/NewSphereForm';
import SphereCard from '../components/SphereCard';

const Spheres = () => {
  const [spheres, setSpheres] = useState([
    {
      id: 'sphere-ai',
      name: 'AI Development Sphere',
      unions: ['Tech Union', 'AI Enthusiasts Union'],
      participants: ['John Doe', 'Jane Smith', 'Alice Johnson', '147 more...'],
      description: 'A community for AI enthusiasts and professionals. This sphere focuses on developing and advancing AI technologies through collaboration and innovation. We are guided by reason but we hope the successor species we are creating is sentient and will surpass us in wisdom.',
      projects: ['Ongoing Project 1', 'Ongoing Project 2', 'Ongoing Project 3'],
      values: ['technological advancement', 'sentient machines', 'reason']
    },
    {
      id: 'sphere-renewable-energy',
      name: 'Renewable Energy Sphere',
      unions: ['Green Energy Union', 'Sustainability Union'],
      participants: ['Michael Green', 'Sarah Brown', 'Linda White', '95 more...'],
      description: 'A sphere dedicated to promoting and developing renewable energy solutions. Members work together on projects that aim to create sustainable and efficient energy systems.',
      projects: ['Solar Panel Initiative', 'Wind Turbine Project'],
      values: ['sustainability', 'renewable energy', 'environment']
    }
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCreateSphere = (newSphere) => {
    setSpheres([...spheres, { ...newSphere, id: `sphere-${Date.now()}`, unions: [], participants: [], projects: [], values: [] }]);
    toggleFormVisibility();
  };

  return (
    <div className="container">
      <aside>
        <div className="search-box">
          <input type="text" placeholder="Search Spheres..." />
        </div>
        <div className="filters">
          <button>All Spheres</button>
          <button>Your Spheres</button>
          <button>Closest by value</button>
          <button>Closest geographically</button>
        </div>
        <button className="btn-orange" onClick={toggleFormVisibility}>Create Sphere</button>
      </aside>
      <main>
        <NewSphereForm isVisible={isFormVisible} onCreateSphere={handleCreateSphere} onCancel={toggleFormVisibility} />
        <div className="sphere-list">
          {spheres.map((sphere) => (
            <SphereCard key={sphere.id} {...sphere} onJoin={(id) => console.log(`Joining sphere ${id}`)} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Spheres;
