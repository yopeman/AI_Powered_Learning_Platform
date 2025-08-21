import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { Link, useParams } from "react-router-dom";

export default function SubscriptionFields() {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const { id } = useParams();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/fields/${id}/subscriptions`);
        const data = response.data.data;
        setUsers(data.users);
        setSubscriptions(data.subscriptions);
        setField(data.field);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load subscriptions');
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, [id]);

  const totalPages = Math.ceil(users.length / limit);
  const paginatedUsers = users.slice((page - 1) * limit, page * limit);
  const paginatedSubscriptions = subscriptions.slice((page - 1) * limit, page * limit);
  
  const nextPage = () => setPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setPage(p => Math.max(p - 1, 1));

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-row">
          <h2 className="card-title">
            {field ? `${field.title} Subscriptions` : 'Field Subscriptions'}
          </h2>
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
          <>
            {field && (
              <div className="field-summary">
                <div className="field-title">{field.title}</div>
                <div className="field-description">{field.description}</div>
              </div>
            )}
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Topics Learned</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, index) => {
                    const subscription = paginatedSubscriptions[index];
                    return (
                      <tr key={user.id}>
                        <td>
                          <div className="user-info">
                            <div className="user-name">{user.first_name} {user.last_name}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        </td>
                        <td>
                          {subscription?.learned_topic_numbers || 0}
                        </td>
                        <td>
                          <Link 
                            to={`/users/get/${user.id}`} 
                            className="action-btn view-btn"
                          >
                            View Student
                          </Link>
                          <Link>&nbsp; &nbsp;</Link>
                          <Link 
                            to={`/fields/subscription/delete/${subscription.id}`} 
                            className="action-btn delete-btn"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}