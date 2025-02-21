import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatMessagesRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const currentUser = localStorage.getItem('currentUser');
    setIsLoggedIn(!!currentUser);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobileView);
    
    checkMobileView();

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobileView);
      document.body.style.overflow = 'unset';
    };
  }, [location, isMobileMenuOpen]);

  useEffect(() => {
    // Auto-scroll to bottom of chat messages
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { text: newMessage, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate AI response with a delay
      setTimeout(() => {
        const aiResponses = [
          'مرحباً! كيف يمكنني مساعدتك اليوم؟',
          'أهلاً بك، هل لديك أي استفسارات؟',
          'سعيد بالتحدث معك، ما الذي يشغل بالك؟',
          'أنا هنا للمساعدة، تفضل بسؤالك.'
        ];
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setMessages(prev => [...prev, { text: randomResponse, sender: 'ai' }]);
      }, 500);
    }
  };

  const renderNavLinks = (isMobileMenu = false) => {
    const navLinks = [
      { path: '/', label: 'الرئيسية' },
      { path: '/projects', label: 'المشاريع' },
      { path: '/about', label: 'من أنا' },
      { path: '/contact', label: 'تواصل' }
    ];

    return navLinks.map((link) => (
      <li key={link.path}>
        <Link 
          to={link.path} 
          className={location.pathname === link.path ? 'active' : ''}
          onClick={isMobileMenu ? toggleMobileMenu : undefined}
        >
          {link.label}
        </Link>
      </li>
    ));
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button 
        className="chat-toggle-btn"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </motion.button>

      {/* Animated Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="animated-chat-window"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chat-header">
              <h3>المساعد الذكي</h3>
              <button onClick={toggleChat} className="close-chat">×</button>
            </div>
            <div 
              className="chat-messages" 
              ref={chatMessagesRef}
            >
              {messages.map((msg, index) => (
                <motion.div 
                  key={index} 
                  className={`message ${msg.sender}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>
            <div className="chat-input-container">
              <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <motion.button 
                onClick={handleSendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                إرسال
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <motion.button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </motion.button>
      )}

      <header className={`header ${scrolled ? 'scrolled' : ''} ${isMobile ? 'mobile-header' : ''}`}>
        <div className="header-container">
          <Link to="/" className="logo">
            <span className="logo-main">&lt;ابو السباع/&gt; </span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="main-nav">
              <ul>
                {renderNavLinks()}
              </ul>
            </nav>
          )}
          
          {/* Desktop Auth Links */}
          {!isMobile && (
            <div className="auth-links">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="dashboard-btn">لوحة التحكم</Link>
                  <button onClick={handleLogout} className="logout-btn">تسجيل الخروج</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="login-btn">تسجيل الدخول</Link>
                  <Link to="/register" className="signup-btn">إنشاء حساب</Link>
                </>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobile && isMobileMenuOpen && (
              <motion.nav 
                className="mobile-nav"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
              >
                <ul>
                  {renderNavLinks(true)}
                </ul>

                {/* Mobile Auth Links */}
                <div className="mobile-auth-links">
                  {isLoggedIn ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="dashboard-btn"
                        onClick={toggleMobileMenu}
                      >
                        لوحة التحكم
                      </Link>
                      <button 
                        onClick={() => {
                          handleLogout();
                          toggleMobileMenu();
                        }} 
                        className="logout-btn"
                      >
                        تسجيل الخروج
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="login-btn"
                        onClick={toggleMobileMenu}
                      >
                        تسجيل الدخول
                      </Link>
                      <Link 
                        to="/register" 
                        className="signup-btn"
                        onClick={toggleMobileMenu}
                      >
                        إنشاء حساب
                      </Link>
                    </>
                  )}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default Header;
