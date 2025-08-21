import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {api} from "../../Shared/Utilities/api";

export default function GetChaptersById() {
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/chapters/${id}`);
        if (response.data.success) {
          setChapter(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch chapter');
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id]);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  if (error) return (
    <div className="error-message">{error}</div>
  );

  if (!chapter) return (
    <div className="error-message">Chapter not found</div>
  );

  return (
    <div className="card">
      <div className="field-header">
        <div>
          <h2 className="field-title">Chapter {chapter.order}: {chapter.title}</h2>
          <div className="field-meta">
            <span>Created: {new Date(chapter.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="action-group">
          <Link 
            to={`/chapters/update/${chapter.id}`} 
            className="action-btn edit-btn"
          >
            Edit Chapter
          </Link>
          <Link 
            to={`/topics/list/${chapter.id}`} 
            className="action-btn secondary-btn"
          >
            View Topics
          </Link>
        </div>
      </div>
      
      <div className="card-body">
        <div className="field-summary">
          <h3 className="section-title">Description</h3>
          <p className="description-text">{chapter.description}</p>
        </div>
        
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Created At</div>
            <div className="detail-value">
              {new Date(chapter.createdAt).toLocaleString()}
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Updated At</div>
            <div className="detail-value">
              {new Date(chapter.updatedAt).toLocaleString()}
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Chapter ID</div>
            <div className="detail-value">{chapter.id}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Belongs to Course</div>
            <div className="detail-value">
              <Link 
                to={`/courses/get/${chapter.courseId}`} 
                className="action-btn view-btn"
              >
                View Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}