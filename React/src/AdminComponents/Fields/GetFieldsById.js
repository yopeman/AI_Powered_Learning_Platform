import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function GetFieldsById() {
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchField = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/fields/${id}`);
        setField(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch field');
      } finally {
        setLoading(false);
      }
    };
    fetchField();
  }, [id]);

  const getAccessType = (isFree) => {
    return isFree ? (
      <span className="free-access">Free Access</span>
    ) : (
      <span className="premium-access">Premium Access</span>
    );
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return <span className="status-badge active">Active</span>;
      default: return <span className="status-badge expired">Inactive</span>;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Field Details</h2>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : field ? (
          <div className="detail-view">
            <div className="field-header">
              <h3 className="field-title">{field.title}</h3>
              <div className="field-access">
                {getAccessType(field.isFree)}
              </div>
            </div>
            
            <div className="detail-section">
              <div className="detail-label">Description</div>
              <div className="detail-value description-text">{field.description}</div>
            </div>
            
            <div className="detail-grid">
              <DetailItem label="Duration" value={`${field.years_length} years`} />
              <DetailItem label="Free Topics" value={field.number_of_free_topics} />
              <DetailItem label="Status" value={getStatusBadge(field.status)} />
              <DetailItem label="Created" value={new Date(field.createdAt).toLocaleDateString()} />
              <DetailItem label="Last Updated" value={new Date(field.updatedAt).toLocaleDateString()} />
            </div>
            
            <div className="action-group">
              <Link 
                to={`/fields/subscription/${field.id}`} 
                className="action-btn status-btn"
              >
                View Subscriptions
              </Link>
              <Link 
                to={`/fields/update/${field.id}`} 
                className="action-btn edit-btn"
              >
                Edit Field
              </Link>
              <Link 
                to={`/fields/delete/${field.id}`} 
                className="action-btn delete-btn"
              >
                Delete Field
              </Link>
            </div>
          </div>
        ) : (
          <div className="error-message">Field not found</div>
        )}
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <div className="detail-label">{label}</div>
      <div className="detail-value">{value || '-'}</div>
    </div>
  );
}