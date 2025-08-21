import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import Loader from '../Loader';
import AnalyticsCard from './AnalyticsCard';

export default function TopicAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/topics`);
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

  const analyticsItems = [
    { label: 'Total Topics', value: analytic.totalTopics },
    { label: 'Topics With Content', value: analytic.topicsWithContent },
    { label: 'Topics Without Content', value: analytic.topicsWithoutContent },
    { label: 'Popular Topics', value: analytic.popularTopics || 'N/A' },
    { label: 'Avg Topics per Field', value: analytic.avgTopicsPerField || 'N/A' }
  ];

  return <AnalyticsCard title="Topic Analytics" items={analyticsItems} />;
}