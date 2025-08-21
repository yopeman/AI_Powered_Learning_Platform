import React, { useEffect, useState } from 'react';
import { api, authApi } from "../../Shared/Utilities/api";
import { Link } from "react-router-dom";

export default function GetCertificates() {
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resultsRes, usersRes] = await Promise.all([
          api.get("/certifications/results"),
          api.get("/users"),
        ]);
        setResults(resultsRes.data.data);
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
  
  const totalPages = Math.ceil(results.length / limit);
  const paginatedData = results.slice((page - 1) * limit, page * limit);
  
  const nextPage = () => setPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setPage(p => Math.max(p - 1, 1));

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-row">
          <h2 className="card-title">Certificate Records</h2>
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
                  <th>Score</th>
                  <th>Certificate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(result => {
                  const user = getUserById(result.userId);
                  return (
                    <tr key={result.id}>
                      <td>
                        {user ? (
                          <div className="user-info">
                            <div className="user-name">{user.first_name} {user.last_name}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        ) : 'Unknown User'}
                      </td>
                      <td>
                        <div className="score-badge">
                          {result.value}%
                        </div>
                      </td>
                      <td>
                        <a 
                          href={`${authApi.getUri()}/results/${result.id}/link`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="action-btn view-btn certificate-link"
                        >
                          View Certificate
                        </a>
                      </td>
                      <td className="actions-cell">
                        <Link 
                          to={`/certificates/delete/${result.id}`} 
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