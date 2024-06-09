import '../styles/App.css';
import React from 'react';
import PropTypes from 'prop-types';

const SphereBanner = ({ image, onImageChange }) => {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageChange(URL.createObjectURL(file));
    }
  };

  return (
    <div className="sphere-banner">
      <label htmlFor="sphere-image" className="set-image-btn">Set image...</label>
      <input
        type="file"
        id="sphere-image"
        name="sphere-image"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageChange}
      />
      {image && <img id="preview-image" src={image} alt="Image Preview" className="banner-image" />}
    </div>
  );
};

SphereBanner.propTypes = {
  image: PropTypes.string,
  onImageChange: PropTypes.func.isRequired
};

export default SphereBanner;
