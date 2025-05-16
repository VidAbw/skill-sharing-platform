import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllTravelGuides } from '../../api/api';
import TravelGuideItem from './TravelGuideItem';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/TravelGuide.css';
import axios from '../../api/axiosInstance';

const TravelGuideList = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this travel guide?')) return;
    try {
      await axios.delete(`/travel-guides/${id}`);
      setGuides(guides.filter((g) => g.id !== id));
    } catch (err) {
      alert('Failed to delete travel guide.');
    }
  };

  if (loading) {
    return <div className="loading-container">Loading travel guides...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="travel-guide-list">
      <div className="travel-guide-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Travel Guides</h1>
        <Link to="/travel-guides/new" className="add-guide-btn">
          + Add Travel Guide
        </Link>
      </div>

      {guides.length === 0 ? (
        <div className="no-guides-message">
          <p>No travel guides available yet.</p>
        </div>
      ) : (
        <div className="guides-grid">
          {guides.map(guide => (
            <TravelGuideItem key={guide.id} guide={guide} onDelete={user ? handleDelete : undefined} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelGuideList;