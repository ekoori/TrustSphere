import '../styles/App.css';
import React from 'react';

function SphereBanner({ previewUrl, handleFileChange }) {
  return (
    <div className="sphere-banner">
      <label htmlFor="service-image" className="set-image-btn">Set image...</label>
      <input 
        type="file" 
        id="service-image" 
        name="serviceImage" 
        style={{ display: 'none' }} 
        accept="image/*" 
        onChange={handleFileChange}
      />
      {previewUrl && (
        <img 
          id="preview-image" 
          src={previewUrl} 
          alt="Image Preview" 
          className="banner-image" 
        />
      )}
    </div>
  );
}

export default SphereBanner;
