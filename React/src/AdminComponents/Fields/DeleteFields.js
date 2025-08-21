import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function DeleteFields() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [field, setField] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchField = async () => {
      try {
        const response = await api.get(`/fields/${id}`);
        setField(response.data.data);
      } catch (err) {
        setError('Failed to load field details');
      }
    };
    fetchField();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/fields/${id}`);
      if (response.data.success) {
        setSuccess('Field deleted successfully');
        setTimeout(() => navigate('/fields/get'), 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Deletion failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Delete Field</h2>
      </div>
      
      <div className="card-body">
        {error ? (
          <div className="error-message">{error}</div>
        ) : success ? (
          <div className="success-message">{success}</div>
        ) : field ? (
          <div className="confirmation-dialog">
            <div className="confirmation-text">
              Are you sure you want to delete this field?
            </div>
            
            <div className="field-info">
              <div className="field-title">{field.title}</div>
              <div className="field-description">{field.description}</div>
              <div className="field-meta">
                <span>Duration: {field.years_length} years</span>
                <span>Free Topics: {field.number_of_free_topics}</span>
                <span>Access: {field.isFree ? 'Free' : 'Premium'}</span>
                <span>Status: {field.status}</span>
              </div>
            </div>
            
            <div className="button-group">
              <button 
                onClick={handleDelete} 
                className="delete-btn"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
              <button 
                onClick={() => navigate(-1)} 
                className="secondary-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
}