import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {api} from "../../Shared/Utilities/api";

export default function GetCoursesById() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

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

    fetchCourses();
  }, [id]);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  if (error) return (
    <div className="error-message">{error}</div>
  );

  if (!course) return (
    <div className="error-message">Course not found</div>
  );

  return (
    <div className="card">
      <div className="field-header">
        <div>
          <h2 className="field-title">{course.title}</h2>
          <div className="field-meta">
            <span>Year {course.year}</span>
            <span>•</span>
            <span>Semester {course.semester}</span>
            <span>•</span>
            <span>{course.chapters_length} chapters</span>
          </div>
        </div>
        <div className="action-group">
          <Link 
            to={`/courses/update/${course.id}`} 
            className="action-btn edit-btn"
          >
            Edit Course
          </Link>
          <Link 
            to={`/chapters/list/${course.id}`} 
            className="action-btn secondary-btn"
          >
            View Chapters
          </Link>
        </div>
      </div>
      
      <div className="card-body">
        <div className="field-summary">
          <h3 className="section-title">Description</h3>
          <p className="description-text">{course.description}</p>
        </div>
        
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Created At</div>
            <div className="detail-value">
              {new Date(course.createdAt).toLocaleString()}
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Updated At</div>
            <div className="detail-value">
              {new Date(course.updatedAt).toLocaleString()}
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Course ID</div>
            <div className="detail-value">{course.id}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Belongs to Field</div>
            <div className="detail-value">
              <Link 
                to={`/fields/get/${course.fieldId}`} 
                className="action-btn view-btn"
              >
                View Field
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}