import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollProvider } from './context/ScrollProvider';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Projects from './components/Projects/Project';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Header from './components/Header/Header';
import Footer from './components/Common/Footer';
import './App.css';
import Loader from './components/Loader/Loader';
import AdminLogin from './components/Login/AdminLogin';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ForgotPassword from './components/Login/ForgotPassword';
import UserDashboard from './components/Dashboard/UserDashboard';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </Router>
        </ScrollProvider>
      )}
    </div>
  );
}

export default App;
