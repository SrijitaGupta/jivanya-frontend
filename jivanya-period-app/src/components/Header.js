import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/jivanyalogo.jpg';
import '../styles/Header.css';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <header className="header">
      {/* Logo & Brand Name */}
      <div className="logo-container">
        <img src={Logo} alt="Jivanya Logo" className="logo" />
        <span className="brand-name">Jivanya</span>
      </div>

      {/* Desktop Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="menu-button" onClick={toggleSidebar} aria-label="Toggle Menu">
        ☰
      </button>

      {/* Sidebar for Mobile Navigation */}
      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <button className="close-button" onClick={toggleSidebar} aria-label="Close Menu">
          &times;
        </button>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
            <li><Link to="/menu" onClick={toggleSidebar}>Menu</Link></li>
            <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
            <li><Link to="/contact" onClick={toggleSidebar}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
