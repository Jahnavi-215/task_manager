import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-animation">
          <div className="floating-task">📋</div>
          <div className="floating-task">✅</div>
          <div className="floating-task">📊</div>
        </div>
        
        <div className="not-found-text">
          <h1 className="not-found-title">
            <span className="error-code">404</span>
            <span className="error-message">Page Not Found</span>
          </h1>
          
          <p className="not-found-description">
            Oops! It looks like this page got lost in the productivity void. 
            Don't worry, we'll help you get back on track!
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              <span>🏠</span>
              Go Home
            </Link>
            <Link to="/dashboard" className="btn btn-outline btn-lg">
              <span>📋</span>
              My Tasks
            </Link>
          </div>
          
          <div className="not-found-suggestions">
            <h3>What you can do:</h3>
            <ul>
              <li>Check the URL for typos</li>
              <li>Go back to the homepage</li>
              <li>Visit your dashboard</li>
              <li>Contact support if you think this is an error</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;