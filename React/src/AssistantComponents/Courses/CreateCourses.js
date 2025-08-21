import React, { useState } from 'react';
import { api } from '../../Shared/Utilities/api';
import {useParams} from "react-router-dom";

export default function CreateCourses() {
  const { fieldId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fieldId: fieldId,
    year: 1,
    semester: 1,
    chapters_length: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/courses', formData);
      if (response.data.success) {
        setSuccess('Course created successfully!');
        setFormData({
          title: '',
          description: '',
          fieldId: fieldId,
          year: 1,
          semester: 1,
          chapters_length: 1,
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Course creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      fieldId: fieldId,
      year: 1,
      semester: 1,
      chapters_length: 1,
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Create New Course</h2>
      </div>
      
      <div className="card-body">
        <form onSubmit={handleSubmit} className="field-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-grid">
            <div className="form-group">
              <label>Course Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="amount-input"
                placeholder="Enter course title"
              />
            </div>
            
            <div className="form-group">
              <label>Year *</label>
              <input
                type="number"
                name="year"
                min="1"
                max="10"
                value={formData.year}
                onChange={handleChange}
                required
                className="amount-input"
              />
            </div>
            
            <div className="form-group">
              <label>Semester *</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="form-select"
              >
                <option value="1">Semester I</option>
                <option value="2">Semester II</option>
                <option value="3">Semester III</option>
                <option value="4">Semester IV</option>
                <option value="5">Semester V</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Chapters Length *</label>
              <input
                type="number"
                name="chapters_length"
                min="1"
                max="50"
                value={formData.chapters_length}
                onChange={handleChange}
                required
                className="amount-input"
              />
            </div>
            
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="amount-input"
                rows="4"
                placeholder="Enter course description"
              />
            </div>
          </div>
          
          <div className="button-group" style={{ marginTop: '24px' }}>
            <button 
              type="submit" 
              className="primary-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
            <button 
              type="button" 
              className="secondary-btn"
              onClick={handleReset}
              disabled={loading}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const InputField = ({ label, type, name, value, onChange, required }) => (
  <div className="form-group">
    <label>{label} {required && '*'}</label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="amount-input"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="amount-input"
      />
    )}
  </div>
);

export const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="form-group">
    <label>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="form-select"
    >
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </select>
  </div>
);