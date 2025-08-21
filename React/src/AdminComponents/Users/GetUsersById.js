import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from '../Loader';

export default function GetUsersById() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/users/${id}`);
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!user) return <div className="error-message">User not found</div>;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-row">
          <h1 className="card-title">User Details</h1>
          <button 
            className="secondary-btn"
            onClick={() => navigate('/users/get')}
          >
            &larr; Back to Users
          </button>
        </div>
      </div>
      
      <div className="card-body">
        <div className="detail-view">
          <div className="detail-section">
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label">Full Name</div>
                <div className="detail-value">{user.first_name} {user.last_name}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Email</div>
                <div className="detail-value">{user.email}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Phone Number</div>
                <div className="detail-value">{user.phone || 'N/A'}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Role</div>
                <div className="detail-value">{user.role}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Created At</div>
                <div className="detail-value">{new Date(user.createdAt).toLocaleString()}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">Updated At</div>
                <div className="detail-value">{new Date(user.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <div className="action-group">
            <Link to={`/users/update/${user.id}`} className="primary-btn">
              Update User
            </Link>
            <Link to={`/users/delete/${user.id}`} className="delete-btn">
              Delete User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}