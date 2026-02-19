import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './TopBar.css';

const TopBar = ({ title, actions }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfile = () => {
    setShowUserMenu(false);
    // Navigate to profile page (to be implemented)
    console.log('Navigate to profile');
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    // Navigate to settings page (to be implemented)
    console.log('Navigate to settings');
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Task completed', message: 'Design homepage was marked as done', time: '5m ago', unread: true },
    { id: 2, title: 'New comment', message: 'Sarah commented on your task', time: '1h ago', unread: true },
    { id: 3, title: 'Due date reminder', message: 'Review code is due tomorrow', time: '2h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
      </div>

      <div className="topbar-right">
        {actions}

        {/* Notifications */}
        <div className="topbar-dropdown-wrapper" ref={notificationRef}>
          <button 
            className={`topbar-icon-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2a6 6 0 0 1 6 6v3.586l1.707 1.707A1 1 0 0 1 17 15H3a1 1 0 0 1-.707-1.707L4 11.586V8a6 6 0 0 1 6-6zM8 17h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="dropdown-menu notifications-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button className="mark-read-btn">Mark all as read</button>
              </div>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  >
                    <div className="notification-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="8" cy="8" r="8"/>
                      </svg>
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-time">{notification.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="view-all-btn">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="topbar-dropdown-wrapper" ref={userMenuRef}>
          <button 
            className={`user-button ${showUserMenu ? 'active' : ''}`}
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
          >
            <div className="user-avatar">{getUserInitials()}</div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="chevron-icon">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {showUserMenu && (
            <div className="dropdown-menu user-dropdown">
              <div className="user-menu-header">
                <div className="user-avatar-large">{getUserInitials()}</div>
                <div className="user-info">
                  <div className="user-name">{user?.name || 'User'}</div>
                  <div className="user-email">{user?.email || 'user@example.com'}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleProfile}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Profile</span>
              </button>
              <button className="dropdown-item" onClick={handleSettings}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 10a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M13.5 8a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span>Settings</span>
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-item" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
