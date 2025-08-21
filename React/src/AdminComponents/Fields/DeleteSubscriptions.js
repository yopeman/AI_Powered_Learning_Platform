import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function DeleteSubscriptions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await api.get(`/subscriptions/${id}`);
        setSubscription(response.data.data);
      } catch (err) {
        setError('Failed to load subscription details');
      }
    };
    fetchSubscription();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/subscriptions/${id}`);
      if (response.data.success) {
        setSuccess('Subscription deleted successfully');
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
        <h2 className="card-title">Delete Subscription</h2>
      </div>
      
      <div className="card-body">
        {error ? (
          <div className="error-message">{error}</div>
        ) : success ? (
          <div className="success-message">{success}</div>
        ) : subscription ? (
          <div className="confirmation-dialog">
            <div className="confirmation-text">
              Are you sure you want to delete this subscription record?
            </div>
            <div className="certificate-info">
              <p><strong>userId:</strong> {subscription.userId}</p>
              <p><strong>fieldId:</strong> {subscription.fieldId}</p>
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