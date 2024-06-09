import React, { useState } from 'react';
import '../styles/Projects.css';

const NewProjectForm = ({ isVisible, onCreateProject, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [valueGraph, setValueGraph] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateProject({ name, description, valueGraph, location, image });
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  if (!isVisible) return null;

  return (
    <div id="project-form" className="transaction">
      <h3>Create a New Project</h3>
      <form onSubmit={handleSubmit}>
        <div className="project-banner">
          <label htmlFor="project-image" className="set-image-btn">Set image...</label>
          <input type="file" id="project-image" name="project-image" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
          {image && <img id="preview-image" src={image} alt="Image Preview" className="banner-image" />}
        </div>

        <label htmlFor="project-name">Project Name:</label>
        <input type="text" id="project-name" name="project-name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="project-description">Project Description:</label>
        <textarea id="project-description" name="project-description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label htmlFor="project-value-graph">Value Graph:</label>
        <input type="text" id="project-value-graph" name="project-value-graph" value={valueGraph} onChange={(e) => setValueGraph(e.target.value)} required />

        <label htmlFor="project-location">Geographical Location:</label>
        <input type="text" id="project-location" name="project-location" value={location} onChange={(e) => setLocation(e.target.value)} required />

        <div className="form-buttons">
          <button type="submit" className="btn-orange">Create Project</button>
          <button type="button" className="btn-blue" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectForm;
