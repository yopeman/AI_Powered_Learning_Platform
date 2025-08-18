import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import Loader from '../Loader';
import AnalyticsCard from './AnalyticsCard';

export default function CertificationAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/certifications`);
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
    { label: 'Total Results', value: analytic.totalResults },
    { 
      label: 'Average Score', 
      value: (
        <div className="score-badge">
          {analytic.averageScore?.toFixed(1) || 0}%
        </div>
      ) 
    },
    { label: 'Pass Rate', value: analytic.passRate || 'N/A' },
    { label: 'Top Performing Field', value: analytic.topField || 'N/A' }
  ];

  return <AnalyticsCard title="Certification Analytics" items={analyticsItems} />;
}