import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLandingPage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="navbar-brand">
            <span className="brand-icon">📋</span>
            TaskMaster Pro
          </Link>
          
          <div className="navbar-nav">
            {isAuthenticated ? (
              <div className="user-info">
                <ThemeToggle />
                <Link to="/dashboard" className="nav-link">
                  <span>🏠</span>
                  Dashboard
                </Link>
                <div className="user-avatar">
                  <span className="avatar-text">
                    {user?.name?.charAt(0)?.toUpperCase() || '👤'}
                  </span>
                </div>
                <div className="user-details">
                  <span className="user-greeting">Hello,</span>
                  <span className="user-name">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  <span>🚪</span>
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-nav">
                <ThemeToggle />
                {!isLandingPage && (
                  <Link to="/" className="nav-link">
                    <span>🏠</span>
                    Home
                  </Link>
                )}
                <Link to="/login" className="nav-link">
                  <span>🔑</span>
                  Login
                </Link>
                <Link to="/register" className="nav-link signup-link">
                  <span>✨</span>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;