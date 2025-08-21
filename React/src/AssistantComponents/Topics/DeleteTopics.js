import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function DeleteTopics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [topic, setTopic] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await api.get(`/topics/${id}`);
        if (response.data.success) {
          setTopic(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch topic');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(`/topics/${id}`);
      if (response.data.success) {
        setSuccess('Topic deleted successfully!');
        setTimeout(() => navigate(-1), 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete topic');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Delete Topic</h2>
      </div>
      
      <div className="card-body">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        {!success && topic && (
          <div className="confirmation-dialog">
            <div className="confirmation-text">
              <p>Are you sure you want to delete this topic?</p>
              <p>This action cannot be undone and will permanently remove:</p>
            </div>
            
            <div className="certificate-info">
              <h3>{topic.title}</h3>
              <p>Belongs to chapter: {topic.chapterId}</p>
            </div>
            
            <div className="action-group">
              <button 
                onClick={handleDelete} 
                disabled={loading}
                className="delete-btn"
              >
                {loading ? 'Deleting...' : 'Yes, Delete Topic'}
              </button>
              <button 
                onClick={() => navigate(`/topics/get/${id}`)} 
                className="secondary-btn"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}