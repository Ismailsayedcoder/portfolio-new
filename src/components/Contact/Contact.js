import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

// Social Media Icons
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const CodeTerminal = () => {
  const [displayText, setDisplayText] = useState('');
  const codeSnippets = [
    "// Connecting professional networks...",
    "const contactRequest = {",
    "  name: 'Esmail Abu Saba\'a',",
    "  expertise: ['Full Stack Development', 'AI/ML', 'Cloud Architecture'],",
    "  availableFor: ['Collaboration', 'Consulting', 'Innovative Projects']",
    "};",
    "// Initializing communication protocol...",
    "async function initiateContact(request) {",
    "  try {",
    "    const response = await processRequest(request);",
    "    return response.success();",
    "  } catch (error) {",
    "    handleProfessionalInteraction(error);",
    "  }",
    "}"
  ];

  useEffect(() => {
    let currentSnippetIndex = 0;
    let currentCharIndex = 0;
    let typingInterval;

    const typeNextChar = () => {
      if (currentSnippetIndex < codeSnippets.length) {
        const currentSnippet = codeSnippets[currentSnippetIndex];
        
        if (currentCharIndex <= currentSnippet.length) {
          setDisplayText(prev => 
            currentSnippet.slice(0, currentCharIndex)
          );
          currentCharIndex++;
        } else {
          // Move to next snippet after a short pause
          setTimeout(() => {
            currentSnippetIndex++;
            currentCharIndex = 0;
          }, 1000);
        }
      } else {
        // Reset when all snippets are typed
        currentSnippetIndex = 0;
      }
    };

    typingInterval = setInterval(typeNextChar, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="code-terminal">
      <div className="terminal-header">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-title">dev_contact.js</span>
      </div>
      <pre>
        <code className="typing-text">
          {displayText}
          <motion.span 
            className="cursor"
            animate={{
              opacity: [0, 1],
              transition: {
                duration: 0.7,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            ▌
          </motion.span>
        </code>
      </pre>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const formRef = useRef(null);

  // Dynamic Particle Background State
  const [particles, setParticles] = useState([]);

  // Particle Generation Effect
  useEffect(() => {
    const generateParticles = () => {
      const particleCount = window.innerWidth < 768 ? 20 : 50;
      const newParticles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.7 + 0.3
      }));
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'الاسم مطلوب';
    if (!formData.email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'البريد الإلكتروني غير صحيح';
    }
    if (!formData.message.trim()) errors.message = 'الرسالة مطلوبة';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSent(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSent(false);
      }, 3000);
    }
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const socialLinks = [
    { 
      icon: <LinkedInIcon />, 
      link: 'https://www.linkedin.com/in/esmail-abusabaa',
      name: 'LinkedIn'
    },
    { 
      icon: <GitHubIcon />, 
      link: 'https://github.com/esmail-abusabaa',
      name: 'GitHub'
    },
    { 
      icon: <TwitterIcon />, 
      link: 'https://twitter.com/esmail_abusabaa',
      name: 'Twitter'
    },
    { 
      icon: <FacebookIcon />, 
      link: 'https://www.facebook.com/profile.php?id=100032989793377', 
      name: 'Facebook'
    }
  ];

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      text: '010-298-43800',
      type: 'phone'
    },
    {
      icon: <PhoneIcon />,
      text: '011-045-34301',
      type: 'phone'
    },
    {
      icon: <EmailIcon />,
      text: 'esmail.abusabaa@gmail.com',
      type: 'email'
    }
  ];

  const [techEffects, setTechEffects] = useState({
    glitchActive: false,
    matrixMode: false
  });

  const toggleTechEffect = (effect) => {
    setTechEffects(prev => ({
      ...prev,
      [effect]: !prev[effect]
    }));
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`contact-page ${techEffects.glitchActive ? 'glitch-mode' : ''} ${techEffects.matrixMode ? 'matrix-mode' : ''}`}
    >
      {/* Dynamic Particle Background */}
      <div className="particle-background">
        {particles.map((particle, index) => (
          <motion.div 
            key={index}
            className="particle"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity
            }}
            animate={{
              x: [-particle.speed, particle.speed],
              y: [particle.speed, -particle.speed],
              transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>

      {/* New Code Terminal Overlay */}
      <CodeTerminal />

      {/* Tech Effect Toggles */}
      <div className="tech-effect-toggles">
        <motion.button 
          onClick={() => toggleTechEffect('glitchActive')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`tech-toggle ${techEffects.glitchActive ? 'active' : ''}`}
        >
          {techEffects.glitchActive ? 'Disable' : 'Activate'} Glitch
        </motion.button>
        <motion.button 
          onClick={() => toggleTechEffect('matrixMode')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`tech-toggle ${techEffects.matrixMode ? 'active' : ''}`}
        >
          {techEffects.matrixMode ? 'Exit' : 'Enter'} Matrix Mode
        </motion.button>
      </div>

      {/* Existing Contact Container */}
      <div className="contact-container">
        <motion.div 
          variants={itemVariants}
          className="contact-info"
        >
          <motion.h1 
            variants={itemVariants}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            تواصل معي
          </motion.h1>
          <motion.p variants={itemVariants}>
            هل لديك مشروع أو فكرة تريد تنفيذها؟ لا تتردد في التواصل معي.
          </motion.p>
          
          <div className="contact-details">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index} 
                className="contact-detail-item"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {info.icon}
                <span>{info.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="contact-form"
        >
          <AnimatePresence>
            <form ref={formRef} onSubmit={handleSubmit}>
              {['name', 'email', 'message'].map((field) => (
                <motion.div 
                  key={field} 
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: field === 'name' ? 0.5 : field === 'email' ? 0.7 : 0.9 }}
                >
                  <label htmlFor={field}>
                    {field === 'name' ? 'الاسم' : 
                     field === 'email' ? 'البريد الإلكتروني' : 'رسالتك'}
                  </label>
                  {field !== 'message' ? (
                    <input 
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required 
                    />
                  ) : (
                    <textarea 
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required 
                    />
                  )}
                  {formErrors[field] && (
                    <motion.div 
                      className="error-message"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {formErrors[field]}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`submit-btn ${isSent ? 'sent' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                {isSent ? 'تم الإرسال!' : 'إرسال الرسالة'}
              </motion.button>
            </form>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;