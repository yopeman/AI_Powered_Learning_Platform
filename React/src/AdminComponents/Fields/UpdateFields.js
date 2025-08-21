import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { useParams } from "react-router-dom";

export default function UpdateFields() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    years_length: 1,
    isFree: 'false',
    number_of_free_topics: 0,
    status: 'inactive'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchField = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/fields/${id}`);
        if (response.data.success) {
          const fieldData = response.data.data;
          // Convert boolean to string for select input
          setFormData({
            ...fieldData,
            isFree: String(fieldData.isFree)
          });
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch field');
      } finally {
        setLoading(false);
      }
    };
    fetchField();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      const response = await api.put(`/fields/${id}`, submitData);
      if (response.data.success) {
        setSuccess('Field updated successfully');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Update Field</h2>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <form onSubmit={handleSubmit} className="field-form">
            {success && <div className="success-message">{success}</div>}
            
            <div className="form-group">
              <label htmlFor="title">Field Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
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
                {loading ? 'Updating...' : 'Update Field'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}