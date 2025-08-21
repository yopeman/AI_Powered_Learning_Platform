import React, { useState } from 'react';
import { api } from "../../Shared/Utilities/api";

export default function CreateFields() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    years_length: 1,
    isFree: 'false',
    number_of_free_topics: 0,
    status: 'inactive'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isFree' ? value : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Convert string booleans to actual booleans
    const submitData = {
      ...formData,
      isFree: formData.isFree === 'true'
    };
    
    try {
      const response = await api.post('/fields', submitData);
      if (response.data.success) {
        setSuccess('Field created successfully');
        setFormData({
          title: '',
          description: '',
          years_length: 1,
          isFree: 'false',
          number_of_free_topics: 0,
          status: 'inactive'
        });
      } else {
        setError(response.data.message);
        setSuccess(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Create New Field</h2>
      </div>
      
      <div className="card-body">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="field-form">
          <div className="form-group">
            <label htmlFor="title">Field Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter field title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the field"
              rows="4"
              required
            />
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="years_length">Duration (Years)</label>
              <input
                id="years_length"
                type="number"
                name="years_length"
                value={formData.years_length}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="number_of_free_topics">Free Topics</label>
              <input
                id="number_of_free_topics"
                type="number"
                name="number_of_free_topics"
                value={formData.number_of_free_topics}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="isFree">Free Access</label>
            <select
              id="isFree"
              name="isFree"
              value={formData.isFree}
              onChange={handleChange}
              required
            >
              <option value="true">Yes / Free Access</option>
              <option value="false">No / Premium Access</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="button-group">
            <button 
              type="submit" 
              className="primary-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Field'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}