import React, { useState } from 'react';
import axios from 'axios';
import "../styles/validotp.css";

function OTPVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      const response = await axios.post('https://your-backend-url.com/verify-otp', {
        Email: email,
        OTP: otp
      });

      if (response.data.message === "Email verified successfully") {
        setMessage("✅ " + response.data.message);
      } else {
        setMessage("❌ Verification failed");
      }
    } catch (error) {
      setMessage("❌ Error verifying OTP");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>OTP Verification</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button onClick={handleVerify}>Verify OTP</button>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

export default OTPVerification;
