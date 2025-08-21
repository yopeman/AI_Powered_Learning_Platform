import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function DeleteFeedbacks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await api.get(`/feedbacks/${id}`);
        setFeedback(response.data.data);
        
        const userResponse = await api.get(`/users/${response.data.data.userId}`);
        setUser(userResponse.data.data);
      } catch (err) {
        setError('Failed to load feedback details');
      }
    };
    fetchFeedback();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/feedbacks/${id}`);
      if (response.data.success) {
        setSuccess('Feedback deleted successfully');
        setTimeout(() => navigate('/feedbacks/get'), 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Deletion failed');
    } finally {
      setLoading(false);
    }
  };

  const renderRating = (rating) => {
    return (
      <div className="rating-display">
        <div className="rating-stars">
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
        <div className="rating-value">({rating}/5)</div>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Delete Feedback</h2>
      </div>
      
      <div className="card-body">
        {error ? (
          <div className="error-message">{error}</div>
        ) : success ? (
          <div className="success-message">{success}</div>
        ) : feedback && user ? (
          <div className="confirmation-dialog">
            <div className="confirmation-text">
              Are you sure you want to delete this feedback?
            </div>
            
            <div className="feedback-preview">
              <div className="user-info">
                <div className="user-name">{user.first_name} {user.last_name}</div>
                <div className="user-email">{user.email}</div>
              </div>
              
              <div className="rating-container">
                {renderRating(feedback.rating)}
              </div>
              
              <div className="feedback-content">
                {feedback.content.length > 100 
                  ? feedback.content.substring(0, 100) + '...' 
                  : feedback.content}
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