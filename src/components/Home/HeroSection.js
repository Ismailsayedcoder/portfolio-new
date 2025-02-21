import React, { memo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, 
  FaReact, 
  FaNodeJs, 
  FaPython,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaDownload,
  FaAward
} from 'react-icons/fa';
import './HeroSection.css';
import logo from '../../assets/images/logo.png';
import resumePDF from '../../assets/documents/Esmail_Sayed_Resume.pdf';

const socialLinks = [
  { 
    icon: <FaGithub />, 
    href: 'https://github.com/esmail-sayed', 
    color: '#333',
    tooltip: 'GitHub Profile'
  },
  { 
    icon: <FaLinkedin />, 
    href: 'https://www.linkedin.com/in/esmail-sayed/', 
    color: '#0077B5',
    tooltip: 'LinkedIn Profile'
  },
  { 
    icon: <FaTwitter />, 
    href: 'https://twitter.com/esmail_sayed', 
    color: '#1DA1F2',
    tooltip: 'Twitter Profile'
  },
  { 
    icon: <FaEnvelope />, 
    href: 'mailto:esmail.sayed@example.com', 
    color: '#D44638',
    tooltip: 'Send Email'
  }
];

const technologies = [
  { 
    icon: <FaReact />, 
    name: 'React', 
    color: '#61DAFB',
    level: 90
  },
  { 
    icon: <FaNodeJs />, 
    name: 'Node.js', 
    color: '#68A063',
    level: 80
  },
  { 
    icon: <FaPython />, 
    name: 'Python', 
    color: '#3776AB',
    level: 75
  },
  { 
    icon: <FaCode />, 
    name: 'TypeScript', 
    color: '#3178C6',
    level: 85
  }
];

const HeroSection = memo(() => {
  const [activeBackground, setActiveBackground] = useState(0);
  const [jobTitle, setJobTitle] = useState('');
  const [hoveredTech, setHoveredTech] = useState(null);
  const jobTitles = [
    'مطور برمجيات متكامل',
    'Full Stack Developer',
    'Web Application Engineer'
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const backgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)'
  ];

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Esmail_Sayed_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [resumePDF]);

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      setActiveBackground((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(backgroundInterval);
  }, []);

  useEffect(() => {
    let typingInterval;
    let deletingInterval;

    if (isTyping) {
      typingInterval = setInterval(() => {
        setJobTitle((prev) => {
          const currentTitle = jobTitles[currentTitleIndex];
          if (prev.length < currentTitle.length) {
            return currentTitle.slice(0, prev.length + 1);
          } else {
            clearInterval(typingInterval);
            setTimeout(() => setIsTyping(false), 2000);
            return prev;
          }
        });
      }, 100);
    } else {
      deletingInterval = setInterval(() => {
        setJobTitle((prev) => {
          if (prev.length > 0) {
            return prev.slice(0, -1);
          } else {
            clearInterval(deletingInterval);
            setCurrentTitleIndex((prev) => (prev + 1) % jobTitles.length);
            setIsTyping(true);
          }
          return prev;
        });
      }, 50);
    }

    return () => {
      clearInterval(typingInterval);
      clearInterval(deletingInterval);
    };
  }, [currentTitleIndex, isTyping]);

  const personalInfo = {
    name: 'اسماعيل سيد',
    description: `مطور واجهات أمامية وخلفية متخصص في بناء تطبيقات الويب المتقدمة. 
    أسعى دائمًا للابتكار وتطوير حلول برمجية فعالة وسريعة.`
  };

  return (
    <section 
      className="hero-section" 
      style={{ 
        background: backgrounds[activeBackground],
        transition: 'background 1s ease-in-out'
      }}
    >
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-logo-container">
            <motion.img 
              src={logo} 
              alt="Logo" 
              className="hero-logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                type: "spring", 
                stiffness: 120 
              }}
            />
          </div>

          <div className="hero-text">
            <h1>{personalInfo.name}</h1>
            <h2 className="hero-subtitle">
              {jobTitle}
              <motion.span 
                className="cursor"
                animate={{ 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity 
                }}
              >
                |
              </motion.span>
            </h2>
            <p className="hero-description">{personalInfo.description}</p>
          </div>

          <div className="hero-actions">
            <motion.a 
              href="#contact" 
              className="cta-button contact-btn"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              تواصل معي
            </motion.a>
            <motion.button 
              className="cta-button resume-btn"
              onClick={handleDownloadResume}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaDownload style={{ marginLeft: '10px' }} />
              تحميل السيرة الذاتية
            </motion.button>
          </div>

          <div className="hero-technologies">
            <h3>التقنيات المستخدمة</h3>
            <div className="tech-stack">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className="tech-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.2 
                  }}
                  onHoverStart={() => setHoveredTech(index)}
                  onHoverEnd={() => setHoveredTech(null)}
                  whileHover={{ 
                    scale: 1.2,
                    color: tech.color
                  }}
                >
                  {tech.icon}
                  <span>{tech.name}</span>
                  {hoveredTech === index && (
                    <motion.div 
                      className="tech-skill-level"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div 
                        className="skill-bar" 
                        style={{ 
                          width: `${tech.level}%`, 
                          backgroundColor: tech.color 
                        }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hero-social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: link.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 
                }}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360
                }}
                className="social-link"
                title={link.tooltip}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default HeroSection;
