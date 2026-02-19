import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...', fullScreen = false }) => {
  const sizeClasses = {
    small: 'spinner-sm',
    medium: 'spinner-md',
    large: 'spinner-lg'
  };

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div className={`loading-spinner ${sizeClasses[size]}`}></div>
          <p className="loading-text">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-inline">
      <div className={`loading-spinner ${sizeClasses[size]}`}></div>
      {text && <span className="loading-text">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;