import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/analytics/dashboard');
      setAnalytics(response.data.analytics);
      setError(null);
    } catch (error) {
      console.error('Analytics fetch error:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const exportData = async () => {
    try {
      const response = await axios.get('/api/analytics/export');
      const dataStr = JSON.stringify(response.data.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `task-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      setError('Failed to export data');
    }
  };

  const formatTime = (minutes) => {
    if (!minutes) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="analytics-dashboard">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-dashboard">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h2 className="analytics-title">📊 Analytics Dashboard</h2>
        <button onClick={exportData} className="btn btn-secondary">
          📥 Export Data
        </button>
      </div>

      {/* Overview Stats */}
      <div className="analytics-section">
        <h3>📈 Overview</h3>
        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-number">{analytics.overview.totalTasks}</div>
            <div className="analytics-label">Total Tasks</div>
          </div>
          <div className="analytics-card">
            <div className="analytics-number">{analytics.overview.completedTasks}</div>
            <div className="analytics-label">Completed</div>
          </div>
          <div className="analytics-card">
            <div className="analytics-number">{analytics.overview.productivityScore}%</div>
            <div className="analytics-label">Productivity Score</div>
          </div>
          <div className="analytics-card">
            <div className="analytics-number">{analytics.overview.overdueTasks}</div>
            <div className="analytics-label">Overdue</div>
          </div>
        </div>
      </div>

      {/* Time Tracking */}
      <div className="analytics-section">
        <h3>⏰ Time Tracking</h3>
        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-number">
              {formatTime(analytics.timeTracking.totalTimeSpent)}
            </div>
            <div className="analytics-label">Total Time Spent</div>
          </div>
          <div className="analytics-card">
            <div className="analytics-number">
              {formatTime(analytics.timeTracking.avgTimePerTask)}
            </div>
            <div className="analytics-label">Avg Time per Task</div>
          </div>
          <div className="analytics-card">
            <div className="analytics-number">{analytics.timeTracking.totalPomodoros}</div>
            <div className="analytics-label">🍅 Pomodoros</div>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="analytics-section">
        <h3>🏷️ Tasks by Category</h3>
        <div className="category-chart">
          {analytics.distribution.byCategory.map((item, index) => (
            <div key={index} className="category-item">
              <div className="category-bar">
                <div 
                  className="category-fill"
                  style={{ 
                    width: `${(item.count / analytics.overview.totalTasks) * 100}%`,
                    backgroundColor: getCategoryColor(item._id)
                  }}
                ></div>
              </div>
              <div className="category-info">
                <span className="category-name">{getCategoryEmoji(item._id)} {item._id}</span>
                <span className="category-count">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="analytics-section">
        <h3>🎯 Tasks by Priority</h3>
        <div className="priority-chart">
          {analytics.distribution.byPriority.map((item, index) => (
            <div key={index} className="priority-item">
              <div className={`priority-badge priority-${item._id.toLowerCase()}`}>
                {getPriorityEmoji(item._id)} {item._id}
              </div>
              <div className="priority-count">{item.count} tasks</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trend */}
      {analytics.trends.weekly.length > 0 && (
        <div className="analytics-section">
          <h3>📅 Weekly Completion Trend</h3>
          <div className="trend-chart">
            {analytics.trends.weekly.map((day, index) => (
              <div key={index} className="trend-day">
                <div className="trend-bar">
                  <div 
                    className="trend-fill"
                    style={{ height: `${(day.count / Math.max(...analytics.trends.weekly.map(d => d.count))) * 100}%` }}
                  ></div>
                </div>
                <div className="trend-label">{getDayName(day._id)}</div>
                <div className="trend-count">{day.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
const getCategoryColor = (category) => {
  const colors = {
    'Work': '#3498db',
    'Personal': '#e74c3c',
    'Health': '#2ecc71',
    'Learning': '#f39c12',
    'Finance': '#9b59b6',
    'Shopping': '#1abc9c',
    'Travel': '#34495e',
    'Other': '#95a5a6'
  };
  return colors[category] || '#95a5a6';
};

const getCategoryEmoji = (category) => {
  const emojis = {
    'Work': '💼',
    'Personal': '🏠',
    'Health': '🏥',
    'Learning': '📚',
    'Finance': '💰',
    'Shopping': '🛒',
    'Travel': '✈️',
    'Other': '📋'
  };
  return emojis[category] || '📋';
};

const getPriorityEmoji = (priority) => {
  const emojis = {
    'High': '🔴',
    'Medium': '🟡',
    'Low': '🟢'
  };
  return emojis[priority] || '🟡';
};

const getDayName = (dayNumber) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayNumber - 1] || 'Unknown';
};

export default AnalyticsDashboard;