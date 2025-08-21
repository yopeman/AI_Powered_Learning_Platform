import React, { useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

export default function CreateUsers() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    role: 'admin'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const payload = { ...formData };
    delete payload.confirm_password;

    try {
      const response = await api.post('/users', payload);
      if (response.data.success) {
        setSuccess('User created successfully');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          password: '',
          confirm_password: '',
          role: 'admin',
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      role: 'admin',
    });
    setError(null);
    setSuccess(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Create New User</h1>
      </div>
      
      <div className="card-body">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="field-form">
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input 
                type="text" 
                name="first_name" 
                value={formData.first_name} 
                onChange={handleChange} 
                className="amount-input"
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Last Name</label>
              <input 
                type="text" 
                name="last_name" 
                value={formData.last_name} 
                onChange={handleChange} 
                className="amount-input"
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="amount-input"
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="amount-input"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="amount-input"
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirm_password" 
                value={formData.confirm_password} 
                onChange={handleChange} 
                className="amount-input"
                required 
              />
            </div>
            
            <div className="form-group">
              <label>User Role</label>
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="form-select"
              >
                <option value="admin">Admin</option>
                <option value="assistant">Assistant</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>
          
          <div className="button-group">
            <button 
              type="submit" 
              className="primary-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Register User'}
            </button>
            <button 
              type="button" 
              className="secondary-btn"
              onClick={handleReset}
            >
              Reset
            </button>
            <button 
              type="button" 
              className="secondary-btn"
              onClick={() => navigate('/users/get')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}