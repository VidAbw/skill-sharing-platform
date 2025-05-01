import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Learning Portal</h5>
            <p className="text">Empowering your educational journey</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-light">Home</a></li>
              <li><a href="/travel-plans" className="text-decoration-none text-light">Learning Plans</a></li>
              <li><a href="/learning-plan-list" className="text-decoration-none text-light">Learning Plan List</a></li>
              <li><a href="/about" className="text-decoration-none text-light">About</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p className="mb-3">Email: info@learningportal.com</p>
            <p className="mb-3">Phone: (123) 456-7890</p>
          </div>
        </div>
        <hr className="my-3" />
        <div className="row">
          <div className="col-md-6 mb-2 mb-md-0">
            <p className="mb-0">&copy; {currentYear} Learning Portal. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="/terms" className="text-decoration-none text-light me-3">Terms of Service</a>
            <a href="/privacy" className="text-decoration-none text-light">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;