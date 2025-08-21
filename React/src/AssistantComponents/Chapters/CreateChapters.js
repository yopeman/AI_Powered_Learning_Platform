import React, { useEffect, useState } from 'react';
import { api } from "../../Shared/Utilities/api";
import { useParams } from "react-router-dom";

export const ChapterForm = ({ chapters, handleChange, handleSubmit, handleReset, loading }) => (
  <form onSubmit={handleSubmit} className="field-form">
    <div className="form-grid">
      {chapters.map((chapter, index) => (
        <div key={index} className="form-section" style={{ gridColumn: 'span 2' }}>
          <h3 className="section-title">Chapter {index + 1}</h3>
          
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={chapter.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              required
              className="amount-input"
              placeholder={`Chapter ${index + 1} title`}
            />
          </div>
          
          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={chapter.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              required
              className="amount-input"
              rows="4"
              placeholder={`Chapter ${index + 1} description`}
            />
          </div>
        </div>
      ))}
    </div>
    
    <div className="button-group" style={{ marginTop: '24px' }}>
      <button 
        type="submit" 
        className="primary-btn"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Chapters'}
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
);

const CreateChapters = () => {
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/courses/${courseId}`);
        if (response.data.success) {
          setCourse(response.data.data);
          setChapters(Array.from({ length: response.data.data.chapters_length }, (_, index) => ({
            order: index + 1,
            title: '',
            description: '',
          })));
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
  }, [courseId]);

  const handleChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const handleReset = () => {
    setChapters(Array.from({ length: course.chapters_length }, (_, index) => ({
      order: index + 1,
      title: '',
      description: '',
    })));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/chapters', { courseId, chapters });
      if (response.data.success) {
        setSuccess('Chapters created successfully!');
        handleReset();
        setSuccess('Chapters created successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Chapter creation failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !course) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Create New Chapters</h2>
        <div className="field-meta">
          For: {course?.title} (Chapters: {course?.chapters_length})
        </div>
      </div>
      
      <div className="card-body">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        {course && (
          <ChapterForm 
            chapters={chapters} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            handleReset={handleReset} 
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default CreateChapters;