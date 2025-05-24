import React, { useState } from "react";
import "../styles/login.css";

// Import images directly
import loginImage from "../assets/loginimage.jpg";
import bgLoginImage from "../assets/bglogin.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    if (username === "admin" && password === "password") {
      alert("Login successful!");
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  // Check if the screen size is mobile (below 768px)
  const isMobile = window.innerWidth <= 768;

  // Define mobile and desktop styles directly in JS
  const containerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row", // Stack on mobile, side by side on desktop
    height: "100vh",
    margin: 0,
  };

  const leftStyle = {
    flex: 1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: isMobile ? "50vh" : "100vh", // Adjust height for mobile view
    backgroundImage: `url(${loginImage})`, // Use the imported image
  };

  const rightStyle = {
    flex: 1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    height: isMobile ? "50vh" : "100vh", // Adjust height for mobile view
    backgroundImage: `url(${bgLoginImage})`, // Use the imported image
  };

  return (
    <div style={containerStyle}>
      {/* Left Side (Image Background) */}
      <div style={leftStyle}></div>

      {/* Right Side (Login Form) */}
      <div style={rightStyle}>
        <div className="card">
          <h2>Welcome back!</h2>

          {/* Username Input */}
          <div className="input-container">
            <input
              type="text"
              className="input"
              placeholder="👤 Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          {/* Login Button */}
          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
