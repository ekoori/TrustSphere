// File: ./frontend/src/components/Projects.js:
// File Description: It's a React.js file containing Projects Component.
// Class: Projects - displays a list of all projects and their details.
// Properties: state - contains a list of projects fetched from the API.
// Methods:
//    [-] componentDidMount() - fetches list of projects from the API when component loads.

import React, { useState } from 'react';
import '../styles/Projects.css';
import NewProjectForm from './NewProjectForm';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 'project-openai',
      name: 'OpenAI Datacenter Expansion',
      owner: 'Tech Union',
      participants: ['John Doe', 'Jane Smith', 'Alice Johnson', '147 more...'],
      description: 'This project focuses on expanding the datacenter capacity for OpenAI to accommodate new AI models and enhance computational resources.',
      transactions: [
        { title: 'Transaction 1', status: 'In Progress', details: 'Details about transaction 1.', participant: 'Jane Smith' },
        { title: 'Transaction 2', status: 'Completed', details: 'Details about transaction 2.', participant: 'Jane Smith' },
        { title: 'Transaction 3', status: 'Initiated', details: 'Details about transaction 3.', participant: 'Jane Smith' }
      ],
      statusButtons: [
        { status: 'Initiated', label: 'Initiated' },
        { status: 'In Progress', label: 'In Progress' },
        { status: 'Completed', label: 'Completed' },
        { status: 'Trustifacted', label: 'Trustifacted' }
      ],
      values: ['innovation', 'technology', 'expansion'],
      shoutouts: [
        { author: 'Jane Smith', text: 'Great progress on expanding the datacenter!', likes: 12, time: '30m ago' },
        { author: 'John Doe', text: 'Excellent collaboration with the Tech Union!', likes: 8, time: '1h ago' }
      ]
    },
    {
      id: 'project-garden',
      name: 'Community Garden Initiative',
      owner: 'Green Energy Union',
      participants: ['Michael Green', 'Sarah Brown', 'Linda White', '95 more...'],
      description: 'A project aimed at creating a community garden to promote local food production and environmental sustainability.',
      transactions: [
        { title: 'Transaction 1', status: 'In Progress', details: 'Details about transaction 1.', participant: 'Jane Smith' },
        { title: 'Transaction 2', status: 'Completed', details: 'Details about transaction 2.', participant: 'Jane Smith' },
        { title: 'Transaction 3', status: 'Initiated', details: 'Details about transaction 3.', participant: 'Jane Smith' }
      ],
      statusButtons: [
        { status: 'Initiated', label: 'Initiated' },
        { status: 'In Progress', label: 'In Progress' },
        { status: 'Completed', label: 'Completed' },
        { status: 'Trustifacted', label: 'Trustifacted' }
      ],
      values: ['community', 'sustainability', 'local food'],
      shoutouts: [
        { author: 'Jane Smith', text: 'Amazing effort from everyone involved!', likes: 15, time: '45m ago' },
        { author: 'John Doe', text: 'Great initiative for local sustainability!', likes: 9, time: '1h ago' }
      ]
    }
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCreateProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: `project-${Date.now()}`, transactions: [], statusButtons: [], values: [], shoutouts: [] }]);
    toggleFormVisibility();
  };

  return (
    <div className="container">
      <aside>
        <div className="search-box">
          <input type="text" placeholder="Search Projects..." />
        </div>
        <div className="filters">
          <button>All Projects</button>
          <button>Your Projects</button>
          <button>Nearby Projects</button>
        </div>
        <button className="btn-orange" onClick={toggleFormVisibility}>Create Project</button>
      </aside>
      <main>
        <NewProjectForm isVisible={isFormVisible} onCreateProject={handleCreateProject} onCancel={toggleFormVisibility} />
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} onLike={(id) => console.log(`Liked project ${id}`)} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
