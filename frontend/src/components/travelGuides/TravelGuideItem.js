import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/TravelGuide.css';
import './TravelGuideList.css';

const TravelGuideItem = ({ guide, onDelete }) => {
  return (
    <div className="guide-card">
      <h3>{guide.title}</h3>
      <p className="guide-destination"><em>Destination:</em> {guide.destination}</p>
      {guide.topic && <p className="guide-topic"><em>Topic:</em> {guide.topic}</p>}
      <p className="guide-description">
        {guide.description.length > 150
          ? `${guide.description.substring(0, 150)}...`
          : guide.description}
      </p>
      <Link to={`/travel-guides/${guide.id}`} className="view-more-link">
        View Details
      </Link>
      {onDelete && (
        <button className="delete-guide-btn" onClick={() => onDelete(guide.id)}>
          Delete
        </button>
      )}
    </div>
  );
};

export default TravelGuideItem;