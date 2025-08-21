import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { useParams, useNavigate } from "react-router-dom";
import Loader from '../Loader';

export default function UpdateUsers() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    role: 'admin',
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/users/${id}`);
        if (response.data.success) {
          delete response.data.data.password;
          setFormData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.password && formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const payload = { ...formData };
    if (formData.password) {
      delete payload.confirm_password;
    } else {
      delete payload.password;
      delete payload.confirm_password;
    }

    try {
      const response = await api.put(`/users/${id}`, payload);
      if (response.data.success) {
        setSuccess('User updated successfully');
        setTimeout(() => navigate('/users/get'), 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
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
        <h1 className="card-title">Update User</h1>
      </div>
      <div className="card-body">
        {error && <div className="error-message">Error: {error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="field-form">
          <div className="form-grid">
            {['first_name', 'last_name', 'email', 'phone'].map((field) => (
              <div className="form-group" key={field}>
                <label>{field.replace('_', ' ').toUpperCase()}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="amount-input"
                  required
                />
              </div>
            ))}
            
            <div className="form-group">
              <label>PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="amount-input"
                placeholder="Leave blank to keep current"
              />
            </div>
            
            <div className="form-group">
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="amount-input"
                placeholder="Confirm new password"
              />
            </div>
            
            <div className="form-group">
              <label>USER ROLE</label>
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
            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update User'}
            </button>
            <button type="button" className="secondary-btn" onClick={handleReset}>
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