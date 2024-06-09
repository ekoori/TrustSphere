import React, { useState } from 'react';
import '../styles/Spheres.css';

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

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  if (!isVisible) return null;

  return (
    <div id="sphere-form" className="transaction">
      <h3>Create a New Sphere</h3>
      <form onSubmit={handleSubmit}>
        <div className="sphere-banner">
          <label htmlFor="sphere-image" className="set-image-btn">Set image...</label>
          <input type="file" id="sphere-image" name="sphere-image" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
          {image && <img id="preview-image" src={image} alt="Image Preview" className="banner-image" />}
        </div>

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
