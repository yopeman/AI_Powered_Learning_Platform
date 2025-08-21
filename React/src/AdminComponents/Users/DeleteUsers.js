import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function DeleteUsers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data.data);
      } catch (err) {
        setError('Failed to load user details');
      }
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await api.delete(`/users/${id}`);
      if (response.data.success) {
        setSuccess('User deleted successfully');
        setTimeout(() => navigate('/users/get'), 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Deletion failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Delete User</h2>
      </div>
      
      <div className="card-body">
        {error ? (
          <div className="error-message">{error}</div>
        ) : success ? (
          <div className="success-message">{success}</div>
        ) : user ? (
          <div className="confirmation-dialog">
            <div className="confirmation-text">
              Are you sure you want to delete this user record?
            </div>
            <div className="certificate-info">
              <p><strong>Username:</strong> {user.first_name} {user.first_last}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone Number:</strong> {user.phone}</p>
            </div>
            <div className="button-group">
              <button 
                onClick={handleDelete} 
                className="delete-btn"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
              <button 
                onClick={() => navigate(-1)} 
                className="secondary-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
}