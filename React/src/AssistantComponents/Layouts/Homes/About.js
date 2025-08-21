import React, { useState } from 'react';
import { api } from "../../../Shared/Utilities/api";
import { FiStar } from 'react-icons/fi';

export default function About() {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(3);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.post('/feedbacks', { content, rating });
      if (response.data.success) {
        setSuccess('Thank you for your feedback!');
        setContent('');
        setRating(3);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setContent('');
    setRating(3);
    setError('');
    setSuccess('');
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map(star => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: star <= rating ? '#f59e0b' : '#e5e7eb',
          padding: '5px'
        }}
      >
        <FiStar fill={star <= rating ? '#f59e0b' : 'none'} />
      </button>
    ));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">About AiPLP</h1>
      </div>
      <div className="card-body">
        <div className="detail-view">
          <div className="detail-section">
            <h2>Our Learning Platform</h2>
            <p>
              AiPLP is an innovative learning platform designed to provide high-quality education
              through artificial intelligence-powered assistants. Our mission is to make education
              accessible, personalized, and effective for everyone.
            </p>

            <div style={{ margin: '30px 0' }}>
              <h3>Features:</h3>
              <ul>
                <li>Personalized learning paths</li>
                <li>AI-powered teaching assistants</li>
                <li>Interactive learning materials</li>
                <li>Progress tracking and analytics</li>
                <li>Industry-recognized certifications</li>
              </ul>
            </div>
          </div>

          <div className="detail-section">
            <h2>Share Your Feedback</h2>
            <p>We'd love to hear about your experience with our platform.</p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
              <label>Your Feedback</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className="amount-input"
                rows="4"
                required
                placeholder="Share your thoughts about our platform..."
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <div style={{ display: 'flex' }}>
                {renderStars()}
                <span style={{ marginLeft: '10px', alignSelf: 'center' }}>
                  {rating} star{rating !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="button-group">
              <button
                type="button"
                className="primary-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}