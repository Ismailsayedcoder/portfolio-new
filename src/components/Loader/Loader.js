import React from 'react';
import './Loader.css';
import logoImage from '../../assets/images/logo.png'; // This will be handled conditionally

const Loader = () => {
  return (
    <div className="loader-container">
      {logoImage && (
        <img 
          src={logoImage} 
          alt="Logo" 
          className="loader-logo" 
          onError={(e) => {
            e.target.style.display = 'none';
            console.warn('Logo image failed to load');
          }}
        />
      )}
      <div className="loader-spinner"></div>
      <p>Loading...</p>
      <h1 className="loader-brand">ابو السباع</h1>
    </div>
  );
};

export default Loader;