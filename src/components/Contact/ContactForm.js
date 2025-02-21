import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaComment, 
  FaPaperPlane 
} from 'react-icons/fa';
import './ContactForm.css';

const ContactForm = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });

    try {
      // Simulated form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'حدث خطأ أثناء إرسال الرسالة'
      });
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      className="contact-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={formVariants}
    >
      <div className="contact-container">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          تواصل معي
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <motion.div 
            className="form-group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label htmlFor="name">
              <FaUser /> الاسم
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="أدخل اسمك"
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label htmlFor="email">
              <FaEnvelope /> البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="أدخل بريدك الإلكتروني"
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="message">
              <FaComment /> رسالتك
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="اكتب رسالتك هنا"
            />
          </motion.div>
          
          <motion.button 
            type="submit"
            className="submit-btn"
            disabled={formStatus.isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            
          >
            {formStatus.isSubmitting ? (
              'جار الإرسال...'
            ) : formStatus.isSubmitted ? (
              'تم الإرسال بنجاح!'
            ) : (
              <>
                <FaPaperPlane /> إرسال الرسالة
              </>
            )}
          </motion.button>
          
          {formStatus.error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formStatus.error}
            </motion.div>
          )}
        </form>
      </div>
    </motion.section>
  );
});

export default ContactForm;
