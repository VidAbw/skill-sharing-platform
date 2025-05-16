import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container d-flex align-items-center justify-content-between py-3">

        {/* Logo */}
        <Link to="/" className="text-primary fw-bold fs-2 text-decoration-none">
          <h4>🌍 Skill share and learnig platform</h4>
        </Link>

        {/* Navigation Links */}
        <div className="d-none d-lg-flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-primary fw-bold text-decoration-underline'
                : 'text-dark text-decoration-none'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/post/new"
            className={({ isActive }) =>
              isActive
                ? 'text-primary fw-bold text-decoration-underline'
                : 'text-dark text-decoration-none'
            }
          >
            Create Post
          </NavLink>

          <NavLink
            to="/itinerary/new"
            className={({ isActive }) =>
              isActive
                ? 'text-primary fw-bold text-decoration-underline'
                : 'text-dark text-decoration-none'
            }
          >
            Create Itinerary
          </NavLink>
        </div>

        {/* Mobile Hamburger (Optional Future) */}
        {/* You can add hamburger menu if you want later */}

      </div>
    </nav>
  );
}

export default Navbar;
