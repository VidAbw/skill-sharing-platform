import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';

//Added items into View Plan List

const ViewPlanList = () => {
  const { id } = useParams();
  const [travelPlan, setTravelPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [languageResources, setLanguageResources] = useState(null);
  const [isLoadingLanguage, setIsLoadingLanguage] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchTravelPlan = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/api/plans/${id}`);
        setTravelPlan(response.data);
        setIsLoading(false);
        
        // If we have a destination, fetch language resources
        if (response.data.destination) {
          fetchLanguageResources(response.data.destination);
        }
      } catch (err) {
        console.error('Error fetching travel plan details:', err);
        setError('Failed to load travel plan details. Please try again later.');
        setIsLoading(false);
      }
    }

    fetchTravelPlan();
  }, [id]);

  const fetchLanguageResources = async (destination) => {
    setIsLoadingLanguage(true);
    try {
      // This would typically be an API call to fetch language resources
      // For demonstration, we'll use a mock response based on destination
      setTimeout(() => {
        const languageData = getLanguageDataForCountry(destination);
        setLanguageResources(languageData);
        setIsLoadingLanguage(false);
      }, 500);
    } catch (err) {
      console.error('Error fetching language resources:', err);
      setIsLoadingLanguage(false);
    }
  };

  // Mock function to get language data based on destination
  const getLanguageDataForCountry = (destination) => {
    const countryLanguageMap = {
      'Japan': {
        mainLanguage: 'Japanese',
        phrases: [
          { phrase: 'Hello', translation: 'Konnichiwa (こんにちは)' },
          { phrase: 'Thank you', translation: 'Arigato (ありがとう)' },
          { phrase: 'Excuse me', translation: 'Sumimasen (すみません)' },
          { phrase: 'Yes/No', translation: 'Hai/Iie (はい/いいえ)' },
          { phrase: 'Where is...?', translation: '...wa doko desu ka? (はどこですか?)' },
        ],
        resources: [
          { name: 'Duolingo - Japanese Course', url: 'https://www.duolingo.com/course/ja/en/Learn-Japanese' },
          { name: 'NHK World - Easy Japanese', url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/' },
          { name: 'Tofugu - Japanese Learning Resources', url: 'https://www.tofugu.com' },
        ]
      },
      'France': {
        mainLanguage: 'French',
        phrases: [
          { phrase: 'Hello', translation: 'Bonjour' },
          { phrase: 'Thank you', translation: 'Merci' },
          { phrase: 'Excuse me', translation: 'Excusez-moi' },
          { phrase: 'Yes/No', translation: 'Oui/Non' },
          { phrase: 'Where is...?', translation: 'Où est...?' },
        ],
        resources: [
          { name: 'TV5Monde - Learn French', url: 'https://langue-francaise.tv5monde.com/en' },
          { name: 'France Culture - French Podcasts', url: 'https://www.franceculture.fr/podcasts' },
          { name: 'BBC - French Learning Resources', url: 'https://www.bbc.co.uk/languages/french/' },
        ]
      },
      'Spain': {
        mainLanguage: 'Spanish',
        phrases: [
          { phrase: 'Hello', translation: 'Hola' },
          { phrase: 'Thank you', translation: 'Gracias' },
          { phrase: 'Excuse me', translation: 'Disculpe' },
          { phrase: 'Yes/No', translation: 'Sí/No' },
          { phrase: 'Where is...?', translation: '¿Dónde está...?' },
        ],
        resources: [
          { name: 'SpanishDict - Spanish Learning', url: 'https://www.spanishdict.com/' },
          { name: 'Notes in Spanish - Podcasts', url: 'https://www.notesinspanish.com/' },
          { name: 'Cervantes Institute - Official Spanish Resources', url: 'https://www.cervantes.es/default.htm' },
        ]
      },
      'Italy': {
        mainLanguage: 'Italian',
        phrases: [
          { phrase: 'Hello', translation: 'Ciao' },
          { phrase: 'Thank you', translation: 'Grazie' },
          { phrase: 'Excuse me', translation: 'Scusi' },
          { phrase: 'Yes/No', translation: 'Sì/No' },
          { phrase: 'Where is...?', translation: 'Dov\'è...?' },
        ],
        resources: [
          { name: 'OnlineItalianClub - Free Resources', url: 'https://onlineitalianclub.com/' },
          { name: 'News in Slow Italian', url: 'https://www.newsinslowitalian.com/' },
          { name: 'Italy Made Easy - Italian Learning', url: 'https://www.italymadeeasy.com/' },
        ]
      },
      'Germany': {
        mainLanguage: 'German',
        phrases: [
          { phrase: 'Hello', translation: 'Hallo' },
          { phrase: 'Thank you', translation: 'Danke' },
          { phrase: 'Excuse me', translation: 'Entschuldigung' },
          { phrase: 'Yes/No', translation: 'Ja/Nein' },
          { phrase: 'Where is...?', translation: 'Wo ist...?' },
        ],
        resources: [
          { name: 'Deutsche Welle - Learn German', url: 'https://www.dw.com/en/learn-german/s-2469' },
          { name: 'Easy German - YouTube Channel', url: 'https://www.youtube.com/c/EasyGerman' },
          { name: 'Goethe-Institut - German Courses', url: 'https://www.goethe.de/en/index.html' },
        ]
      },
      // Add more countries as needed
      'default': {
        mainLanguage: 'Unknown',
        phrases: [
          { phrase: 'Hello', translation: 'Hello in local language' },
          { phrase: 'Thank you', translation: 'Thank you in local language' },
          { phrase: 'Excuse me', translation: 'Excuse me in local language' },
        ],
        resources: [
          { name: 'Duolingo - Language Learning', url: 'https://www.duolingo.com/' },
          { name: 'Google Translate', url: 'https://translate.google.com/' },
          { name: 'Tandem - Language Exchange App', url: 'https://www.tandem.net/' },
        ]
      }
    };
    
    // Check if we have specific data for this country
    for (const country in countryLanguageMap) {
      if (destination.toLowerCase().includes(country.toLowerCase())) {
        return {
          country: country,
          ...countryLanguageMap[country]
        };
      }
    }
    
    // Return default if no match
    return {
      country: destination,
      ...countryLanguageMap['default']
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };



  const getTravelTypeIcon = (type) => {
    switch (type) {
      case 'SOLO': return 'bi-person';
      case 'FAMILY': return 'bi-people-fill';
      case 'FRIENDS': return 'bi-emoji-smile';
      case 'COUPLE': return 'bi-heart-fill';
      default: return 'bi-compass';
    }
  };

  const getAccommodationIcon = (type) => {
    switch (type) {
      case 'HOTEL': return 'bi-building';
      case 'HOSTEL': return 'bi-house-door';
      case 'APARTMENT': return 'bi-house';
      case 'RESORT': return 'bi-umbrella-beach';
      case 'CAMPING': return 'bi-tree';
      default: return 'bi-house';
    }
  };

  const getTransportationIcon = (type) => {
    switch (type) {
      case 'FLIGHT': return 'bi-airplane';
      case 'TRAIN': return 'bi-train-front';
      case 'BUS': return 'bi-bus-front';
      case 'CAR': return 'bi-car-front';
      case 'CRUISE': return 'bi-water';
      default: return 'bi-arrow-right';
    }
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading travel plan details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
        <Link to="/travel-planlist" className="btn btn-primary me-2">
          <i className="bi bi-arrow-left me-2"></i>Back to Travel Plans
        </Link>
        <button 
          className="btn btn-secondary" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!travelPlan) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-circle-fill me-2"></i>
          Travel plan not found.
        </div>
        <Link to="/travel-planlist" className="btn btn-primary mt-3">
          <i className="bi bi-arrow-left me-2"></i>Back to Travel Plans
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">
          <i className="bi bi-map-fill me-2 text-primary"></i>
          Travel Plan Details
        </h1>
        <div>
          <Link to="/travel-planlist" className="btn btn-outline-primary me-2">
            <i className="bi bi-arrow-left me-2"></i>Back
          </Link>
          <Link to={`/edit-travel-plan/${id}`} className="btn btn-outline-secondary me-2">
            <i className="bi bi-pencil me-1"></i>Edit
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">{travelPlan.title || 'Untitled Journey'}</h3>
            </div>
            <div className="card-body">
              {travelPlan.imageUrl ? (
                <div className="position-relative">
                  {imageLoading && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading image...</span>
                      </div>
                    </div>
                  )}
                  <img 
                    src={travelPlan.imageUrl.startsWith('http') 
                      ? travelPlan.imageUrl 
                      : `http://localhost:8000/api/plans/images/${travelPlan.imageUrl}`}
                    className="img-fluid rounded mb-4" 
                    alt={travelPlan.destination} 
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => {
                      setImageLoading(false);
                      console.error("Image failed to load:", travelPlan.imageUrl);
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                    }}
                  />
                </div>
              ) : (
                <div className="placeholder-image bg-light d-flex justify-content-center align-items-center rounded mb-4" style={{ height: '200px' }}>
                  <i className="bi bi-image text-secondary" style={{ fontSize: '3rem' }}></i>
                </div>
              )}

              <div className="mb-4">
                <h4>Destination</h4>
                <p className="lead">
                  <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                  {travelPlan.destination || 'Destination not specified'}
                </p>
                
                {travelPlan.destinations && travelPlan.destinations.length > 0 && (
                  <div className="mt-3">
                    <h5>Additional Destinations</h5>
                    <ul className="list-group">
                      {travelPlan.destinations.map((dest, index) => (
                        <li key={index} className="list-group-item">
                          <i className="bi bi-pin-map-fill me-2 text-primary"></i>
                          {dest}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {travelPlan.description && (
                <div className="mb-4">
                  <h4>Description</h4>
                  <p>{travelPlan.description}</p>
                </div>
              )}

              {travelPlan.goals && (
                <div className="mb-4">
                  <h4>Travel Goals</h4>
                  <p>{travelPlan.goals}</p>
                </div>
              )}

              {travelPlan.experience && (
                <div className="mb-4">
                  <h4>Travel Experience</h4>
                  <p>{travelPlan.experience}</p>
                </div>
              )}

              {travelPlan.culturalInterests && (
                <div className="mb-4">
                  <h4>Cultural Interests</h4>
                  <p>{travelPlan.culturalInterests}</p>
                </div>
              )}
               {travelPlan.travelGoal && (
                <div className="mb-4">
                  <h4>Travel Goal</h4>
                  <p>{travelPlan.travelGoal}</p>
                </div>
              )}
              
              {/* Language Resources Section */}
              {languageResources && (
                <div className="card mt-4 border-primary">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">
                      <i className="bi bi-translate me-2"></i>
                      Language Resources for {languageResources.country}
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <h5>Primary Language: {languageResources.mainLanguage}</h5>
                      <p className="text-muted">Learning a few basic phrases can enhance your travel experience!</p>
                    </div>
                    
                    <div className="mb-4">
                      <h5>Useful Phrases</h5>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>English</th>
                              <th>{languageResources.mainLanguage}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {languageResources.phrases.map((item, index) => (
                              <tr key={index}>
                                <td>{item.phrase}</td>
                                <td><strong>{item.translation}</strong></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div>
                      <h5>Learning Resources</h5>
                      <div className="list-group">
                        {languageResources.resources.map((resource, index) => (
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="list-group-item list-group-item-action" 
                            key={index}
                          >
                            <div className="d-flex w-100 justify-content-between align-items-center">
                              <h6 className="mb-1">{resource.name}</h6>
                              <i className="bi bi-box-arrow-up-right"></i>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {isLoadingLanguage && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading language resources...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading language resources...</p>
                </div>
              )}

              {/* Planned Activities Section */}
              {travelPlan.activities && travelPlan.activities.length > 0 && (
                <div className="mb-4">
                  <h4>Planned Activities</h4>
                  <div className="list-group">
                    {travelPlan.activities.map((activity, index) => (
                      <div className="list-group-item" key={index}>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-1">
                            {activity.booked && <i className="bi bi-check-circle-fill text-success me-2"></i>}
                            {activity.name}
                          </h5>
                          {activity.date && (
                            <span className="badge bg-primary rounded-pill">
                              {new Date(activity.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {activity.description && <p className="mb-1">{activity.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h4 className="mb-0">Trip Overview</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h5>Dates</h5>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-calendar-event text-primary me-2"></i>
                  <div>
                    <strong>Start:</strong> {formatDate(travelPlan.startDate)}
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar-check text-primary me-2"></i>
                  <div>
                    <strong>End:</strong> {formatDate(travelPlan.endDate)}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h5>Travel Type</h5>
                <div className="d-flex align-items-center">
                  <i className={`bi ${getTravelTypeIcon(travelPlan.travel_type)} text-primary me-2`}></i>
                  <div>
                    {travelPlan.travel_type ? travelPlan.travel_type.charAt(0) + travelPlan.travel_type.slice(1).toLowerCase() : 'Not specified'}
                  </div>
                </div>
              </div>

              {travelPlan.budget && (
                <div className="mb-3">
                  <h5>Budget</h5>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-cash-stack text-primary me-2"></i>
                    <div>
                      {travelPlan.budget} {travelPlan.currency || 'USD'}
                    </div>
                  </div>
                </div>
              )}

              {travelPlan.accommodation && (
                <div className="mb-3">
                  <h5>Accommodation</h5>
                  <div className="d-flex align-items-center">
                    <i className={`bi ${getAccommodationIcon(travelPlan.accommodation)} text-primary me-2`}></i>
                    <div>
                      {travelPlan.accommodation.charAt(0) + travelPlan.accommodation.slice(1).toLowerCase()}
                    </div>
                  </div>
                </div>
              )}

              {travelPlan.transportationType && (
                <div className="mb-3">
                  <h5>Transportation</h5>
                  <div className="d-flex align-items-center">
                    <i className={`bi ${getTransportationIcon(travelPlan.transportationType)} text-primary me-2`}></i>
                    <div>
                      {travelPlan.transportationType.charAt(0) + travelPlan.transportationType.slice(1).toLowerCase()}
                    </div>
                  </div>
                </div>
              )}

              {travelPlan.createdAt && (
                <div className="mt-4 pt-3 border-top">
                  <small className="text-muted">
                    <i className="bi bi-clock-history me-1"></i>
                    Created: {formatDate(travelPlan.createdAt)}
                  </small>
                </div>
              )}
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h4 className="mb-0">
                <i className="bi bi-lightbulb me-2 text-warning"></i>
                Travel Tips
              </h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h5>Before You Go</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item ps-0 border-0">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Check passport validity
                  </li>
                  <li className="list-group-item ps-0 border-0">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Research local customs
                  </li>
                  <li className="list-group-item ps-0 border-0">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Download offline maps
                  </li>
                </ul>
              </div>
              <div>
                <a href="#" className="btn btn-outline-info btn-sm w-100">
                  <i className="bi bi-info-circle me-2"></i>
                  View More Travel Tips
                </a>
              </div>
            </div>
          </div>

        </div>
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link to={`/edit-travel-plan/${id}`} className="btn btn-outline-primary">
                  <i className="bi bi-pencil me-2"></i>Edit Plan
                </Link>
                <Link to="/travel-planlist" className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-left me-2"></i>Back to Travel Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}
;
export default ViewPlanList;