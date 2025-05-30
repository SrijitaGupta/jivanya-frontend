import React, { useState, useEffect } from "react";  // added useEffect
import { useNavigate } from "react-router-dom"; 
import "../styles/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showLoginButton, setShowLoginButton] = useState(false);

  const navigate = useNavigate();

  // <<< NEW redirect to dashboard if already logged in
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSignup = async () => {
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await fetch("https://signup-login-repo.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username.trim(),
          Email: email.trim(),
          Password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(data.message || "Signup successful.");
        setUsername("");
        setEmail("");
        setPassword("");
        setShowLoginButton(true);
        // <<< ADD this line to log user in immediately after signup
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      } else {
        setError(data.message || "Signup failed. Try again.");
        if (data.message && data.message.toLowerCase().includes("already")) {
          setShowLoginButton(true);
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left"></div>
      <div className="right">
        <div className="card">
          <h2>Create an Account</h2>

          <div className="input-container">
            <input
              type="text"
              className="input"
              placeholder="👤 Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

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

          <button className="button" onClick={handleSignup} disabled={loading}>
            {loading ? (
              <div className="spinner"></div>
            ) : (
              "Sign Up"
            )}
          </button>

          {error && <p className="error">{error}</p>}
          {successMsg && <p className="success">{successMsg}</p>}

          {showLoginButton && (
            <button
              className="button login-button"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
