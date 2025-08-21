import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function UpdateTopics() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      setInitialLoad(true);
      setError(null);

      try {
        const response = await api.get(`/topics/${id}`);
        if (response.data.success) {
          setFormData({ title: response.data.data.title });
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch topic');
      } finally {
        setInitialLoad(false);
      }
    };

    fetchTopic();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ title: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.put(`/topics/${id}`, formData);
      if (response.data.success) {
        setSuccess('Topic updated successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Topic update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const fetchTopic = async () => {
      try {
        const response = await api.get(`/topics/${id}`);
        if (response.data.success) {
          setFormData({ title: response.data.data.title });
          setError(null);
          setSuccess(null);
        }
      } catch (err) {
        setError('Failed to reset form');
      }
    };
    
    fetchTopic();
  };

  if (initialLoad) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Update Topic</h2>
      </div>
      
      <div className="card-body">
        <form onSubmit={handleSubmit} className="field-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <label>Topic Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="amount-input"
              placeholder="Enter topic title"
            />
          </div>
          
          <div className="button-group" style={{ marginTop: '24px' }}>
            <button 
              type="submit" 
              className="primary-btn"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Topic'}
            </button>
            <button 
              type="button" 
              className="secondary-btn"
              onClick={handleReset}
              disabled={loading}
            >
              Reset Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}