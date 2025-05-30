import React, { useEffect } from 'react';
import { Typed } from 'react-typed'; // Correct import
import '../styles/Hero.css';
import { Link } from 'react-router-dom';

function Hero() {
    useEffect(() => {
      // Initialize Typed effect on component mount
      const typed = new Typed("#welcome-text", {
        strings: ["Welcome to Jivanya"],   // Text to be typed
        typeSpeed: 120,                    // Typing speed (slower for smoother effect)
        backSpeed: 60,                     // Backspacing speed (faster to make it smooth)
        backDelay: 1000,                   // Delay before backspacing starts
        loop: true,                        // Loop the typing effect
        showCursor: true,                  // Make sure the cursor is visible during typing
        cursorChar: "|",                   // Customize the cursor appearance
      });
  
      // Cleanup Typed instance on component unmount
      return () => {
        typed.destroy();
      };
    }, []);

  return (
    <section className="hero">
      <div className="overlay"></div>
      <div className="content">
        {/* Add fallback text for accessibility */}
        <h1 id="welcome-text">Welcome to Jivanya</h1> {/* Default text for accessibility */}
        <p>Your personal period and health tracker</p>
        <Link to="/signup" className="cta-button">Get Started</Link>
      </div>
    </section>
  );
}

export default Hero;
