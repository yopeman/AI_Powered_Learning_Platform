import React, { useEffect, useState } from 'react';
import { api } from '../../Shared/Utilities/api';

export default function GetAmounts() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const response = await api.get('/amounts');
        setAmount(response.data.data.amount);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAmount();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Current Amount</h2>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="amount-display">
            <div className="amount-value">${amount.toLocaleString()}</div>
            <div className="amount-label">Current Fee Amounts</div>
          </div>
        )}
      </div>
    </div>
  );
}