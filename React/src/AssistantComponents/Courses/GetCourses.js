import React, {useEffect, useState} from 'react'
import {api} from "../../Shared/Utilities/api";
import {Link, useParams} from "react-router-dom";

export default function GetCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;
  const { fieldId } = useParams();
  const [field, setField] = useState(null);
  const totalPages = Math.ceil(courses.length / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/fields/${fieldId}/courses`);
        setCourses(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    const fetchField = async () => {
      try {
        const response = await api.get(`/fields/${fieldId}`);
        if (response.data.success) {
          setField(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch field');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch field');
      }
    };

    fetchField();
    fetchCourses();
  }, [fieldId]);

  const paginatedCourses = () => courses.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < courses.length) {
      setOffset(prev => prev + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(prev => Math.max(prev - limit, 0));
    }
  };

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  if (error) return (
    <div className="error-message">{error}</div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-row">
          <h2 className="card-title">
            Courses in {field?.title || 'Field'}
          </h2>
          <div className="pagination-controls">
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={handlePreviousPage} 
              disabled={offset === 0}
              className="secondary-btn"
            >
              &lt; Previous
            </button>
            <button 
              onClick={handleNextPage} 
              disabled={offset + limit >= courses.length}
              className="secondary-btn"
            >
              Next &gt;
            </button>
          </div>
        </div>
        
        <div className="field-meta">
          <span>Duration: {field?.years_length} year(s)</span>
          <span>•</span>
          <span>
            {field?.isFree ? 
              <span className="free-access">Free Access</span> : 
              <span className="premium-access">Premium Access</span>
            }
          </span>
          <span>•</span>
          <span>{field?.number_of_free_topics} free topics</span>
        </div>
      </div>
      
      <div className="card-body">
        <div className="description-text" style={{ marginBottom: '20px' }}>
          {field?.description || 'Field description not available'}
        </div>
        
        <div className="table-container">
          <div className="card-header-row" style={{ marginBottom: '16px' }}>
            <h3 className="section-title">Course List</h3>
            <Link 
              to={`/courses/create/${fieldId}`} 
              className="primary-btn"
            >
              + Create New Course
            </Link>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Chapters</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses().map((course) => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>Year {course.year}</td>
                  <td>Semester {course.semester}</td>
                  <td>{course.chapters_length}</td>
                  <td className="actions-cell">
                    <Link 
                      to={`/courses/get/${course.id}`} 
                      className="action-btn view-btn"
                    >
                      Details
                    </Link>
                    <Link 
                      to={`/courses/update/${course.id}`} 
                      className="action-btn edit-btn"
                    >
                      Edit
                    </Link>
                    <Link 
                      to={`/courses/delete/${course.id}`} 
                      className="action-btn delete-btn"
                    >
                      Delete
                    </Link>
                    <Link 
                      to={`/chapters/list/${course.id}`} 
                      className="action-btn secondary-btn"
                    >
                      Chapters
                    </Link>
                    <Link 
                      to={`/chapters/create/${course.id}`} 
                      className="action-btn view-btn"
                    >
                      Create New Chapter
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {courses.length === 0 && (
            <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
              <p>No courses found for this field</p>
              <Link 
                to={`/courses/create/${fieldId}`} 
                className="primary-btn"
                style={{ marginTop: '16px' }}
              >
                Create First Course
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}