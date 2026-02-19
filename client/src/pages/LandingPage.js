import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import './LandingPage.css';

const LandingPage = () => {
  usePageTitle('TaskFlow | Organize Your Work Efficiently');
  
  const [scrolled, setScrolled] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Navigate to register with email
    window.location.href = `/register?email=${encodeURIComponent(email)}`;
  };

  return (
    <div className="landing-page">
      {/* Sticky Navbar */}
      <nav className={`trello-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon-trello">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill="white" fillOpacity="0.2"/>
                <path d="M8 14L12 18L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text-trello">TaskFlow</span>
          </Link>
          
          <div className="nav-menu-trello">
            <a href="#home" className="nav-link-trello">Home</a>
            <button onClick={() => setShowAbout(true)} className="nav-link-trello">About</button>
            <a href="#features" className="nav-link-trello">Features</a>
          </div>
          
          <div className="nav-actions-trello">
            <Link to="/login" className="btn-nav-ghost">Log in</Link>
            <Link to="/register" className="btn-nav-primary">Sign up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Trello Style */}
      <section className="hero-trello">
        <div className="hero-gradient-bg">
          <div className="gradient-orb-trello orb-1"></div>
          <div className="gradient-orb-trello orb-2"></div>
          <div className="gradient-orb-trello orb-3"></div>
        </div>

        <div className="hero-container-trello">
          <div className="hero-content-trello">
            <h1 className="hero-title-trello">
              TaskFlow brings all your tasks, teammates, and tools together
            </h1>
            
            <p className="hero-description-trello">
              Keep everything in one place—even if your team isn't. Organize work, track progress, and achieve more with TaskFlow's intuitive task management platform.
            </p>
            
            <form className="hero-email-form" onSubmit={handleEmailSubmit}>
              <input
                type="email"
                className="email-input-trello"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-hero-primary">
                Sign up - it's free!
              </button>
            </form>
            
            <button className="hero-demo-link" onClick={() => window.location.href = '/login'}>
              Or try the demo →
            </button>
          </div>

          <div className="hero-visual-trello">
            <div className="floating-cards-container">
              {/* Main Task Board */}
              <div className="task-board-mockup">
                <div className="board-header">
                  <div className="board-title">My Projects</div>
                  <div className="board-menu">⋯</div>
                </div>
                
                <div className="board-columns">
                  {/* Column 1 */}
                  <div className="board-column">
                    <div className="column-header">
                      <span className="column-title">To Do</span>
                      <span className="column-count">3</span>
                    </div>
                    <div className="task-card-mini card-1">
                      <div className="card-label label-purple"></div>
                      <div className="card-title">Design new homepage</div>
                      <div className="card-footer">
                        <div className="card-avatar">JD</div>
                        <div className="card-date">📅 Today</div>
                      </div>
                    </div>
                    <div className="task-card-mini card-2">
                      <div className="card-label label-pink"></div>
                      <div className="card-title">Review pull requests</div>
                      <div className="card-footer">
                        <div className="card-avatar">SM</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="board-column">
                    <div className="column-header">
                      <span className="column-title">In Progress</span>
                      <span className="column-count">2</span>
                    </div>
                    <div className="task-card-mini card-3">
                      <div className="card-label label-blue"></div>
                      <div className="card-title">Update documentation</div>
                      <div className="card-footer">
                        <div className="card-avatar">AK</div>
                        <div className="card-checklist">✓ 2/5</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="board-column">
                    <div className="column-header">
                      <span className="column-title">Done</span>
                      <span className="column-count">5</span>
                    </div>
                    <div className="task-card-mini card-4">
                      <div className="card-label label-green"></div>
                      <div className="card-title">Launch beta version</div>
                      <div className="card-footer">
                        <div className="card-avatar">TL</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="floating-element notification-card">
                <div className="notification-icon">🔔</div>
                <div className="notification-content">
                  <div className="notification-title">Task completed!</div>
                  <div className="notification-text">Design review approved</div>
                </div>
              </div>

              <div className="floating-element stats-card">
                <div className="stats-item">
                  <div className="stats-number">24</div>
                  <div className="stats-label">Tasks Done</div>
                </div>
                <div className="stats-divider"></div>
                <div className="stats-item">
                  <div className="stats-number">8</div>
                  <div className="stats-label">In Progress</div>
                </div>
              </div>

              <div className="floating-element team-avatars">
                <div className="avatar avatar-1">JD</div>
                <div className="avatar avatar-2">SM</div>
                <div className="avatar avatar-3">AK</div>
                <div className="avatar avatar-more">+5</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom Edge */}
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section-trello">
        <div className="features-container">
          <div className="section-header-trello">
            <h2 className="section-title-trello">Work smarter with TaskFlow</h2>
            <p className="section-description-trello">
              Everything you need to organize work and get more done
            </p>
          </div>

          <div className="features-grid-trello">
            <div className="feature-card-trello">
              <div className="feature-icon-trello">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#E0E7FF"/>
                  <path d="M10 16l4 4 8-8" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title-trello">Boards</h3>
              <p className="feature-description-trello">
                Organize tasks in boards to track projects and workflows in a visual way
              </p>
            </div>

            <div className="feature-card-trello">
              <div className="feature-icon-trello">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#FCE7F3"/>
                  <circle cx="16" cy="16" r="6" stroke="#EC4899" strokeWidth="2.5"/>
                  <path d="M16 13v6M13 16h6" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-title-trello">Lists</h3>
              <p className="feature-description-trello">
                Create lists to organize cards and track progress through different stages
              </p>
            </div>

            <div className="feature-card-trello">
              <div className="feature-icon-trello">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#DBEAFE"/>
                  <rect x="10" y="10" width="12" height="12" rx="2" stroke="#3B82F6" strokeWidth="2.5"/>
                </svg>
              </div>
              <h3 className="feature-title-trello">Cards</h3>
              <p className="feature-description-trello">
                Add details, attachments, and collaborate on tasks with your team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-trello">
        <div className="cta-container-trello">
          <h2 className="cta-title-trello">Get started with TaskFlow today</h2>
          <p className="cta-description-trello">
            Join thousands of teams already using TaskFlow to get more done
          </p>
          <Link to="/register" className="btn-cta-large">
            Sign up - it's free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-trello">
        <div className="footer-container-trello">
          <div className="footer-content-trello">
            <div className="footer-brand-trello">
              <div className="nav-logo">
                <div className="logo-icon-trello">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" rx="6" fill="#6366F1"/>
                    <path d="M8 14L12 18L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="logo-text-footer">TaskFlow</span>
              </div>
              <p className="footer-tagline-trello">
                Work smarter, not harder
              </p>
            </div>
            
            <div className="footer-links-trello">
              <div className="footer-column-trello">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#templates">Templates</a>
              </div>
              <div className="footer-column-trello">
                <h4>Company</h4>
                <button onClick={() => setShowAbout(true)}>About</button>
                <a href="#blog">Blog</a>
                <a href="#careers">Careers</a>
              </div>
              <div className="footer-column-trello">
                <h4>Resources</h4>
                <a href="#help">Help Center</a>
                <a href="#contact">Contact</a>
                <a href="#api">API</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom-trello">
            <p>&copy; 2024 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="modal-content about-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAbout(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            
            <div className="about-header">
              <div className="about-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="url(#aboutGradient)" />
                  <path d="M14 24L21 31L34 17" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="aboutGradient" x1="0" y1="0" x2="48" y2="48">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2>About TaskFlow</h2>
              <p>Your productivity companion</p>
            </div>
            
            <div className="about-content">
              <p className="about-description">
                TaskFlow is a modern, intuitive task management platform designed to help individuals and teams stay organized and productive. Built with cutting-edge technology and a focus on user experience, TaskFlow makes managing your daily tasks effortless and enjoyable.
              </p>
              
              <h3>Key Features</h3>
              <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4>Smart Task Management</h4>
                    <p>Create, organize, and track tasks with ease using our intuitive interface</p>
                  </div>
                </div>
                
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4>Team Collaboration</h4>
                    <p>Work together seamlessly with real-time updates and shared boards</p>
                  </div>
                </div>
                
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4>Analytics & Insights</h4>
                    <p>Track your productivity with detailed analytics and performance metrics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
