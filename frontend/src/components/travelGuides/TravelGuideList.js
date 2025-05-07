import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllTravelGuides } from '../../api/api';
import TravelGuideItem from './TravelGuideItem';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/TravelGuide.css';

const TravelGuideList = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await getAllTravelGuides();
        setGuides(response.data);
      } catch (err) {
        console.error('Error fetching travel guides:', err);
        setError('Failed to load travel guides. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading travel guides...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="travel-guide-list">
      <div className="travel-guide-header">
        <h1>Travel Guides</h1>
        {currentUser && (
          <Link to="/travel-guides/new" className="add-guide-btn">
            Create New Guide
          </Link>
        )}
      </div>

      {guides.length === 0 ? (
        <div className="no-guides-message">
          <p>No travel guides available yet.</p>
          {currentUser && (
            <p>Be the first to share your travel experiences!</p>
          )}
        </div>
      ) : (
        <div className="guides-grid">
          {guides.map(guide => (
            <TravelGuideItem key={guide.id} guide={guide} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelGuideList;