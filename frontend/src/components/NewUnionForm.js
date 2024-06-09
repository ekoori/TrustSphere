import React, { useState } from 'react';
import '../styles/Unions.css';
import SphereBanner from './SphereBanner'; // Assuming SphereBanner is in the same directory

const NewUnionForm = ({ isVisible, onCreateUnion, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [valueGraph, setValueGraph] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateUnion({ name, description, valueGraph, location, image });
  };

  const handleImageChange = (imageFile) => {
    setImage(imageFile);
  };

  if (!isVisible) return null;

  return (
    <div id="union-form" className="transaction">
      <h3>Create a New Union</h3>
      <form onSubmit={handleSubmit}>
        <SphereBanner image={image} onImageChange={handleImageChange} />

        <label htmlFor="union-name">Union Name:</label>
        <input type="text" id="union-name" name="union-name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="union-description">Union Description:</label>
        <textarea id="union-description" name="union-description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label htmlFor="union-value-graph">Value Graph:</label>
        <input type="text" id="union-value-graph" name="union-value-graph" value={valueGraph} onChange={(e) => setValueGraph(e.target.value)} required />

        <label htmlFor="union-location">Geographical Location:</label>
        <input type="text" id="union-location" name="union-location" value={location} onChange={(e) => setLocation(e.target.value)} required />

        <div className="form-buttons">
          <button type="submit" className="btn-orange">Create Union</button>
          <button type="button" className="btn-blue" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewUnionForm;
