import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Skill Sharing & Learning Platform</h1>
        <p>Share knowledge, track progress, and explore travel guides</p>
      </header>

      <section className="features-section">
        <div className="feature-card">
          <h2>Learning Progress</h2>
          <p>Track and share your learning journey with others</p>
          <Link to="/progress" className="feature-link">View Progress Updates</Link>
        </div>

        <div className="feature-card">
          <h2>Travel Guides</h2>
          <p>Discover travel tips and guides from experienced travelers</p>
          <Link to="/travel-guides" className="feature-link">Explore Travel Guides</Link>
        </div>

        <div className="feature-card">
          <h2>User Profiles</h2>
          <p>Connect with others who share your interests</p>
          <Link to="/users" className="feature-link">Browse Users</Link>
        </div>
      </section>

      <section className="getting-started">
        <h2>Getting Started</h2>
        <p>New to the platform? Follow these steps:</p>
        <ol>
          <li>Create an account or log in</li>
          <li>Share your learning progress</li>
          <li>Explore travel guides</li>
          <li>Connect with other users</li>
        </ol>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button primary">Sign Up</Link>
          <Link to="/login" className="cta-button secondary">Login</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;