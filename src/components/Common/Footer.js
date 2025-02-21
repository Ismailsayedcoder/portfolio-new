import React, { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCode,
  FaProjectDiagram,
  FaTrophy,
  FaRocket,
  FaAward,
  FaCloudUploadAlt,
  FaQuoteRight,
  FaHeart,
  FaGraduationCap
} from 'react-icons/fa';
import {
  GiArabicDoor,
  GiLantern,
  GiWingedSword,
  GiWindTurbine,
  GiWisdom,
  GiWoodCabin,
  GiWingedShield,
  GiWizardStaff,
  GiWhiteBook,
  GiWinchesterRifle
} from 'react-icons/gi';
import './Footer.css';

const Footer = memo(() => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const arabicOrnaments = [
    { icon: <GiArabicDoor />, color: '#8B4513' },
    { icon: <GiLantern />, color: '#DAA520' },
    { icon: <GiWingedSword />, color: '#FFC080' },
    { icon: <GiWindTurbine />, color: '#6495ED' },
    { icon: <GiWisdom />, color: '#DC143C' },
    { icon: <GiWoodCabin />, color: '#228B22' },
    { icon: <GiWingedShield />, color: '#FFD700' },
    { icon: <GiWizardStaff />, color: '#4B0082' },
    { icon: <GiWhiteBook />, color: '#F5F5DC' },
    { icon: <GiWinchesterRifle />, color: '#808080' }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/esmail-sayed',
      icon: <FaGithub />,
      color: '#333',
      description: 'مستودعات المشاريع وكود المصدر'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/esmail-sayed',
      icon: <FaLinkedin />,
      color: '#0077B5',
      description: 'الملف الشخصي المهني'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/esmail_sayed',
      icon: <FaTwitter />,
      color: '#1DA1F2',
      description: 'آخر التحديثات والأفكار'
    },
    {
      name: 'Email',
      url: 'mailto:esmail.sayed@example.com',
      icon: <FaEnvelope />,
      color: '#D44638',
      description: 'تواصل مباشر'
    }
  ];

  const inspirationalQuotes = [
    {
      quote: 'العلم نور، والعمل جهد، والإبداع روح',
      author: 'اسماعيل',
      icon: <FaQuoteRight />,
    },
    {
      quote: 'التكنولوجيا ليست أداة، بل هي طريقة للتفكير والإبداع',
      author: 'أبو السباع',
      icon: <FaCode />,
    }
  ];

  const professionalJourney = [
    {
      icon: <GiWingedSword />,
      title: 'Coding Warrior',
      description: 'Embarked on the coding journey with passion and determination'
    },
    {
      icon: <GiWisdom />,
      title: 'Knowledge Seeker',
      description: 'Continuously learning and expanding technological horizons'
    },
    {
      icon: <GiWizardStaff />,
      title: 'Tech Wizard',
      description: 'Mastering advanced technologies and innovative solutions'
    },
    {
      icon: <GiWingedShield />,
      title: 'Digital Defender',
      description: 'Committed to creating secure and robust software solutions'
    }
  ];

  const contactInfo = [
    {
      icon: <FaPhone />,
      text: '01029843800',
      type: 'phone',
      description: 'متاح للتواصل 24/7',
      animationDelay: 0,
      hoverColor: '#2ecc71'
    },
    {
      icon: <FaEnvelope />,
      text: 'ismail.sayed.coder@gmail.com',
      type: 'email',
      description: 'للتواصل المهني والفرص',
      animationDelay: 0.2,
      hoverColor: '#3498db'
    },
    {
      icon: <FaMapMarkerAlt />,
      text: 'مصر، القاهرة',
      type: 'location',
      description: 'الموقع الحالي',
      animationDelay: 0.4,
      hoverColor: '#e74c3c'
    }
  ];

  const handleEmailSubmit = useCallback((e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    alert(`اشتراك البريد الإلكتروني: ${email}`);
    setEmail('ismail.sayed.coder@gmail.com');
  }, [email]);

  const ContactDetailReveal = memo(({ contact }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
      <motion.div
        className="contact-detail-reveal"
        onHoverStart={() => setIsRevealed(true)}
        onHoverEnd={() => setIsRevealed(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="contact-reveal-icon"
          whileHover={{
            rotate: 360,
            scale: 1.2,
            transition: { duration: 0.5 },
          }}
        >
          {contact.icon}
        </motion.div>

        <div className="contact-reveal-content">
          <motion.div
            className="contact-reveal-placeholder"
            animate={{
              width: isRevealed ? '0%' : '100%',
              transition: { duration: 0.5 },
            }}
          />
          <motion.span
            className="contact-reveal-text"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isRevealed ? 1 : 0,
              x: isRevealed ? 0 : -20,
            }}
            transition={{ duration: 0.5 }}
          >
            {contact.text}
          </motion.span>
        </div>

        <motion.small
          className="contact-reveal-description"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            y: isRevealed ? 0 : 20,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {contact.description}
        </motion.small>
      </motion.div>
    );
  });

  return (
    <motion.footer
      className="arabic-ornate-footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="footer-ornaments top-left">
        {arabicOrnaments.map((ornament, index) => (
          <motion.div
            key={index}
            className="ornament"
            style={{ color: ornament.color }}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          >
            {ornament.icon}
          </motion.div>
        ))}
      </div>

      <div className="footer-content-wrapper">
        <div className="footer-columns">
          <motion.div
            className="footer-column social-column"
            whileHover={{ scale: 1.05 }}
          >
            <h3>التواصل الاجتماعي</h3>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ color: social.color }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-column quotes-column"
            whileHover={{ scale: 1.05 }}
          >
            <h3>كلمات مُلهمة</h3>
            <div className="inspirational-quotes">
              {inspirationalQuotes.map((quote, index) => (
                <div key={index} className="quote-item">
                  <div className="quote-icon">{quote.icon}</div>
                  <div className="quote-content">
                    <p>"{quote.quote}"</p>
                    <span className="quote-author">- {quote.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-column journey-column"
            whileHover={{ scale: 1.05 }}
          >
            <h3>رحلتي المهنية</h3>
            <div className="professional-journey">
              {professionalJourney.map((stage, index) => (
                <div key={index} className="journey-stage">
                  <div className="stage-icon">{stage.icon}</div>
                  <div className="stage-details">
                    <h4>{stage.title}</h4>
                    <p>{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-column contact-column"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="contact-reveal-title">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                تواصل معي
              </motion.span>
            </h3>
            <div className="contact-reveal-container">
              {contactInfo.map((contact, index) => (
                <ContactDetailReveal key={index} contact={contact} />
              ))}
            </div>
            <form onSubmit={handleEmailSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="اشترك في النشرة البريدية"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} أبو السباع - كل الحقوق محفوظة
            اسماعيل سيد اسماعيل
          </p>
          <div className="footer-divider"></div>
          <div className="footer-links">
            <a href="/privacy">سياسة الخصوصية</a>
            <a href="/terms">شروط الاستخدام</a>
          </div>
        </div>
      </div>

      <div className="footer-ornaments bottom-right">
        {arabicOrnaments.map((ornament, index) => (
          <motion.div
            key={index}
            className="ornament"
            style={{ color: ornament.color }}
            animate={{
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          >
            {ornament.icon}
          </motion.div>
        ))}
      </div>
    </motion.footer>
  );
});

export default Footer;
