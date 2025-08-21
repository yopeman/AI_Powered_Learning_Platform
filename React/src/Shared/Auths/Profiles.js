import React, { useEffect, useState } from 'react';
import { api } from "../Utilities/api";
import { useNavigate } from "react-router-dom";

export default function Profiles({ setRole }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          const { password, ...userData } = response.data.data;
          setFormData({ ...userData, password: '', confirm_password: '' });
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password && formData.password !== formData.confirm_password) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const updateData = { ...formData };
    if (!updateData.password) {
      delete updateData.password;
      delete updateData.confirm_password;
    } else {
      delete updateData.confirm_password;
    }

    try {
      const response = await api.put('/users/me', updateData);
      if (response.data.success) {
        setSuccess('Profile updated successfully');
        // Update local data without password fields
        const { password, confirm_password, ...cleanData } = formData;
        setFormData({ ...cleanData, password: '', confirm_password: '' });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    window.location = '/login';
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Your Profile</h2>
          <p>Manage your account information</p>
        </div>
        
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-section">
              <h3>Change Password</h3>
              <p className="form-hint">Leave blank to keep current password</p>
              
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <div className="password-input">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
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
              
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="primary-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span> Updating...
                  </>
                ) : 'Save Changes'}
              </button>
              
              <button 
                type="button" 
                className="secondary-btn"
                onClick={() => navigate(-1)}
              >
                Back to Dashboard
              </button>
              
              <button 
                type="button" 
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}