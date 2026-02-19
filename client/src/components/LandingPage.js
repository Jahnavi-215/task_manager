import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      icon: '📋',
      title: 'Smart Task Management',
      description: 'Organize tasks with categories, priorities, and due dates. Stay on top of your work effortlessly.'
    },
    {
      icon: '📊',
      title: 'Productivity Analytics',
      description: 'Track your progress with detailed insights and performance metrics that matter.'
    },
    {
      icon: '⏰',
      title: 'Focus Timer',
      description: 'Built-in Pomodoro timer to boost concentration and maintain productive work sessions.'
    },
    {
      icon: '🎯',
      title: 'Goal Tracking',
      description: 'Set and achieve your goals with clear milestones and progress visualization.'
    },
    {
      icon: '📱',
      title: 'Works Everywhere',
      description: 'Access your tasks on any device with our responsive, mobile-first design.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. Complete privacy and control over your information.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Product Manager',
      avatar: 'SC',
      text: 'TaskMaster has transformed how I manage my daily workflow. The clean interface and powerful features make productivity effortless.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Software Engineer',
      avatar: 'MR',
      text: 'The focus timer integration is brilliant. I\'ve increased my deep work sessions by 60% since switching to TaskMaster.'
    },
    {
      name: 'Emily Johnson',
      role: 'Design Lead',
      avatar: 'EJ',
      text: 'Finally, a task manager that doesn\'t get in the way. Clean, fast, and exactly what I need to stay organized.'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Master Your Tasks.<br />
                <span className="hero-gradient">Boost Your Productivity.</span>
              </h1>
              <p className="hero-subtitle">
                The modern task management platform that helps you stay organized, 
                focused, and productive. Built for teams and individuals who value simplicity and power.
              </p>
              <div className="hero-actions">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg">
                  Sign In
                </Link>
              </div>
              <div className="hero-social-proof">
                <p className="text-muted">Trusted by 10,000+ productive people</p>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-dashboard">
                <div className="dashboard-header">
                  <div className="dashboard-nav">
                    <div className="nav-item active">Tasks</div>
                    <div className="nav-item">Analytics</div>
                    <div className="nav-item">Settings</div>
                  </div>
                  <div className="dashboard-user">
                    <div className="user-avatar">JD</div>
                  </div>
                </div>
                <div className="dashboard-content">
                  <div className="task-item completed">
                    <div className="task-checkbox checked"></div>
                    <span className="task-text">Review quarterly goals</span>
                    <span className="task-badge">Work</span>
                  </div>
                  <div className="task-item">
                    <div className="task-checkbox"></div>
                    <span className="task-text">Design new landing page</span>
                    <span className="task-badge priority">High</span>
                  </div>
                  <div className="task-item">
                    <div className="task-checkbox"></div>
                    <span className="task-text">Team standup meeting</span>
                    <span className="task-badge">Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to stay productive</h2>
            <p className="text-muted">
              Powerful features designed to help you organize, focus, and achieve your goals.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>Get started in minutes</h2>
            <p className="text-muted">
              Simple setup, powerful results. Start organizing your work today.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p className="text-muted">Sign up for free in seconds. No credit card required.</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Add Your Tasks</h3>
              <p className="text-muted">Create tasks with priorities, due dates, and categories.</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Stay Productive</h3>
              <p className="text-muted">Use focus timer and analytics to boost your productivity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Loved by productive people</h2>
            <p className="text-muted">
              See what our users say about TaskMaster.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to boost your productivity?</h2>
            <p className="text-muted">
              Join thousands of users who have transformed their workflow with TaskMaster.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
            </div>
            <p className="cta-note text-light">No credit card required • Free forever</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;