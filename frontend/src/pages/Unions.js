import React, { useState } from 'react';
import '../styles/Unions.css';
import NewUnionForm from '../components/NewUnionForm';
import UnionCard from '../components/UnionCard';

const Unions = () => {
  const [unions, setUnions] = useState([
    {
      id: 'union-tech',
      name: 'Tech Union',
      participants: ['John Doe', 'Jane Smith', 'Alice Johnson', '147 more...'],
      description: 'A community for technology enthusiasts and professionals. This union focuses on advancing technological innovations through collaboration and networking.',
      projects: ['Ongoing Project 1', 'Ongoing Project 2', 'Ongoing Project 3'],
      values: ['innovation', 'technology', 'networking']
    },
    {
      id: 'union-green-energy',
      name: 'Green Energy Union',
      participants: ['Michael Green', 'Sarah Brown', 'Linda White', '95 more...'],
      description: 'A union dedicated to promoting and developing renewable energy solutions. Members collaborate on projects aimed at creating sustainable and efficient energy systems.',
      projects: ['Solar Panel Initiative', 'Wind Turbine Project'],
      values: ['sustainability', 'renewable energy', 'environment']
    }
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCreateUnion = (newUnion) => {
    setUnions([...unions, { ...newUnion, id: `union-${Date.now()}`, participants: [], projects: [], values: [] }]);
    toggleFormVisibility();
  };

  return (
    <div className="container">
      <aside>
        <div className="search-box">
          <input type="text" placeholder="Search Unions..." />
        </div>
        <div className="filters">
          <button>All Unions</button>
          <button>Your Unions</button>
          <button>Closest by value</button>
          <button>Closest geographically</button>
        </div>
        <button className="btn-orange" onClick={toggleFormVisibility}>Create Union</button>
      </aside>
      <main>
        <NewUnionForm isVisible={isFormVisible} onCreateUnion={handleCreateUnion} onCancel={toggleFormVisibility} />
        <div className="union-list">
          {unions.map((union) => (
            <UnionCard key={union.id} {...union} onJoin={(id) => console.log(`Joining union ${id}`)} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Unions;
