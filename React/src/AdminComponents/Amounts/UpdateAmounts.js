import React, {useEffect, useState} from 'react'
import {api} from "../../Shared/Utilities/api";

export default function UpdateAmounts() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [initialValue, setInitialValue] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const response = await api.get('/amounts');
        setAmount(response.data.data.amount);
        setInitialValue(response.data.data.amount);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAmount();
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setIsDirty(e.target.value !== initialValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDirty) return;
    
    setLoading(true);
    try {
      const response = await api.put('/amounts', { amount });
      if (response.data.success) {
        setSuccess('Amount successfully updated');
        setInitialValue(amount);
        setIsDirty(false);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Amount update failed');
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setAmount(initialValue);
    setError(null);
    setSuccess(null);
    setIsDirty(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Update Amount</h2>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <form onSubmit={handleSubmit} className="amount-form">
            {success && <div className="success-message">{success}</div>}
            
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <div className="input-container">
                <span className="currency-symbol">$</span>
                <input
                  id="amount"
                  type="number" 
                  value={amount} 
                  onChange={handleAmountChange}
                  min="0"
                  step="0.01"
                  placeholder="Enter amount"
                  className="amount-input"
                  style={{ marginLeft: 8 }}
                />
              </div>
            </div>
            
            <div className="button-group">
              <button 
                type="submit" 
                className="primary-btn"
                disabled={!isDirty || loading}
              >
                {loading ? 'Updating...' : 'Update Amount'}
              </button>
              <button 
                type="button" 
                onClick={handleReset} 
                className="secondary-btn"
                disabled={!isDirty}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}