import React, {useEffect, useState} from 'react'
import {api} from "../../Shared/Utilities/api";
import {Link} from "react-router-dom";

export default function GetMyFields() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;
  const totalPages = Math.ceil(fields.length / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/assistants/me/fields");
        setFields(response.data.data.fields);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load fields');
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, []);

  const paginatedFields = () => fields.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < fields.length) {
      setOffset(prev => prev + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(prev => Math.max(prev - limit, 0));
    }
  };

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


  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  if (error) return (
    <div className="error-message">{error}</div>
  );

  return (
    <div className="card">
      <div className="card-header-row">
        <h2 className="card-title">My Fields</h2>
        <div className="pagination-controls">
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={handlePreviousPage} 
            disabled={offset === 0}
            className="secondary-btn"
          >
            &lt; Previous
          </button>
          <button 
            onClick={handleNextPage} 
            disabled={offset + limit >= fields.length}
            className="secondary-btn"
          >
            Next &gt;
          </button>
        </div>
      </div>
      
      <div className="card-body">
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
              {paginatedFields().map((field) => (
                <tr key={field.id}>
                    <td>{field.title}</td>
                    <td>{getAccessType(field.isFree)}</td>
                    <td>{getStatusBadge(field.status)}</td>
                    <td>{field.years_length} years</td>
                    <td>{field.number_of_free_topics}</td>
                  <td className="actions-cell">
                    <Link 
                      to={`/fields/get/${field.id}`} 
                      className="action-btn view-btn"
                    >
                      Details
                    </Link>
                    <Link 
                      to={`/courses/list/${field.id}`} 
                      className="action-btn edit-btn"
                    >
                      Courses
                    </Link>
                    <Link 
                      to={`/courses/create/${field.id}`} 
                      className="action-btn secondary-btn"
                    >
                      Create New Course
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {fields.length === 0 && (
            <div className="empty-state">
              <p>No fields found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}