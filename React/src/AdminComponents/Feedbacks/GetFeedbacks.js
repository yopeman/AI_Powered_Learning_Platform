import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { Link } from "react-router-dom";

export default function GetFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [feedbacksRes, usersRes] = await Promise.all([
          api.get("/feedbacks"),
          api.get("/users"),
        ]);
        setFeedbacks(feedbacksRes.data.data);
        setUsers(usersRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getUserById = (id) => users.find(user => user.id === id);
  
  const totalPages = Math.ceil(feedbacks.length / limit);
  const paginatedData = feedbacks.slice((page - 1) * limit, page * limit);
  
  const nextPage = () => setPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setPage(p => Math.max(p - 1, 1));

  const renderRating = (rating) => {
    return (
      <div className="rating-display">
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        <span className="rating-value">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-row">
          <h2 className="card-title">User Feedback</h2>
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
                  <th>User</th>
                  <th>Rating</th>
                  <th>Preview</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(feedback => {
                  const user = getUserById(feedback.userId);
                  const preview = feedback.content.length > 50 
                    ? feedback.content.substring(0, 50) + '...' 
                    : feedback.content;
                  
                  return (
                    <tr key={feedback.id}>
                      <td>
                        {user ? (
                          <div className="user-info">
                            <div className="user-name">{user.first_name} {user.last_name}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        ) : 'Unknown User'}
                      </td>
                      <td>
                        {renderRating(feedback.rating)}
                      </td>
                      <td className="feedback-preview">
                        {preview}
                      </td>
                      <td className="actions-cell">
                        <Link 
                          to={`/feedbacks/get/${feedback.id}`} 
                          className="action-btn view-btn"
                        >
                          Details
                        </Link>
                        <Link 
                          to={`/feedbacks/delete/${feedback.id}`} 
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
        )}
      </div>
    </div>
  );
}