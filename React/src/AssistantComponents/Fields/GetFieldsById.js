import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {api} from "../../Shared/Utilities/api";

export default function GetFieldsById() {
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchField = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/fields/${id}`);
        if (response.data.success) {
          setField(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch field');
      } finally {
        setLoading(false);
      }
    };

    fetchField();
  }, [id]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return <span className="status-badge active">Active</span>;
      default: return <span className="status-badge expired">Inactive</span>;
    }
  };

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  if (error) return (
    <div className="error-message">{error}</div>
  );

  if (!field) return (
    <div className="error-message">Field not found</div>
  );

  return (
    <div className="card">
      <div className="field-header">
        <div>
          <h2 className="field-title">{field.title}</h2>
          <div className="field-meta">
            <span>{field.years_length} year(s)</span>
            <span>•</span>
            <span>
              {field.isFree ? 
                <span className="free-access">Free Access</span> : 
                <span className="premium-access">Premium Access</span>
              }
            </span>
            <span>•</span>
            <span>{field.number_of_free_topics} free topics</span>
          </div>
        </div>
        <Link to="/fields/me" className="primary-btn">
          &larr; Back to My Fields
        </Link>
      </div>
      
      <div className="card-body">
        <div className="field-summary">
          <h3 className="section-title">Description</h3>
          <p className="description-text">{field.description}</p>
        </div>
        
        <div className="detail-grid">
            
          <div className="detail-item">
            <div className="detail-label">Status</div>
            <div className="detail-value">{getStatusBadge(field.status)}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Created At</div>
            <div className="detail-value">
              {new Date(field.createdAt).toLocaleString()}
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Updated At</div>
            <div className="detail-value">
              {new Date(field.updatedAt).toLocaleString()}
            </div>
          </div>
        
        </div>
      </div>
    </div>
  )
}