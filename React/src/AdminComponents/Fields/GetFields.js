import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { Link } from "react-router-dom";

export default function GetFields() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      try {
        const response = await api.get("/fields");
        setFields(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load fields');
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, []);

  const totalPages = Math.ceil(fields.length / limit);
  const paginatedData = fields.slice((page - 1) * limit, page * limit);
  
  const nextPage = () => setPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setPage(p => Math.max(p - 1, 1));

  const getAccessType = (isFree) => {
    return isFree ? (
      <span className="free-access">Free</span>
    ) : (
      <span className="premium-access">Premium</span>
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
        <div className="card-header-row">
          <h2 className="card-title">Available Fields</h2>
          <div className="pagination-controls">
            <button onClick={prevPage} disabled={page === 1}>&lt;</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={nextPage} disabled={page === totalPages}>&gt;</button>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Access</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>Free Topics</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(field => (
                  <tr key={field.id}>
                    <td>{field.title}</td>
                    <td>{getAccessType(field.isFree)}</td>
                    <td>{getStatusBadge(field.status)}</td>
                    <td>{field.years_length} years</td>
                    <td>{field.number_of_free_topics}</td>
                    <td className="actions-cell">
                      <Link 
                        to={`/fields/subscription/${field.id}`} 
                        className="action-btn secondary-btn"
                      >
                        Subscriptions
                      </Link>
                      <Link 
                        to={`/fields/get/${field.id}`} 
                        className="action-btn view-btn"
                      >
                        View
                      </Link>
                      <Link 
                        to={`/fields/update/${field.id}`} 
                        className="action-btn edit-btn"
                      >
                        Edit
                      </Link>
                      <Link 
                        to={`/fields/delete/${field.id}`} 
                        className="action-btn delete-btn"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}