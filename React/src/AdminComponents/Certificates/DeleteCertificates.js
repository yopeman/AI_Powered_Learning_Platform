import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function DeleteCertificates() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await api.get(`/certifications/results/${id}`);
        setCertificate(response.data.data);
      } catch (err) {
        setError('Failed to load certificate details');
      }
    };
    fetchCertificate();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/certifications/${id}`);
      if (response.data.success) {
        setSuccess('Certificate deleted successfully');
        setTimeout(() => navigate('/certificates/get'), 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Deletion failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Delete Certificate</h2>
      </div>
      
      <div className="card-body">
        {error ? (
          <div className="error-message">{error}</div>
        ) : success ? (
          <div className="success-message">{success}</div>
        ) : certificate ? (
          <div className="confirmation-dialog">
            <div className="confirmation-text">
              Are you sure you want to delete this certificate record?
            </div>
            <div className="certificate-info">
              <p><strong>User ID:</strong> {certificate.userId}</p>
              <p><strong>Score:</strong> {certificate.value}%</p>
            </div>
            <div className="button-group">
              <button 
                onClick={handleDelete} 
                className="delete-btn"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
              <button 
                onClick={() => navigate(-1)} 
                className="secondary-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
}