import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { useParams } from "react-router-dom";

export default function UpdateAssistants() {
  const [formData, setFormData] = useState({ userId: '', fieldId: '' });
  const [users, setUsers] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [assistantRes, usersRes, fieldsRes] = await Promise.all([
          api.get(`/assistants/${id}`),
          api.get("/users"),
          api.get("/fields"),
        ]);
        setFormData(assistantRes.data.data);
        setUsers(usersRes.data.data);
        setFields(fieldsRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put(`/assistants/${id}`, formData);
      if (response.data.success) {
        setSuccess('Assistant updated successfully');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Update Assistant Assignment</h2>
      </div>
      
      <div className="card-body">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <form onSubmit={handleSubmit} className="assistant-form">
            {success && <div className="success-message">{success}</div>}
            
            <div className="form-group">
              <label htmlFor="user">Select User</label>
              <select 
                id="user"
                name="userId" 
                value={formData.userId} 
                onChange={handleChange} 
                required
                className="form-select"
              >
                <option value="">Choose a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="field">Assign to Field</label>
              <select 
                id="field"
                name="fieldId" 
                value={formData.fieldId} 
                onChange={handleChange} 
                required
                className="form-select"
              >
                <option value="">Select a field</option>
                {fields.map(field => (
                  <option key={field.id} value={field.id}>
                    {field.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="button-group">
              <button 
                type="submit" 
                className="primary-btn"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Assignment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}