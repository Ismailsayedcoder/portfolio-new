import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Login/Login.css';  // Import the shared CSS file

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const navigate = useNavigate();

  // Admin login news and notifications
  const adminNews = [
    {
      id: 1,
      title: "نظام إدارة جديد",
      description: "تم إطلاق تحديث جديد للوحة التحكم مع ميزات محسنة",
      date: "27 يناير 2025"
    },
    {
      id: 2,
      title: "تحذير أمني",
      description: "يرجى تغيير كلمات المرور بشكل دوري للحفاظ على أمان النظام",
      date: "25 يناير 2025"
    },
    {
      id: 3,
      title: "صيانة مجدولة",
      description: "سيتم إجراء صيانة للنظام يوم الجمعة من الساعة 2 إلى 4 مساءً",
      date: "22 يناير 2025"
    }
  ];

  const adminCredentials = [
    { username: 'superadmin', password: 'admin2024!', role: 'superadmin' },
    { username: 'admin', password: 'admin123', role: 'admin' }
  ];

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginAttempts(prevAttempts => prevAttempts + 1);

    const validCredential = adminCredentials.find(
      cred => cred.username === username && cred.password === password
    );

    if (validCredential) {
      // Consistent storage mechanism
      localStorage.setItem('userRole', validCredential.role);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({
        username: validCredential.username,
        role: validCredential.role
      }));
      navigate('/admin-dashboard');
    } else {
      setError('Invalid admin credentials');
      
      if (loginAttempts >= 2) {
        setError('Too many failed attempts. Admin account temporarily blocked.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleAdminLogin}>
          <h2>Admin Login</h2>
          
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Admin Login
          </button>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
            <span> | </span>
            <Link to="/login">Back to Main Login</Link>
          </div>
          
          <div className="login-attempts">
            Login Attempts: {loginAttempts}
          </div>
        </form>

        <div className="admin-news-section">
          <h3>أخبار وإشعارات الإدارة</h3>
          {adminNews.map((news) => (
            <div key={news.id} className="news-item">
              <h4>{news.title}</h4>
              <p>{news.description}</p>
              <small>{news.date}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;