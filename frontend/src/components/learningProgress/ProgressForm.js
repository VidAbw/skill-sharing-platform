import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLearningProgress, updateLearningProgress, getLearningProgressById } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/ProgressFrom.css';

const ProgressForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const isEditing = !!id;

  useEffect(() => {
    const fetchProgressItem = async () => {
      if (!isEditing) return;
      
      try {
        const response = await getLearningProgressById(id);
        const progressItem = response.data;
        setFormData({
          title: progressItem.title,
          content: progressItem.content
        });
      } catch (err) {
        console.error('Error fetching progress item:', err);
        setError('Failed to load the progress item for editing.');
      } finally {
        setLoading(false);
      }
    };

    if (isEditing) {
      fetchProgressItem();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const progressData = {
      ...formData,
      userId: currentUser?.id
    };
    
    try {
      if (isEditing) {
        await updateLearningProgress(id, progressData);
      } else {
        await createLearningProgress(progressData);
      }
      navigate('/progress');
    } catch (err) {
      console.error('Error saving progress:', err);
      setError('Failed to save progress update. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="progress-form-container">
      <h2>{isEditing ? 'Edit Progress Update' : 'Create New Progress Update'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="progress-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="What are you learning?"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Share your learning progress..."
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => navigate('/progress')}
          >
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {isEditing ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgressForm;