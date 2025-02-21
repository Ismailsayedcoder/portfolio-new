import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SideScrollBar.css';

// Professional Icons
const icons = [
  { 
    name: 'Web Development', 
    icon: '💻', 
    color: '#3498db',
    description: 'تطوير تطبيقات الويب المتكاملة'
  },
  { 
    name: 'Frontend', 
    icon: '🖥️', 
    color: '#2ecc71',
    description: 'واجهات مستخدم تفاعلية وسريعة'
  },
  { 
    name: 'Backend', 
    icon: '🔧', 
    color: '#e74c3c',
    description: 'بناء خوادم قوية وقابلة للتوسع'
  },
  { 
    name: 'UI/UX Design', 
    icon: '🎨', 
    color: '#9b59b6',
    description: 'تصميم تجارب مستخدم مبتكرة'
  }
];

const ProfessionalStatistics = () => {
  const [stats, setStats] = useState([
    { 
      label: 'مشاريع مكتملة', 
      value: 25, 
      icon: '✅',
      color: '#3498db',
      description: 'مشروع برمجي متنوع'
    },
    { 
      label: 'سنوات الخبرة', 
      value: 3, 
      icon: '💼',
      color: '#2ecc71',
      description: 'خبرة متراكمة في التطوير'
    },
    { 
      label: 'لغات برمجة', 
      value: 7, 
      icon: '💻',
      color: '#e74c3c',
      description: 'لغات برمجة متقنة'
    }
  ]);

  return (
    <div className="professional-statistics">
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          className="stat-card"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: index * 0.2,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
          }}
        >
          <div 
            className="stat-icon" 
            style={{ backgroundColor: stat.color }}
          >
            {stat.icon}
          </div>
          <div className="stat-details">
            <div 
              className="stat-value" 
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-description">{stat.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const SideScrollBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', calculateScrollProgress);
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <div className="side-scroll-container">
      <div 
        className="side-scroll-progress" 
        style={{ height: `${scrollProgress}%` }}
      />
      
      <div className="professional-icons">
        <AnimatePresence>
          {icons.map((item, index) => (
            <motion.div
              key={index}
              className={`professional-icon ${activeIcon === index ? 'active' : ''}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1
              }}
              onMouseEnter={() => setActiveIcon(index)}
              onMouseLeave={() => setActiveIcon(null)}
              style={{ 
                backgroundColor: item.color,
                transform: activeIcon === index ? 'scale(1.2)' : 'scale(1)'
              }}
            >
              <span>{item.icon}</span>
              {activeIcon === index && (
                <motion.div 
                  className="icon-tooltip"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ProfessionalStatistics />
    </div>
  );
};

export default SideScrollBar;
