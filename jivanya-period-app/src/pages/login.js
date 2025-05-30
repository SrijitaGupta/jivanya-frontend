import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import "../styles/login.css";

import loginImage from "../assets/loginimage.jpg";
import bgLoginImage from "../assets/bglogin.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      console.log("User already logged in, redirecting to dashboard...");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://signup-login-repo.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email.trim(),
          Password: password.trim(),
        }),
      });

      const data = await response.json();

      alert(JSON.stringify(data, null, 2));
      console.log("API response status:", response.status);
      console.log("API response data:", data);

      const successMessage = "Login successful. Welcome to Jivanya – your women's reproductive health companion!";

      if (response.ok && data.message === successMessage) {
        console.log("Login successful, redirecting...");
        localStorage.setItem("isLoggedIn", "true");
        setError("");
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } else {
        console.warn("Login failed:", data.message);
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isMobile = window.innerWidth <= 768;

  const containerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    height: "100vh",
    margin: 0,
  };

  const leftStyle = {
    flex: 1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: isMobile ? "50vh" : "100vh",
    backgroundImage: `url(${loginImage})`,
  };

  const rightStyle = {
    flex: 1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    height: isMobile ? "50vh" : "100vh",
    backgroundImage: `url(${bgLoginImage})`,
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}></div>

      <div style={rightStyle}>
        <div className="card">
          <h2>Welcome back!</h2>

          <div className="input-container">
            <input
              type="email"
              className="input"
              placeholder="📧 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              disabled={loading}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          <div className="forgot-password">
            <a href="/reset-password">Forgot Password?</a>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="button" onClick={handleLogin} disabled={loading}>
            {loading ? <div className="spinner"></div> : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
