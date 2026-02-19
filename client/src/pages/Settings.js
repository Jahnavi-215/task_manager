import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { usePageTitle } from '../hooks/usePageTitle';
import TopBar from '../components/TopBar';
import './Settings.css';

const Settings = () => {
  usePageTitle('Settings | TaskFlow');
  
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'account', label: 'Account', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
  ];

  return (
    <div className="settings-page">
      <TopBar />
      
      <div className="settings-content">
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Manage your account and preferences</p>
        </div>

        <div className="settings-container">
          <div className="settings-sidebar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="settings-main">
            {activeTab === 'profile' && (
              <div className="settings-section">
                <h2 className="section-title">Profile Information</h2>
                <p className="section-description">Manage your personal information</p>
                
                <div className="profile-info">
                  <div className="profile-avatar-large">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </div>
                  <div className="profile-details">
                    <div className="detail-item">
                      <label>Full Name</label>
                      <div className="detail-value">{user?.name || 'Not set'}</div>
                    </div>
                    <div className="detail-item">
                      <label>Email Address</label>
                      <div className="detail-value">{user?.email || 'Not set'}</div>
                    </div>
                    <div className="detail-item">
                      <label>Member Since</label>
                      <div className="detail-value">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="settings-section">
                <h2 className="section-title">Account Settings</h2>
                <p className="section-description">Manage your account preferences</p>
                
                <div className="settings-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Email Notifications</h4>
                      <p>Receive email updates about your tasks</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Task Reminders</h4>
                      <p>Get reminded about upcoming deadlines</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item danger-zone">
                    <div className="setting-info">
                      <h4>Logout</h4>
                      <p>Sign out of your account</p>
                    </div>
                    <button 
                      className="btn-danger"
                      onClick={() => {
                        logout();
                        success('Logged out successfully');
                        navigate('/');
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2 className="section-title">Notification Preferences</h2>
                <p className="section-description">Choose how you want to be notified</p>
                
                <div className="settings-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Push Notifications</h4>
                      <p>Receive push notifications in your browser</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Task Completion</h4>
                      <p>Notify when tasks are completed</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Weekly Summary</h4>
                      <p>Receive weekly productivity reports</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="settings-section">
                <h2 className="section-title">Appearance</h2>
                <p className="section-description">Customize how TaskFlow looks</p>
                
                <div className="settings-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Dark Mode</h4>
                      <p>Switch to dark theme (Coming Soon)</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={darkMode}
                        onChange={(e) => {
                          setDarkMode(e.target.checked);
                          success(e.target.checked ? 'Dark mode enabled (UI update coming soon)' : 'Dark mode disabled');
                        }}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Compact View</h4>
                      <p>Show more content in less space</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
