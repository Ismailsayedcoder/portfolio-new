import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaChartBar, FaCog, FaSignOutAlt, 
  FaUserPlus, FaShoppingCart, FaComments 
} from 'react-icons/fa';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('أبو السباع');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalUsers: 1250,
    activeUsers: 890,
    newRegistrations: 45,
    pendingOrders: 23,
    totalRevenue: 124567,
    supportTickets: 12
  });

  useEffect(() => {
    // Check if admin is logged in using consistent keys
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (isLoggedIn !== 'true' || !currentUser || currentUser.role !== 'admin') {
      navigate('/admin-login');
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
    navigate('/admin-login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', { 
      style: 'currency', 
      currency: 'SAR' 
    }).format(amount);
  };

  const formatTime = (date) => {
    return date.toLocaleString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="logo">لوحة التحكم</div>
        <nav>
          <ul>
            <li className="active"><FaHome /> الرئيسية</li>
            <li><FaUsers /> إدارة المستخدمين</li>
            <li><FaChartBar /> التحليلات</li>
            <li><FaUserPlus /> التسجيلات الجديدة</li>
            <li><FaShoppingCart /> الطلبات</li>
            <li><FaComments /> الدعم الفني</li>
            <li><FaCog /> الإعدادات</li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> تسجيل الخروج
        </button>
      </aside>
      
      <main className="main-content">
        <header className="welcome-header">
          <div className="welcome-message">
            <h1>مرحباً، {adminName} 👋</h1>
            <p>{formatTime(currentTime)}</p>
          </div>
        </header>
        
        <div className="dashboard-stats">
          <div className="stat-card users">
            <FaUsers className="stat-icon" />
            <div className="stat-content">
              <h3>إجمالي المستخدمين</h3>
              <p>{stats.totalUsers.toLocaleString('ar-SA')}</p>
            </div>
          </div>
          <div className="stat-card active-users">
            <FaUsers className="stat-icon" />
            <div className="stat-content">
              <h3>المستخدمون النشطون</h3>
              <p>{stats.activeUsers.toLocaleString('ar-SA')}</p>
            </div>
          </div>
          <div className="stat-card registrations">
            <FaUserPlus className="stat-icon" />
            <div className="stat-content">
              <h3>التسجيلات الجديدة</h3>
              <p>{stats.newRegistrations.toLocaleString('ar-SA')}</p>
            </div>
          </div>
          <div className="stat-card revenue">
            <FaShoppingCart className="stat-icon" />
            <div className="stat-content">
              <h3>الإيرادات الكلية</h3>
              <p>{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
          <div className="stat-card orders">
            <FaShoppingCart className="stat-icon" />
            <div className="stat-content">
              <h3>الطلبات المعلقة</h3>
              <p>{stats.pendingOrders.toLocaleString('ar-SA')}</p>
            </div>
          </div>
          <div className="stat-card support">
            <FaComments className="stat-icon" />
            <div className="stat-content">
              <h3>تذاكر الدعم</h3>
              <p>{stats.supportTickets.toLocaleString('ar-SA')}</p>
            </div>
          </div>
        </div>

        <section className="quick-actions">
          <h2>الإجراءات السريعة</h2>
          <div className="action-buttons">
            <button className="action-btn">
              <FaUsers /> إدارة المستخدمين
            </button>
            <button className="action-btn">
              <FaChartBar /> عرض التقارير
            </button>
            <button className="action-btn">
              <FaCog /> الإعدادات العامة
            </button>
          </div>
        </section>

        <section className="recent-activity">
          <h2>النشاط الأخير</h2>
          <table className="activity-table">
            <thead>
              <tr>
                <th>المستخدم</th>
                <th>النشاط</th>
                <th>الوقت</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>محمد أحمد</td>
                <td>تسجيل دخول</td>
                <td>منذ 5 دقائق</td>
              </tr>
              <tr>
                <td>سارة خالد</td>
                <td>تحديث الملف الشخصي</td>
                <td>منذ ساعة</td>
              </tr>
              <tr>
                <td>علي محمد</td>
                <td>إنشاء حساب جديد</td>
                <td>منذ 3 ساعات</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;