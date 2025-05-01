import React, { useState, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import travel_first from "../assets/travel-first.jpg";
import logo from "../assets/travel-logo.jpg";
import video from "../assets/travelvideo.mp4";
import { useNavigate } from 'react-router-dom';

function HomeTravelPlan() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="container-fluid ">
      {/* Hero Section */}
      <div className="bg-primary bg-gradient text-white py-5 text-center">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">
            Travel Learning <span className="text-warning">Plans</span>
          </h1>
          <p className="lead my-4">
            Create personalized travel itineraries that blend exploration with educational experiences. 
            Share your journeys and learn from others.
          </p>
          <button className="btn btn-light btn-lg px-4 gap-3" onClick={()=>navigate ('/travel-plans')}>
            <i className="bi bi-plus-circle me-2"></i> Start Your Learning Plan Journey
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <div className="card shadow border-0 overflow-hidden">
              <img 
                src={travel_first} 
                alt="Travelers exploring landmarks" 
                className="img-fluid w-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Learn While You Travel</h2>
            <p className="lead text-muted">
              Our platform combines educational content with travel planning
            </p>
          </div>

          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-primary text-white fs-2 mb-3 p-3 rounded-circle">
                    <i className="bi bi-map"></i>
                  </div>
                  <h3 className="fs-4 fw-bold">Custom Itineraries</h3>
                  <p className="text-muted">
                    Create detailed travel plans with educational points of interest tailored to your interests.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-primary text-white fs-2 mb-3 p-3 rounded-circle">
                    <i className="bi bi-camera-video"></i>
                  </div>
                  <h3 className="fs-4 fw-bold">Video Lessons</h3>
                  <p className="text-muted">
                    Access educational videos about each destination's history, culture, and hidden gems.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon d-inline-flex align-items-center justify-content-center bg-primary text-white fs-2 mb-3 p-3 rounded-circle">
                    <i className="bi bi-share"></i>
                  </div>
                  <h3 className="fs-4 fw-bold">Social Sharing</h3>
                  <p className="text-muted">
                    Share your travel learning plans with friends and discover plans created by others.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container py-5">
        <h2 className="display-5 fw-bold text-center mb-5">How It Works</h2>
        
        <div className="row g-5">
          <div className="col-md-6">
            <div className="p-4">
              <div className="list-group list-group-flush">
                <div className="list-group-item border-0 d-flex align-items-start gap-3 px-0 py-3">
                  <div className="bg-primary text-white rounded-circle p-2 fs-4 d-flex align-items-center justify-content-center" style={{width: "50px", height: "50px"}}>1</div>
                  <div>
                    <h3 className="fs-4 fw-semibold">Choose Your Destination</h3>
                    <p className="text-muted mb-0">Select from popular destinations or create a custom route.</p>
                  </div>
                </div>

                <div className="list-group-item border-0 d-flex align-items-start gap-3 px-0 py-3">
                  <div className="bg-primary text-white rounded-circle p-2 fs-4 d-flex align-items-center justify-content-center" style={{width: "50px", height: "50px"}}>2</div>
                  <div>
                    <h3 className="fs-4 fw-semibold">Add Learning Objectives</h3>
                    <p className="text-muted mb-0">Specify what you want to learn about during your travels.</p>
                  </div>
                </div>

                <div className="list-group-item border-0 d-flex align-items-start gap-3 px-0 py-3">
                  <div className="bg-primary text-white rounded-circle p-2 fs-4 d-flex align-items-center justify-content-center" style={{width: "50px", height: "50px"}}>3</div>
                  <div>
                    <h3 className="fs-4 fw-semibold">Explore and Share</h3>
                    <p className="text-muted mb-0">Follow your plan and share your experiences with the community.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow border-0 h-100">
              <img 
                src={logo} 
                alt="Using the Travel Learning Plan app" 
                className="img-fluid h-100 object-fit-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview Section */}
      <div className="bg-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">See How Others Learn Through Travel</h2>
            <p className="lead text-muted">
              Watch success stories from our community of travel learners
            </p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow position-relative">
                <video 
                  ref={videoRef}
                  src={video}
                  className="img-fluid"
                  loop
                  muted={false}
                  controls={isPlaying}
                  poster={travel_first} // Using an image as video thumbnail
                />
                {!isPlaying && (
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <button 
                      className="btn btn-primary btn-lg rounded-circle p-3"
                      onClick={handleVideoPlay}
                    >
                      <i className="bi bi-play-fill fs-2"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-white py-5 text-center">
        <div className="container py-4">
          <h2 className="display-5 fw-bold">Ready to start your journey?</h2>
          <p className="lead my-4">
            Join thousands of travelers who combine exploration with education.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <button className="btn btn-light btn-lg px-4"
            onClick={()=>navigate ('/travel-plans')}
            >
                
              <i className="bi bi-compass me-2"></i> Start Your Learning Plan Journey
            </button>
            <button className="btn btn-outline-light btn-lg px-4">
              <i className="bi bi-people me-2"></i> Browse Community Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTravelPlan;