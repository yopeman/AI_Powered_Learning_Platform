import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {api} from "../../Shared/Utilities/api";

export default function UpdateChapters() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      setInitialLoad(true);
      setError(null);

      try {
        const response = await api.get(`/chapters/${id}`);
        if (response.data.success) {
          const { courseId, ...chapterData } = response.data.data;
          setFormData(chapterData);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch chapter');
      } finally {
        setInitialLoad(false);
      }
    };

    fetchChapter();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.put(`/chapters/${id}`, formData);
      if (response.data.success) {
        setSuccess('Chapter updated successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Chapter update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const fetchChapter = async () => {
      try {
        const response = await api.get(`/chapters/${id}`);
        if (response.data.success) {
          const { courseId, ...chapterData } = response.data.data;
          setFormData(chapterData);
          setError(null);
          setSuccess(null);
        }
      } catch (err) {
        setError('Failed to reset form');
      }
    };
    
    fetchChapter();
  };

  if (initialLoad) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Update Chapter</h2>
      </div>
      
      <div className="card-body">
        <form onSubmit={handleSubmit} className="field-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-grid">
            <div className="form-group">
              <label>Chapter Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="amount-input"
              />
            </div>
            
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="amount-input"
                rows="4"
              />
            </div>
          </div>
          
          <div className="button-group" style={{ marginTop: '24px' }}>
            <button 
              type="submit" 
              className="primary-btn"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Chapter'}
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