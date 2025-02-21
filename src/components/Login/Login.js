import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [userCredentials, setUserCredentials] = useState(() => {
    const storedCredentials = localStorage.getItem('userCredentials');
    return storedCredentials ? JSON.parse(storedCredentials) : [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'user', password: 'user123', role: 'user' }
    ];
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Combine default and registered users
    setUserCredentials(prevCredentials => [
      ...prevCredentials, 
      ...registeredUsers
    ]);

    // Check if there's registration data passed from Signup
    const registeredUser = location.state?.registeredUser;
    if (registeredUser) {
      // Add the newly registered user to credentials if not already exists
      const userExists = registeredUsers.some(
        user => user.username === registeredUser.username
      );
      
      if (!userExists) {
        const updatedUsers = [...registeredUsers, registeredUser];
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      }
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
  }, [userCredentials]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginAttempts(prevAttempts => prevAttempts + 1);

    console.log('Login attempt:', { username, password }); // Debugging log
    console.log('Current Credentials:', userCredentials); // Debugging log

    const validCredential = userCredentials.find(
      cred => cred.username === username && cred.password === password
    );

    if (validCredential) {
      console.log('Valid credential found:', validCredential); // Debugging log

      // Consistent storage mechanism
      localStorage.setItem('userRole', validCredential.role);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({
        username: validCredential.username,
        role: validCredential.role
      }));
      
      if (validCredential.role === 'admin') {
        console.log('Navigating to admin dashboard'); // Debugging log
        navigate('/admin-dashboard');
      } else {
        console.log('Navigating to user dashboard'); // Debugging log
        navigate('/user-dashboard');
      }
    } else {
      console.log('Invalid credentials'); // Debugging log
      setError('Invalid username or password');
      
      if (loginAttempts >= 2) {
        setError('Too many failed attempts. Account temporarily blocked.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="login-button">
          Login
        </button>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        
        <div className="login-attempts">
          Login Attempts: {loginAttempts}
        </div>
        
        <div className="admin-login-option">
          <Link to="/admin-login">Login as Admin</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;