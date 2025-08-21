import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from "../../Shared/Utilities/api";
import { InputField, SelectField } from './CreateCourses';

export default function UpdateCourses() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: 1,
    semester: 1,
    chapters_length: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setInitialLoad(true);
      setError(null);

      try {
        const response = await api.get(`/courses/${id}`);
        if (response.data.success) {
          const { fieldId, ...courseData } = response.data.data;
          setFormData(courseData);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch course');
      } finally {
        setInitialLoad(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.put(`/courses/${id}`, formData);
      if (response.data.success) {
        setSuccess('Course updated successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Course update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        if (response.data.success) {
          const { fieldId, ...courseData } = response.data.data;
          setFormData(courseData);
          setSuccess(null);
          setError(null);
        }
      } catch (err) {
        setError('Failed to reset form');
      }
    };
    
    fetchCourse();
  };

  if (initialLoad) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Update Course</h2>
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
              />
            </div>
          </div>
          
          <div className="button-group" style={{ marginTop: '24px' }}>
            <button 
              type="submit" 
              className="primary-btn"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Course'}
            </button>
            <button 
              type="button" 
              className="secondary-btn"
              onClick={handleReset}
              disabled={loading}
            >
              Reset Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}