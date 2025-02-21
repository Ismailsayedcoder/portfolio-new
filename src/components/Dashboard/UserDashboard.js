import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt, 
  FaEnvelope, 
  FaBell, 
  FaCalendarAlt, 
  FaTasks 
} from 'react-icons/fa';
import './UserDashboard.css';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (isLoggedIn !== 'true' || !currentUser || currentUser.role !== 'user') {
      navigate('/login');
    } else {
      setUser(currentUser);
    }

    // Update current time
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) return null;

  const formatTime = (date) => {
    return date.toLocaleString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="user-dashboard">
      <aside className="sidebar">
        <div className="logo">لوحة التحكم</div>
        <nav>
          <ul>
            <li className="active"><FaUser /> الملف الشخصي</li>
            <li><FaChartBar /> التحليلات</li>
            <li><FaTasks /> المهام</li>
            <li><FaCog /> الإعدادات</li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> تسجيل الخروج
        </button>
      </aside>
      
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="time-display">
              <FaCalendarAlt />
              <span>{formatTime(currentTime)}</span>
            </div>
            <div className="notifications">
              <FaBell />
              <span className="notification-badge">3</span>
            </div>
          </div>
          <div className="header-right">
            <div className="user-greeting">
              <h1>مرحبًا، {user.username}!</h1>
              <p>أهلاً بك في لوحة التحكم الخاصة بك</p>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="dashboard-card profile-card">
            <FaUser className="card-icon" />
            <h3>الملف الشخصي</h3>
            <div className="profile-details">
              <p><strong>اسم المستخدم:</strong> {user.username}</p>
              <p><strong>البريد الإلكتروني:</strong> {user.email || 'غير محدد'}</p>
            </div>
          </div>

          <div className="dashboard-card stats-card">
            <FaChartBar className="card-icon" />
            <h3>الإحصائيات</h3>
            <div className="stats-details">
              <p>عدد الزيارات: <strong>42</strong></p>
              <p>آخر تسجيل دخول: <strong>{new Date().toLocaleDateString()}</strong></p>
            </div>
          </div>

          <div className="dashboard-card tasks-card">
            <FaTasks className="card-icon" />
            <h3>المهام الحالية</h3>
            <ul className="tasks-list">
              <li>✓ مراجعة المستندات</li>
              <li>✓ تحديث الملف الشخصي</li>
              <li>⏳ إكمال الدورة التدريبية</li>
            </ul>
          </div>

          <div className="dashboard-card messages-card">
            <FaEnvelope className="card-icon" />
            <h3>الرسائل</h3>
            <div className="messages-preview">
              <p>لا توجد رسائل جديدة</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;