import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import Loader from '../Loader';
import AnalyticsCard from './AnalyticsCard';

export default function FieldAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/fields`);
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
    { label: 'Total Fields', value: analytic.totalFields },
    { label: 'Active Fields', value: analytic.activeFields },
    { label: 'Inactive Fields', value: analytic.inactiveFields },
    { label: 'Free Fields', value: analytic.freeFields },
    { label: 'Paid Fields', value: analytic.paidFields },
    { label: 'Most Popular Field', value: analytic.mostPopularField || 'N/A' },
    { label: 'Avg Topics per Field', value: analytic.avgTopicsPerField || 'N/A' }
  ];

  return <AnalyticsCard title="Field Analytics" items={analyticsItems} />;
}