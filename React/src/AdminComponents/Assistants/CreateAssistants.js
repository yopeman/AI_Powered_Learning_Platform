import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";

export default function CreateAssistants() {
  const [formData, setFormData] = useState({
    userId: '',
    fieldId: '',
  });
  const [users, setUsers] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersResponse, fieldsResponse] = await Promise.all([
          api.get("/users"),
          api.get("/fields"),
        ]);
        setUsers(usersResponse.data.data);
        setFields(fieldsResponse.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/assistants', formData);
      if (response.data.success) {
        setSuccess('Assistant created successfully');
        setFormData({ userId: '', fieldId: '' });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Create New Assistant</h2>
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
                {loading ? 'Creating...' : 'Create Assistant'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}