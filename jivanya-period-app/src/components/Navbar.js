import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/jivanyalogo.jpg';
import '../styles/Navbar.css'; // Ensure CSS is correctly imported

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      {/* Logo & Brand Name */}
      <div className="logo-container">
        <img src={Logo} alt="Jivanya Logo" className="logo" />
        <span className="brand-name">Jivanya</span>
      </div>

      {/* Desktop Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        
        <Link to="/about">About</Link>
        
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/team">Our Team</Link> {/* ✅ Added Team link here */}
      </div>

      {/* Login & Signup Buttons */}
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
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
            <li><Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
            <li><Link to="/team" onClick={toggleSidebar}> Our Team</Link></li> {/* ✅ Added Team link */}
          </ul>
        </nav>

        {/* Sidebar Login & Signup Buttons */}
        <div className="sidebar-auth">
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
