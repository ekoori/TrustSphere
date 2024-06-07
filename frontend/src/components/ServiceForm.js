import React, { useState } from 'react';
import '../styles/App.css';
import SphereBanner from './SphereBanner';

function ServiceForm({ isVisible }) {
  const [formData, setFormData] = useState({
    item: '',
    description: '',
    type: 'offer',
    serviceImage: null,
    serviceType: 'offer',
    serviceTitle: '',
    serviceDescription: '',
    serviceProject: '',
    serviceSpheres: []
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        serviceImage: file
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div id="service-form" className={`transaction ${isVisible ? '' : 'hidden'}`}>
      <h3>New Service</h3>
      <form onSubmit={handleSubmit}>

      <SphereBanner previewUrl={previewUrl} handleFileChange={handleFileChange} />

        <label htmlFor="service-type">Type:</label>
        <select 
          id="service-type" 
          name="serviceType" 
          value={formData.serviceType} 
          onChange={handleChange}
        >
          <option value="offer">Offer</option>
          <option value="request">Request</option>
        </select>
        
        <label htmlFor="service-title">Title:</label>
        <input 
          type="text" 
          id="service-title" 
          name="serviceTitle" 
          value={formData.serviceTitle} 
          onChange={handleChange} 
          required 
        />
        
        <label htmlFor="service-description">Description:</label>
        <textarea 
          id="service-description" 
          name="serviceDescription" 
          value={formData.serviceDescription} 
          onChange={handleChange} 
          required
        ></textarea>
        
        <label htmlFor="service-project">Assign Project:</label>
        <select 
          id="service-project" 
          name="serviceProject" 
          value={formData.serviceProject} 
          onChange={handleChange}
        >
          <option value="">None</option>
          <option value="project1">Project 1</option>
          <option value="project2">Project 2</option>
        </select>
        
        <label htmlFor="service-spheres">Applicable Spheres:</label>
        <select 
          id="service-spheres" 
          name="serviceSpheres" 
          value={formData.serviceSpheres} 
          onChange={handleChange} 
          multiple
        >
          <option value="sphere1">Sphere 1</option>
          <option value="sphere2">Sphere 2</option>
        </select>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ServiceForm;
