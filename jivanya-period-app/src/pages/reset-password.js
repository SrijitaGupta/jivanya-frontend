import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/resetPassword.css'; // Optional CSS file if you'd like to style separately

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('https://signup-login-repo.onrender.com/api/reset-password', {
        Email: email.trim(),
        new_password: newPassword.trim(),
      });

      setMessage(res.data.message || 'Password reset successful!');
      setEmail('');
      setNewPassword('');

      // Optional: Redirect after delay
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2 className="reset-title">Reset Password</h2>
        <form onSubmit={handleReset}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              required
              className="input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
