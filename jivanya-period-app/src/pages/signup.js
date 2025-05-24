import React, { useState } from "react";
import "../styles/signup.css"; // Import normal CSS file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    alert("Signup successful!");
    setError("");
  };

  const handleGoogleSignup = () => {
    alert("Signing up with Google...");
  };

  return (
    <div className="container">
      {/* Left Side (Image Background) */}
      <div className="left"></div>

      {/* Right Side (Signup Form) */}
      <div className="right">
        <div className="card">
          <h2>Create an Account</h2>

          {/* Email Input */}
          <div className="input-container">
            <input
              type="email"
              className="input"
              placeholder="📧 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="input-container">
            <input
              type="password"
              className="input"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="error">{error}</p>}

          {/* Signup Button */}
          <button className="button" onClick={handleSignup}>
            Sign Up
          </button>

          {/* Google Signup Button */}
          <button className="button google-button" onClick={handleGoogleSignup}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="google-logo"
            />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
