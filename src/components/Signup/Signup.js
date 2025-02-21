import React from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>إنشاء حساب جديد</h2>
        <form>
          <div className="form-group">
            <input type="text" placeholder="الاسم الكامل" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="البريد الإلكتروني" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="كلمة المرور" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="تأكيد كلمة المرور" required />
          </div>
          <button type="submit" className="signup-btn">
            تسجيل
          </button>
          <div className="login-link">
            لديك حساب بالفعل؟ <a href="/login">تسجيل الدخول</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
