import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import Loader from '../Loader';
import AnalyticsCard from './AnalyticsCard';

export default function FeedbackAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/feedbacks`);
        if (response.data.success) {
          setAnalytic(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch analytic data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytic();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!analytic) return <div className="error-message">Analytic not found</div>;

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#f59e0b' : '#d1d5db' }}>
          ★
        </span>
      );
    }
    return <div className="rating-stars">{stars}</div>;
  };

  const analyticsItems = [
    { label: 'Total Feedbacks', value: analytic.totalFeedbacks },
    { 
      label: 'Average Rating', 
      value: (
        <div className="rating-display">
          {renderStars(Math.round(analytic.averageRating))}
          <span className="rating-value">({analytic.averageRating.toFixed(1)})</span>
        </div>
      ) 
    },
    { label: 'Positive Feedbacks', value: analytic.positiveFeedbacks || 'N/A' },
    { label: 'Feedback Response Rate', value: analytic.responseRate || 'N/A' }
  ];

  return <AnalyticsCard title="Feedback Analytics" items={analyticsItems} />;
}