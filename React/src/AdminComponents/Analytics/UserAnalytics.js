import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import Loader from '../Loader';
import AnalyticsCard from './AnalyticsCard';

export default function UserAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/users`);
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
    { label: 'Total Users', value: analytic.totalUsers || 0 },
    { label: 'Assistants', value: analytic.assistant || 0 },
    { label: 'Students', value: analytic.student || 0 },
    { label: 'Admins', value: analytic.admin || 0 },
    { label: 'Active Users', value: analytic.activeUsers || 'N/A' },
    { label: 'New Users (7d)', value: analytic.newUsers7d || 'N/A' }
  ];

  return <AnalyticsCard title="User Analytics" items={analyticsItems} />;
}