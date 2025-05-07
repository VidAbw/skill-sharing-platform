import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/TravelGuide.css';

const TravelGuideItem = ({ guide }) => {
  return (
    <div className="guide-card">
      <h3>{guide.title}</h3>
      <p className="guide-destination">Destination: {guide.destination}</p>
      {guide.topic && <p className="guide-topic">Topic: {guide.topic}</p>}
      <p className="guide-description">
        {guide.description.length > 150
          ? `${guide.description.substring(0, 150)}...`
          : guide.description}
      </p>
      <Link to={`/travel-guides/${guide.id}`} className="view-more-link">
        View Details
      </Link>
    </div>
  );
};

export default TravelGuideItem;