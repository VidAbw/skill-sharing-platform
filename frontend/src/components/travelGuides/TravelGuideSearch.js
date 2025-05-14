// TravelGuideSearch.js
import React, { useState } from 'react';
import { searchTravelGuidesByDestination, searchTravelGuidesByTopic } from '../../api/api';
import './TravelGuideSearch.css';

const TravelGuideSearch = () => {
  const [searchType, setSearchType] = useState('destination');
  const [searchTerm, setSearchTerm] = useState('');
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      let response;
      if (searchType === 'destination') {
        response = await searchTravelGuidesByDestination(searchTerm);
      } else {
        response = await searchTravelGuidesByTopic(searchTerm);
      }
      
      setGuides(response.data);
      setSearched(true);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="travel-guide-search">
      <h2>Search Travel Guides</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-type">
          <label>
            <input
              type="radio"
              name="searchType"
              value="destination"
              checked={searchType === 'destination'}
              onChange={() => setSearchType('destination')}
            />
            By Destination
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="topic"
              checked={searchType === 'topic'}
              onChange={() => setSearchType('topic')}
            />
            By Topic
          </label>
        </div>
        
        <div className="search-input">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search by ${searchType}...`}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="search-results">
        {loading ? (
          <div>Searching...</div>
        ) : (
          <>
            {searched && (
              <h3>
                {guides.length > 0
                  ? `Found ${guides.length} guide${guides.length === 1 ? '' : 's'}`
                  : `No guides found for "${searchTerm}"`}
              </h3>
            )}
            
            {guides.map(guide => (
              <div key={guide.id} className="guide-card">
                <h3>{guide.title}</h3>
                <p className="guide-destination">Destination: {guide.destination}</p>
                {guide.topic && <p className="guide-topic">Topic: {guide.topic}</p>}
                <p className="guide-description">{guide.description}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TravelGuideSearch;
