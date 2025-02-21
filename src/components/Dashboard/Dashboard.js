import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Common/Footer';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      // Redirect to login if no user is logged in
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove current user from localStorage
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <h1>مرحبًا، {user.username}!</h1>
          <p>أهلاً بك في لوحة التحكم الخاصة بك</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <h3>إحصائيات الحساب</h3>
            <p>تاريخ التسجيل: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✉️</div>
            <h3>البريد الإلكتروني</h3>
            <p>{user.email}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <h3>اسم المستخدم</h3>
            <p>{user.username}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <button 
            className="logout-button" 
            onClick={handleLogout}
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
