import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { Link } from "react-router-dom";

export default function GetAssistants() {
  const [assistants, setAssistants] = useState([]);
  const [users, setUsers] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [assistantsRes, usersRes, fieldsRes] = await Promise.all([
          api.get("/assistants"),
          api.get("/users"),
          api.get("/fields"),
        ]);
        setAssistants(assistantsRes.data.data);
        setUsers(usersRes.data.data);
        setFields(fieldsRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getUserById = (id) => users.find(u => u.id === id);
  const getFieldById = (id) => fields.find(f => f.id === id);

  const totalPages = Math.ceil(assistants.length / limit);
  const paginatedData = assistants.slice((page - 1) * limit, page * limit);

  const nextPage = () => setPage(p => Math.min(p + 1, totalPages));
  const prevPage = () => setPage(p => Math.max(p - 1, 1));

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-row">
          <h2 className="card-title">Field Assistants</h2>
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
                  <th>Field</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(asst => {
                  const user = getUserById(asst.userId);
                  const field = getFieldById(asst.fieldId);
                  return (
                    <tr key={asst.id}>
                      <td>
                        {user ? (
                          <div className="user-info">
                            <div className="user-name">{user.first_name} {user.last_name}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        ) : 'Unknown'}
                      </td>
                      <td>{field ? field.title : 'Unknown'}</td>
                      <td className="actions-cell">
                        <Link to={`/assistants/get/${asst.id}`} className="action-btn view-btn">Details</Link>
                        <Link to={`/assistants/update/${asst.id}`} className="action-btn edit-btn">Edit</Link>
                        <Link to={`/assistants/delete/${asst.id}`} className="action-btn delete-btn">Delete</Link>
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