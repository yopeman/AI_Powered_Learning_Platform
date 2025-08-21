import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import Loader from '../Loader';
import AnalyticsCard from './AnalyticsCard';

export default function PaymentAnalytics() {
  const [analytic, setAnalytic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/analytics/payments`);
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
    { label: 'Total Payments', value: analytic.totalPayments },
    { label: 'Completed Payments', value: analytic.completedPayments },
    { label: 'Pending Payments', value: analytic.pendingPayments },
    { label: 'Failed Payments', value: analytic.failedPayments },
    { label: 'Total Revenue', value: `$${analytic.totalRevenue}` },
    { label: 'Avg Payment Value', value: `$${analytic.avgPaymentValue?.toFixed(2) || 'N/A'}` }
  ];

  return <AnalyticsCard title="Payment Analytics" items={analyticsItems} />;
}