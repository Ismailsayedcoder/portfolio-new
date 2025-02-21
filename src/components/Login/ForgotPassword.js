import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';  // Import the shared CSS file

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stage, setStage] = useState('email');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendVerificationCode = (e) => {
    e.preventDefault();
    // In a real app, this would send an email
    const code = generateVerificationCode();
    localStorage.setItem('resetCode', code);
    console.log(`Verification code sent to ${email}: ${code}`);
    setStage('verify');
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const storedCode = localStorage.getItem('resetCode');
    
    if (verificationCode === storedCode) {
      setStage('newPassword');
    } else {
      setError('Invalid verification code');
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // In a real app, update password in backend
    localStorage.removeItem('resetCode');
    alert('Password reset successfully');
    navigate('/login');
  };

  const renderStage = () => {
    switch(stage) {
      case 'email':
        return (
          <form className="login-form" onSubmit={handleSendVerificationCode}>
            <h2>Reset Password</h2>
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Send Verification Code
            </button>
            {error && <div className="error-message">{error}</div>}
            <div className="forgot-password">
              <Link to="/login">Back to Login</Link>
            </div>
          </form>
        );
      
      case 'verify':
        return (
          <form className="login-form" onSubmit={handleVerifyCode}>
            <h2>Verify Code</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Enter 6-digit verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                maxLength="6"
              />
            </div>
            <button type="submit" className="login-button">
              Verify Code
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
        );
      
      case 'newPassword':
        return (
          <form className="login-form" onSubmit={handleResetPassword}>
            <h2>Set New Password</h2>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Reset Password
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="login-container">
      {renderStage()}
    </div>
  );
}

export default ForgotPassword;