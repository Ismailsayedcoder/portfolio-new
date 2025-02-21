import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaGlobeAfrica, 
  FaMapMarkerAlt,
  FaSpinner,
  FaCheckCircle
} from 'react-icons/fa';
import './Register.css';

// Comprehensive Countries and Governorates Data
const COUNTRIES_GOVERNORATES = {
  'مصر': [
    'القاهرة', 'الإسكندرية', 'الجيزة', 'الشرقية', 'الدقهلية', 
    'المنوفية', 'القليوبية', 'كفر الشيخ', 'الغربية', 'المنيا'
  ],
  'السعودية': [
    'الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 
    'الأحساء', 'الطائف', 'القصيم', 'تبوك', 'حائل'
  ],
  'الإمارات': [
    'أبوظبي', 'دبي', 'الشارقة', 'عجمان', 'أم القيوين', 
    'رأس الخيمة', 'الفجيرة'
  ]
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    governorate: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'اسم المستخدم مطلوب';
    } else if (formData.username.length < 3) {
      newErrors.username = 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }

    // Country and Governorate validation
    if (!formData.country) {
      newErrors.country = 'اختيار الدولة مطلوب';
    }

    if (!formData.governorate) {
      newErrors.governorate = 'اختيار المحافظة مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Reset governorate when country changes
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        governorate: '' // Reset governorate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Password strength calculation
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Reset previous errors and loading state
    setErrors({});
    setIsLoading(true);

    // Validate form
    const isValid = validateForm();
    
    if (isValid) {
      // Simulate registration process
      setTimeout(() => {
        // Retrieve existing users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

        // Check if username already exists
        const userExists = existingUsers.some(user => user.username === formData.username);
        
        if (userExists) {
          setErrors({username: 'اسم المستخدم موجود بالفعل'});
          setIsLoading(false);
          return;
        }

        // Create new user object
        const newUser = {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          country: formData.country,
          governorate: formData.governorate,
          role: 'user'
        };

        // Add new user to existing users
        const updatedUsers = [...existingUsers, newUser];

        // Store updated users in localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

        setIsLoading(false);
        setRegistrationSuccess(true);

        // Navigate to login with registered user data
        navigate('/login', { 
          state: { 
            registeredUser: newUser
          } 
        });
      }, 1500); // Simulated network delay
    } else {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  if (registrationSuccess) {
    return (
      <div className="register-success">
        <FaCheckCircle className="success-icon" />
        <h2>تم إنشاء الحساب بنجاح</h2>
        <p>سيتم توجيهك إلى الصفحة الرئيسية</p>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <form 
          ref={formRef} 
          onSubmit={handleRegister} 
          className="register-form"
        >
          <h2>إنشاء حساب جديد</h2>
          
          {/* Username Field */}
          <div className={`form-group ${errors.username ? 'error' : ''}`}>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="اسم المستخدم"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          
          {/* Email Field */}
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          {/* Password Field */}
          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="كلمة المرور"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="password-strength">
              <div 
                className={`password-strength-meter 
                  ${passwordStrength <= 2 ? 'password-strength-weak' : 
                    passwordStrength <= 4 ? 'password-strength-medium' : 
                    'password-strength-strong'}`}
                style={{width: `${(passwordStrength / 5) * 100}%`}}
              ></div>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          {/* Confirm Password Field */}
          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="تأكيد كلمة المرور"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
          
          {/* Country Field */}
          <div className={`form-group ${errors.country ? 'error' : ''}`}>
            <div className="input-wrapper">
              <FaGlobeAfrica className="input-icon" />
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">اختر الدولة</option>
                {Object.keys(COUNTRIES_GOVERNORATES).map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            {errors.country && <span className="error-text">{errors.country}</span>}
          </div>
          
          {/* Governorate Field */}
          <div className={`form-group ${errors.governorate ? 'error' : ''}`}>
            <div className="input-wrapper">
              <FaMapMarkerAlt className="input-icon" />
              <select
                name="governorate"
                value={formData.governorate}
                onChange={handleInputChange}
                disabled={!formData.country}
                required
              >
                <option value="">اختر المحافظة</option>
                {formData.country && 
                  COUNTRIES_GOVERNORATES[formData.country].map(governorate => (
                    <option key={governorate} value={governorate}>
                      {governorate}
                    </option>
                  ))
                }
              </select>
            </div>
            {errors.governorate && <span className="error-text">{errors.governorate}</span>}
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className="register-button" 
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="spinner-icon" />
            ) : (
              'إنشاء حساب'
            )}
          </button>
          
          {/* Login Link */}
          <p className="login-link">
            لديك حساب بالفعل؟{' '}
            <span onClick={navigateToLogin}>
              تسجيل الدخول
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
