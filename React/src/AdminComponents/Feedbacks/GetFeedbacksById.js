import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function GetFeedbacksById() {
  const [feedback, setFeedback] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const feedbackRes = await api.get(`/feedbacks/${id}`);
        setFeedback(feedbackRes.data.data);
        
        const userRes = await api.get(`/users/${feedbackRes.data.data.userId}`);
        setUser(userRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
        <h2 className="card-title">Feedback Details</h2>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : feedback && user ? (
          <div className="detail-view">
            <div className="detail-section">
              <h3 className="section-title">User Information</h3>
              <div className="detail-grid">
                <DetailItem label="Full Name" value={`${user.first_name} ${user.last_name}`} />
                <DetailItem label="Email" value={user.email} />
                <DetailItem label="Phone" value={user.phone} />
                <DetailItem label="Role" value={user.role} />
              </div>
              <div className="action-group">
                <Link to={`/users/update/${user.id}`} className="action-btn edit-btn">Edit User</Link>
                <Link to={`/users/delete/${user.id}`} className="action-btn delete-btn">Delete User</Link>
              </div>
            </div>
            
            <div className="detail-section">
              <h3 className="section-title">Feedback Details</h3>
              <div className="feedback-rating">
                {renderRating(feedback.rating)}
              </div>
              <div className="feedback-content">
                <div className="detail-label">Feedback</div>
                <div className="feedback-text">{feedback.content}</div>
              </div>
              <div className="detail-grid">
                <DetailItem label="Created" value={new Date(feedback.createdAt).toLocaleString()} />
                <DetailItem label="Last Updated" value={new Date(feedback.updatedAt).toLocaleString()} />
              </div>
            </div>
          </div>
        ) : (
          <div className="error-message">Feedback not found</div>
        )}
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <div className="detail-label">{label}</div>
      <div className="detail-value">{value || '-'}</div>
    </div>
  );
}