import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function GetAssistantsById() {
  const [assistant, setAssistant] = useState(null);
  const [user, setUser] = useState(null);
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const asstRes = await api.get(`/assistants/${id}`);
        setAssistant(asstRes.data.data);
        
        const userRes = await api.get(`/users/${asstRes.data.data.userId}`);
        setUser(userRes.data.data);
        
        const fieldRes = await api.get(`/fields/${asstRes.data.data.fieldId}`);
        setField(fieldRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Assistant Details</h2>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : assistant && user && field ? (
          <div className="detail-view">
            <div className="detail-section">
              <h3 className="section-title">User Information</h3>
              <div className="detail-grid">
                <DetailItem label="Full Name" value={`${user.first_name} ${user.last_name}`} />
                <DetailItem label="Email" value={user.email} />
                <DetailItem label="Phone" value={user.phone} />
                <DetailItem label="Role" value={user.role} />
                <DetailItem label="Created" value={new Date(user.createdAt).toLocaleDateString()} />
                <DetailItem label="Last Updated" value={new Date(user.updatedAt).toLocaleDateString()} />
              </div>
              <div className="action-group">
                <Link to={`/users/update/${user.id}`} className="action-btn edit-btn">Edit User</Link>
                <Link to={`/users/delete/${user.id}`} className="action-btn delete-btn">Delete User</Link>
              </div>
            </div>
            
            <div className="detail-section">
              <h3 className="section-title">Field Information</h3>
              <div className="detail-grid">
                <DetailItem label="Title" value={field.title} />
                <DetailItem label="Description" value={field.description} />
                <DetailItem label="Duration" value={`${field.years_length} years`} />
                <DetailItem label="Free Access" value={field.isFree ? 'Yes' : 'No'} />
                <DetailItem label="Free Topics" value={field.number_of_free_topics} />
                <DetailItem label="Created" value={new Date(field.createdAt).toLocaleDateString()} />
              </div>
              <div className="action-group">
                <Link to={`/fields/subscription/${field.id}`} className="action-btn view-btn">Subscription</Link>
                <Link to={`/fields/update/${field.id}`} className="action-btn edit-btn">Edit Field</Link>
                <Link to={`/fields/delete/${field.id}`} className="action-btn delete-btn">Delete Field</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="error-message">Assistant not found</div>
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