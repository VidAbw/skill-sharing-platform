import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#111111' }} className="text-white pt-5 pb-3 mt-5">
      <div className="container text-center text-md-start">
        <div className="row">

          <div className="col-md-4 mb-4">
            
            <p>Discover, share, and learn travel experiences and skills around the world 🌍.</p>
          </div>

          <div className="col-md-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li><Link to="/post/new" className="text-white-50 text-decoration-none">Create Post</Link></li>
              <li><Link to="/itinerary/new" className="text-white-50 text-decoration-none">New Itinerary</Link></li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
            <p className="text-white-50 mb-1">Email: support@asiru.com</p>
            <p className="text-white-50">Phone: +1 234 567 890</p>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3 justify-content-md-start justify-content-center">
              <a href="#" className="text-white-50"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#" className="text-white-50"><i className="fab fa-linkedin fa-lg"></i></a>
              <a href="#" className="text-white-50"><i className="fab fa-twitter fa-lg"></i></a>
            </div>
          </div>

        </div>
      </div>

      <div className="text-center text-white-50 mt-4">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
