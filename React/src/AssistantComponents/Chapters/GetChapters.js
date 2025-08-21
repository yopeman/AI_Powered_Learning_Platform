import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {api} from "../../Shared/Utilities/api";

export default function GetChapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const totalPages = Math.ceil(chapters.length / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/courses/${courseId}/chapters`);
        setChapters(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load chapters');
      } finally {
        setLoading(false);
      }
    };

    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${courseId}`);
        if (response.data.success) {
          setCourse(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch course');
      }
    };

    fetchCourse();
    fetchChapters();
  }, [courseId]);

  const paginatedChapters = () => chapters.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < chapters.length) {
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
            Chapters in {course?.title || 'Course'}
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
              disabled={offset + limit >= chapters.length}
              className="secondary-btn"
            >
              Next &gt;
            </button>
          </div>
        </div>
        
        <div className="field-meta">
          <span>Year {course?.year}</span>
          <span>•</span>
          <span>Semester {course?.semester}</span>
          <span>•</span>
          <span>{course?.chapters_length} chapters total</span>
        </div>
      </div>
      
      <div className="card-body">
        <div className="description-text" style={{ marginBottom: '20px' }}>
          {course?.description || 'Course description not available'}
        </div>
        
        <div className="table-container">
          <div className="card-header-row" style={{ marginBottom: '16px' }}>
            <h3 className="section-title">Chapter List</h3>
            {/* <Link 
              to={`/chapters/create/${courseId}`} 
              className="primary-btn"
            >
              + Create New Chapters
            </Link> */}
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedChapters().map((chapter) => (
                <tr key={chapter.id}>
                  <td>Chapter {chapter.order}</td>
                  <td>{chapter.title}</td>
                  <td className="actions-cell">
                    <Link 
                      to={`/chapters/get/${chapter.id}`} 
                      className="action-btn view-btn"
                    >
                      Details
                    </Link>
                    <Link 
                      to={`/chapters/update/${chapter.id}`} 
                      className="action-btn edit-btn"
                    >
                      Edit
                    </Link>
                    <Link 
                      to={`/chapters/delete/${chapter.id}`} 
                      className="action-btn delete-btn"
                    >
                      Delete
                    </Link>
                    <Link 
                      to={`/topics/list/${chapter.id}`} 
                      className="action-btn secondary-btn"
                    >
                      Topics
                    </Link>
                    <Link 
                      to={`/topics/create/${chapter.id}`} 
                      className="action-btn view-btn"
                    >
                      Create New Topic
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {chapters.length === 0 && (
            <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
              <p>No chapters found for this course</p>
              <Link 
                to={`/chapters/create/${courseId}`} 
                className="primary-btn"
                style={{ marginTop: '16px' }}
              >
                Create First Chapter
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}