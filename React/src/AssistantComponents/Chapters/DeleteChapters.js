import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../Shared/Utilities/api";

export default function DeleteChapters() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [chapter, setChapter] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapter = async () => {
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

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(`/chapters/${id}`);
      if (response.data.success) {
        setSuccess('Chapter deleted successfully!');
        setTimeout(() => navigate(-1), 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete chapter');
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
        <h2 className="card-title">Delete Chapter</h2>
      </div>
      
      <div className="card-body">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        {!success && chapter && (
          <div className="confirmation-dialog">
            <div className="confirmation-text">
              <p>Are you sure you want to delete this chapter?</p>
              <p>This action cannot be undone and will permanently remove:</p>
            </div>
            
            <div className="certificate-info">
              <h3>Chapter {chapter.order}: {chapter.title}</h3>
              <p>Belongs to course: {chapter.courseId}</p>
            </div>
            
            <div className="action-group">
              <button 
                onClick={handleDelete} 
                disabled={loading}
                className="delete-btn"
              >
                {loading ? 'Deleting...' : 'Yes, Delete Chapter'}
              </button>
              <button 
                onClick={() => navigate(`/chapters/get/${id}`)} 
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