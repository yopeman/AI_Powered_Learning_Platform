import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function DeleteAssistants() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [assistant, setAssistant] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssistant = async () => {
      try {
        const response = await api.get(`/assistants/${id}`);
        setAssistant(response.data.data);
      } catch (err) {
        setError('Failed to load assistant details');
      }
    };
    fetchAssistant();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/assistants/${id}`);
      if (response.data.success) {
        setSuccess('Assistant deleted successfully');
        setTimeout(() => navigate('/assistants/get'), 1500);
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
        <h2 className="card-title">Delete Assistant</h2>
      </div>
      
      <div className="card-body">
        {error ? (
          <div className="error-message">{error}</div>
        ) : success ? (
          <div className="success-message">{success}</div>
        ) : assistant ? (
          <div className="confirmation-dialog">
            <div className="confirmation-text">
              Are you sure you want to delete this assistant assignment?
            </div>
            <div className="assistant-info">
              <p><strong>User:</strong> {assistant.userId}</p>
              <p><strong>Field:</strong> {assistant.fieldId}</p>
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