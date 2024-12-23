import React, { useState } from 'react';
import './index.css';  // External CSS for styles (or use styled-components)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/du8n6t4ey/image/upload/v1734935836/Screenshot_2024-12-23_120658_r11qja.png"
          alt="Task Validator Logo"
          className="logo"
        />
      </div>

      {/* Hamburger Icon for mobile */}
      <button className="hamburger" onClick={handleMenuToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Navigation Menu */}
      <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/tasks">Tasks</a></li>
          <li><a href="/validate">Validate</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
