import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../Utilities/api';

export default function Login({ setRole }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.post('/login', formData);
      const { success, data, message: responseMessage } = response.data;

      if (success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        setRole(response.data.role);
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        setTimeout(() => {
            window.location = '/';
        }, 1000);

        // if (data.user.role === 'admin') {
        //   localStorage.setItem('token', data.token);
        //   localStorage.setItem('role', 'admin');
        //   setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        //   setTimeout(() => navigate('/'), 1000);
        // } else if (data.user.role === 'assistant') {
        //   localStorage.setItem('token', data.token);
        //   localStorage.setItem('role', 'assistant');
        //   setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        //   setTimeout(() => navigate('/'), 1000);
        // } else {
        //   localStorage.setItem('token', data.token);
        //   localStorage.setItem('role', 'assistant');
        //   setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        //   setTimeout(() => navigate('/'), 1000);
        // }
      } else {
        setMessage({ text: responseMessage, type: 'error' });
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Login failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {message.text && (
            <div className={`auth-message ${message.type}`}>
              {message.text}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={togglePassword}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="primary-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Signing In...
                </>
              ) : 'Sign In'}
            </button>
          </div>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            <br/> <center><Link to={'/'}>Go To Home</Link></center>
          </div>
        </form>
      </div>
    </div>
  );
}