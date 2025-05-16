import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTravelGuideById, createTravelGuide, updateTravelGuide } from '../../api/api';
import '../../styles/TravelGuide.css';
import './TravelGuideList.css';

const TravelGuideForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    topic: '',
    description: '',
    content: ''
  });

  const isEditing = !!id;

  useEffect(() => {
    const fetchGuide = async () => {
      if (!isEditing) return;
      
      try {
        const response = await getTravelGuideById(id);
        const guide = response.data;
        setFormData({
          title: guide.title,
          destination: guide.destination,
          topic: guide.topic || '',
          description: guide.description,
          content: guide.content || guide.description || ''
        });
      } catch (err) {
        console.error('Error fetching travel guide:', err);
        setError('Failed to load the travel guide for editing.');
      } finally {
        setLoading(false);
      }
    };

    if (isEditing) {
      fetchGuide();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If editing description, also update content to match
    if (name === 'description') {
      setFormData({
        ...formData,
        description: value,
        content: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (isEditing) {
        await updateTravelGuide(id, formData);
      } else {
        await createTravelGuide(formData);
      }
      navigate('/travel-guides');
    } catch (err) {
      console.error('Error saving travel guide:', err);
      setError('Failed to save the travel guide. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading-container">Loading guide details...</div>;
  }

  return (
    <div className="guide-form-container">
      <h2>{isEditing ? 'Edit Travel Guide' : 'Create New Travel Guide'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="guide-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength="100"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            maxLength="100"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="topic">Topic (optional)</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            maxLength="50"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="8"
            maxLength="2000"
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/travel-guides')}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {isEditing ? 'Update Guide' : 'Create Guide'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelGuideForm;