import React, { useState } from 'react';
import '../styles/Spheres.css';
import SphereBanner from './SphereBanner'; // Assuming SphereBanner is in the same directory

const NewSphereForm = ({ isVisible, onCreateSphere, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [valueGraph, setValueGraph] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateSphere({ name, description, valueGraph, location, image });
  };

  const handleImageChange = (imageFile) => {
    setImage(imageFile);
  };

  if (!isVisible) return null;

  return (
    <div id="sphere-form" className="transaction">
      <h3>Create a New Sphere</h3>
      <form onSubmit={handleSubmit}>
        <SphereBanner image={image} onImageChange={handleImageChange} />

        <label htmlFor="sphere-name">Sphere Name:</label>
        <input type="text" id="sphere-name" name="sphere-name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="sphere-description">Sphere Description:</label>
        <textarea id="sphere-description" name="sphere-description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label htmlFor="sphere-value-graph">Value Graph:</label>
        <input type="text" id="sphere-value-graph" name="sphere-value-graph" value={valueGraph} onChange={(e) => setValueGraph(e.target.value)} required />

        <label htmlFor="sphere-location">Geographical Location:</label>
        <input type="text" id="sphere-location" name="sphere-location" value={location} onChange={(e) => setLocation(e.target.value)} required />

        <div className="form-buttons">
          <button type="submit" className="btn-orange">Create Sphere</button>
          <button type="button" className="btn-blue" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewSphereForm;
