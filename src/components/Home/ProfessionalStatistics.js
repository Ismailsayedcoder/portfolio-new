import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaProjectDiagram, 
  FaClock, 
  FaTrophy,
  FaLaptopCode,
  FaGithub,
  FaStackOverflow
} from 'react-icons/fa';
import './ProfessionalStatistics.css';

const statisticsData = [
  {
    icon: <FaCode />,
    title: 'سنوات الخبرة',
    value: 3,
    suffix: '+',
    color: '#4CAF50',
    description: 'سنوات من التطوير المستمر والابتكار في مجال البرمجة'
  },
  {
    icon: <FaProjectDiagram />,
    title: 'المشاريع المنجزة',
    value: 20,
    suffix: '+',
    color: '#2196F3',
    description: 'مشاريع متنوعة ومعقدة تغطي مختلف مجالات التطوير'
  },
  {
    icon: <FaClock />,
    title: 'ساعات البرمجة',
    value: 3000,
    suffix: '+',
    color: '#FF9800',
    description: 'ساعات متواصلة من التعلم والتطوير والممارسة'
  },
  {
    icon: <FaTrophy />,
    title: 'الإنجازات',
    value: 5,
    suffix: '+',
    color: '#9C27B0',
    description: 'جوائز وشهادات تؤكد التميز والإبداع'
  }
];

const socialContributions = [
  {
    icon: <FaGithub />,
    title: 'مساهمات GitHub',
    value: '500+',
    color: '#333',
    link: 'https://github.com/esmail-sayed'
  },
  {
    icon: <FaStackOverflow />,
    title: 'مساهمات Stack Overflow',
    value: '100+',
    color: '#F48024',
    link: 'https://stackoverflow.com/users/your-profile'
  }
];

const jobTitles = [
  {
    id: 'web-dev',
    title: 'مطور ويب',
    description: 'تطوير تطبيقات ويب باستخدام تقنيات الويب الحديثة'
  },
  {
    id: 'mobile-dev',
    title: 'مطور تطبيقات 移动',
    description: 'تطوير تطبيقات 移动 باستخدام تقنيات 移动 الحديثة'
  }
];

const ProfessionalStatistics = memo(() => {
  const [hoveredStatistic, setHoveredStatistic] = useState(null);
  const [hoveredContribution, setHoveredContribution] = useState(null);

  useEffect(() => {
    jobTitles.forEach(job => {
      console.log(`Job: ${job.title}, Description: ${job.description}`);
    });
  }, []);

  return (
    <section className="professional-statistics-section">
      <div className="professional-statistics-container">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          إحصائياتي المهنية
        </motion.h2>

        <div className="job-titles-section">
          {jobTitles.map((job) => (
            <div key={job.id} className="job-title-item">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </div>
          ))}
        </div>

        <div className="statistics-grid">
          {statisticsData.map((stat, index) => (
            <motion.div
              key={index}
              className="statistic-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              onHoverStart={() => setHoveredStatistic(index)}
              onHoverEnd={() => setHoveredStatistic(null)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
              }}
              style={{ 
                borderColor: stat.color,
                backgroundColor: hoveredStatistic === index 
                  ? `${stat.color}10` 
                  : 'transparent'
              }}
            >
              <div 
                className="statistic-icon" 
                style={{ color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="statistic-content">
                <h3>{stat.title}</h3>
                <div className="statistic-value">
                  {stat.value}{stat.suffix}
                </div>
                {hoveredStatistic === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="statistic-description"
                  >
                    {stat.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="social-contributions"
        >
          <h3>مساهماتي في المجتمع التقني</h3>
          <div className="contributions-grid">
            {socialContributions.map((contrib, index) => (
              <motion.a
                key={index}
                href={contrib.link}
                target="_blank"
                rel="noopener noreferrer"
                className="contribution-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 
                }}
                onHoverStart={() => setHoveredContribution(index)}
                onHoverEnd={() => setHoveredContribution(null)}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                }}
                style={{ 
                  borderColor: contrib.color,
                  backgroundColor: hoveredContribution === index 
                    ? `${contrib.color}10` 
                    : 'transparent'
                }}
              >
                <div 
                  className="contribution-icon" 
                  style={{ color: contrib.color }}
                >
                  {contrib.icon}
                </div>
                <div className="contribution-content">
                  <h4>{contrib.title}</h4>
                  <div className="contribution-value">
                    {contrib.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default ProfessionalStatistics;
