import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, 
  FaLaptopCode, 
  FaReact, 
  FaServer, 
  FaTools,
  FaUniversity,
  FaMapMarkerAlt,
  FaCertificate,
  FaAward,
  FaLanguage
} from 'react-icons/fa';
import './AboutSection.css';
import profileImage from '../../assets/images/logo.png';

const AboutSection = memo(() => {
  const [activeTab, setActiveTab] = useState('skills');

  const professionalSkills = [
    {
      icon: <FaReact />,
      title: 'تطوير الواجهات الأمامية',
      description: 'خبرة متقدمة في بناء واجهات مستخدم تفاعلية باستخدام React و Next.js'
    },
    {
      icon: <FaServer />,
      title: 'تطوير الخلفية',
      description: 'معرفة قوية بتقنيات الخلفية مثل Node.js وقواعد البيانات'
    },
    {
      icon: <FaTools />,
      title: 'أدوات التطوير',
      description: 'إتقان أحدث أدوات وتقنيات التطوير مثل TypeScript وWebpack'
    }
  ];

  const certifications = [
    {
      icon: <FaCertificate />,
      title: 'شهادة React المتقدمة',
      issuer: 'Udemy',
      year: 2023
    },
    {
      icon: <FaAward />,
      title: 'مسابقة البرمجة الوطنية',
      issuer: 'جامعة المنيا',
      year: 2024
    }
  ];

  const languages = [
    {
      icon: <FaLanguage />,
      name: 'العربية',
      level: 'اللغة الأم'
    },
    {
      icon: <FaLanguage />,
      name: 'الإنجليزية',
      level: 'جيد جدا'
    }
  ];

  const personalDetails = {
    name: 'اسماعيل سيد',
    age: 19,
    location: 'المنيا | مصر',
    education: 'بكالوريوس علوم الحاسوب',
    invarsity: 'كلية تربية نوعية | جامعة المنيا',
    section: 'تكنولوجيا التعليم و علوم الحاسب'
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'skills':
        return (
          <div className="tab-content skills-content">
            {professionalSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="skill-item"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="skill-icon">{skill.icon}</div>
                <div className="skill-details">
                  <h4>{skill.title}</h4>
                  <p>{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'certifications':
        return (
          <div className="tab-content certifications-content">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index} 
                className="certification-item"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-details">
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer} | {cert.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'languages':
        return (
          <div className="tab-content languages-content">
            {languages.map((lang, index) => (
              <motion.div 
                key={index} 
                className="language-item"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="lang-icon">{lang.icon}</div>
                <div className="lang-details">
                  <h4>{lang.name}</h4>
                  <p>{lang.level}</p>
                </div>
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="about-section">
      <div className="about-container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="about-profile">
            <div className="profile-image-container">
              <img 
                src={profileImage} 
                alt={personalDetails.name} 
                className="profile-image" 
              />
            </div>
            <div className="profile-details">
              <h2>{personalDetails.name}</h2>
              <ul>
                <li>
                  <FaMapMarkerAlt /> الموقع: {personalDetails.location}
                </li>
                <li>
                  <FaUniversity /> الجامعة: {personalDetails.invarsity}
                </li>
                <li>
                  <FaCode /> التخصص: {personalDetails.section}
                </li>
                <li>
                  <FaLaptopCode /> التعليم: {personalDetails.education}
                </li>
              </ul>
            </div>
          </div>

          <div className="about-description">
            <h3>من أنا</h3>
            <p>
              طالب في مجال تكنولوجيا التعليم وعلوم الحاسب، أسعى للتميز في مجال البرمجة 
              وتطوير التطبيقات التعليمية المبتكرة. أمتلك شغفًا كبيرًا بالتعلم المستمر 
              والابتكار في مجال التكنولوجيا والتعليم.
            </p>
          </div>

          <div className="professional-details">
            <div className="tabs-navigation">
              {['skills', 'certifications', 'languages'].map((tab) => (
                <button
                  key={tab}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'skills' && 'المهارات'}
                  {tab === 'certifications' && 'الشهادات'}
                  {tab === 'languages' && 'اللغات'}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default AboutSection;
