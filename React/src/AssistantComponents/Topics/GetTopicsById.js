import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {api} from "../../Shared/Utilities/api";

export default function GetTopicsById() {
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTopic = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/topics/${id}`);
        if (response.data.success) {
          setTopic(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch topic');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  if (error) return (
    <div className="error-message">{error}</div>
  );

  if (!topic) return (
    <div className="error-message">Topic not found</div>
  );

  return (
    <div className="card">
      <div className="field-header">
        <div>
          <h2 className="field-title">{topic.title}</h2>
          <div className="field-meta">
            <span>Created: {new Date(topic.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="action-group">
          <Link 
            to={`/topics/update/${topic.id}`} 
            className="action-btn edit-btn"
          >
            Edit Topic
          </Link>
        </div>
      </div>
      
      <div className="card-body">
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Created At</div>
            <div className="detail-value">
              {new Date(topic.createdAt).toLocaleString()}
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Updated At</div>
            <div className="detail-value">
              {new Date(topic.updatedAt).toLocaleString()}
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Topic ID</div>
            <div className="detail-value">{topic.id}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Belongs to Chapter</div>
            <div className="detail-value">
              <Link 
                to={`/chapters/get/${topic.chapterId}`} 
                className="action-btn view-btn"
              >
                View Chapter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}