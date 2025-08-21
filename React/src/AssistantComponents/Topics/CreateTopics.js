import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {api} from "../../Shared/Utilities/api";

export default function CreateTopics() {
  const [topics, setTopics] = useState(['']); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/chapters/${chapterId}`);
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
  }, [chapterId]);

  const handleInputChange = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index] = value;
    setTopics(updatedTopics);
  };

  const handleAddTopic = () => {
    setTopics([...topics, '']);
  };

  const handleRemoveTopic = (index) => {
    if (topics.length > 1) {
      const updatedTopics = [...topics];
      updatedTopics.splice(index, 1);
      setTopics(updatedTopics);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/topics', { chapterId, titles: topics });
      if (response.data.success) {
        setSuccess('Topics created successfully!');
        setTopics(['']);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Topics creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTopics(['']);
    setError(null);
    setSuccess(null);
  };

  if (!chapter) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Create New Topics</h2>
        <div className="field-meta">
          For Chapter {chapter?.order}: {chapter?.title}
        </div>
      </div>
      
      <div className="card-body">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="field-form">
          <div className="form-section">
            {topics.map((topic, index) => (
              <div key={index} className="form-group" style={{ position: 'relative', marginBottom: '20px' }}>
                <label>Topic {index + 1} *</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder={`Enter topic ${index + 1} title`}
                    required
                    className="amount-input"
                  />
                  {topics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(index)}
                      className="delete-btn"
                      style={{ 
                        position: 'absolute', 
                        right: '10px', 
                        top: '35px', 
                        padding: '4px 8px',
                        fontSize: '12px'
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            <div className="button-group">
              <button 
                type="button" 
                onClick={handleAddTopic}
                className="secondary-btn"
                style={{ marginRight: '10px' }}
              >
                + Add Another Topic
              </button>
            </div>
          </div>
          
          <div className="button-group" style={{ marginTop: '24px' }}>
            <button 
              type="submit" 
              className="primary-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Topics'}
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