import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function DeleteCourses() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        if (response.data.success) {
          setCourse(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(`/courses/${id}`);
      if (response.data.success) {
        setSuccess('Course deleted successfully!');
        setTimeout(() => navigate('/courses'), 2000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete course');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Delete Course</h2>
      </div>
      
      <div className="card-body">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        {!success && course && (
          <div className="confirmation-dialog">
            <div className="confirmation-text">
              <p>Are you sure you want to delete this course?</p>
              <p>This action cannot be undone and will permanently remove:</p>
            </div>
            
            <div className="certificate-info">
              <h3>{course.title}</h3>
              <p>Year {course.year} • Semester {course.semester}</p>
              <p>{course.chapters_length} chapters</p>
            </div>
            
            <div className="action-group">
              <button 
                onClick={handleDelete} 
                disabled={loading}
                className="delete-btn"
              >
                {loading ? 'Deleting...' : 'Yes, Delete Course'}
              </button>
              <button 
                onClick={() => navigate(`/courses/get/${id}`)} 
                className="secondary-btn"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}