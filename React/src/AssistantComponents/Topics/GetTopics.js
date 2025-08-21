import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function GetTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 15;
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const totalPages = Math.ceil(topics.length / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [topicsResponse, chapterResponse] = await Promise.all([
          api.get(`/chapters/${chapterId}/topics`),
          api.get(`/chapters/${chapterId}`)
        ]);

        setTopics(topicsResponse.data.data);
        if (chapterResponse.data.success) {
          setChapter(chapterResponse.data.data);
        } else {
          setError(chapterResponse.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chapterId]);

  const paginatedTopics = () => topics.slice(offset, offset + limit);

  const handleNextPage = () => {
    if (offset + limit < topics.length) {
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
            Topics in Chapter {chapter?.order || ''}
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
              disabled={offset + limit >= topics.length}
              className="secondary-btn"
            >
              Next &gt;
            </button>
          </div>
        </div>
        
        <div className="field-meta">
          <span>Chapter: {chapter?.title || 'N/A'}</span>
          <span>•</span>
          <span>Course: {chapter?.courseId || 'N/A'}</span>
        </div>
      </div>
      
      <div className="card-body">
        <div className="description-text" style={{ marginBottom: '20px' }}>
          {chapter?.description || 'Chapter description not available'}
        </div>
        
        <div className="table-container">
          <div className="card-header-row" style={{ marginBottom: '16px' }}>
            <h3 className="section-title">Topic List</h3>
            <Link 
              to={`/topics/create/${chapterId}`} 
              className="primary-btn"
            >
              + Create New Topics
            </Link>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTopics().map((topic) => (
                <tr key={topic.id}>
                  <td>{topic.title}</td>
                  <td className="actions-cell">
                    <Link 
                      to={`/topics/get/${topic.id}`} 
                      className="action-btn view-btn"
                    >
                      Details
                    </Link>
                    <Link 
                      to={`/topics/update/${topic.id}`} 
                      className="action-btn edit-btn"
                    >
                      Edit
                    </Link>
                    <Link 
                      to={`/topics/delete/${topic.id}`} 
                      className="action-btn delete-btn"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {topics.length === 0 && (
            <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
              <p>No topics found for this chapter</p>
              <Link 
                to={`/topics/create/${chapterId}`} 
                className="primary-btn"
                style={{ marginTop: '16px' }}
              >
                Create First Topic
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}