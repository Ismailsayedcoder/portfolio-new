import React from 'react';
import { motion } from 'framer-motion';
import project1Image from '../../assets/images/project1.jpg';
import project2Image from '../../assets/images/project2.jpg';
import project3Image from '../../assets/images/project3.jpg';

const ProfessionalStatistics = () => {
  const stats = [
    { 
      label: 'مشاريع مكتملة', 
      value: 25, 
      icon: '✅',
      color: '#3498db',
      description: 'مشروع برمجي متنوع',
      image: project1Image
    },
    { 
      label: 'سنوات الخبرة', 
      value: 3, 
      icon: '💼',
      color: '#2ecc71',
      description: 'خبرة متراكمة في التطوير',
      image: project2Image
    },
    { 
      label: 'لغات برمجة', 
      value: 7, 
      icon: '💻',
      color: '#e74c3c',
      description: 'لغات برمجة متقنة',
      image: project3Image
    }
  ];

  return (
    <motion.div 
      className="professional-statistics-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="statistics-grid">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.2,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
          >
            <div className="stat-image-container">
              <img 
                src={stat.image} 
                alt={stat.label} 
                className="stat-image" 
                loading="lazy"
              />
            </div>
            <div className="stat-content">
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
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfessionalStatistics;
