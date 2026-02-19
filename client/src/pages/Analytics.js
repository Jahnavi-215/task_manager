import { useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import TopBar from '../components/TopBar';
import EmptyState from '../components/EmptyState';
import './Analytics.css';

const Analytics = () => {
  usePageTitle('Analytics | TaskFlow');
  
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="analytics-page">
      <TopBar />
      
      <div className="analytics-content">
        <div className="analytics-header">
          <div>
            <h1 className="analytics-title">Analytics</h1>
            <p className="analytics-subtitle">Track your productivity and performance</p>
          </div>
          
          <div className="time-range-selector">
            <button 
              className={`range-btn ${timeRange === 'week' ? 'active' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`range-btn ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={`range-btn ${timeRange === 'year' ? 'active' : ''}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>

        <div className="placeholder-container">
          <div className="placeholder-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="16" fill="#F3F4F6"/>
              <path d="M20 40L28 32L36 38L44 28" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="28" cy="32" r="2" fill="#6366F1"/>
              <circle cx="36" cy="38" r="2" fill="#6366F1"/>
              <circle cx="44" cy="28" r="2" fill="#6366F1"/>
            </svg>
          </div>
          <h2 className="placeholder-title">Analytics Dashboard Coming Soon</h2>
          <p className="placeholder-description">
            We're building powerful analytics features to help you track your productivity, 
            visualize your progress, and gain insights into your work patterns.
          </p>
          <div className="placeholder-features">
            <div className="placeholder-feature">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Task completion trends</span>
            </div>
            <div className="placeholder-feature">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Productivity insights</span>
            </div>
            <div className="placeholder-feature">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Time tracking reports</span>
            </div>
            <div className="placeholder-feature">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Performance metrics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
