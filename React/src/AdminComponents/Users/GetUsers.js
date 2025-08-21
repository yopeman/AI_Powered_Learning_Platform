import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { Link } from "react-router-dom";
import Loader from '../Loader';

export default function GetUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 15;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/users");
        setUsers(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = () => filteredUsers.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < filteredUsers.length) {
      setOffset(prev => prev + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(prev => Math.max(prev - limit, 0));
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-row">
          <h1 className="card-title">User List</h1>
          <div className="pagination-controls">
            <span>
              Showing {Math.min(offset + 1, filteredUsers.length)}-
              {Math.min(offset + limit, filteredUsers.length)} of {filteredUsers.length}
            </span>
            <button onClick={handlePreviousPage} disabled={offset === 0}>&lt;</button>
            <button onClick={handleNextPage} disabled={offset + limit >= filteredUsers.length}>&gt;</button>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        <div className="form-group">
          <input
            type="text"
            placeholder="Search users..."
            className="amount-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOffset(0);
            }}
          />
        </div>
        
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers().length > 0 ? (
                paginatedUsers().map((user) => (
                  <tr key={user.id}>
                    <td className="user-info">
                      <div className="user-name">{user.first_name} {user.last_name}</div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="actions-cell">
                      <Link to={`/users/get/${user.id}`} className="action-btn view-btn">
                        View
                      </Link>
                      <Link to={`/users/update/${user.id}`} className="action-btn edit-btn">
                        Edit
                      </Link>
                      <Link to={`/users/delete/${user.id}`} className="action-btn delete-btn">
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}