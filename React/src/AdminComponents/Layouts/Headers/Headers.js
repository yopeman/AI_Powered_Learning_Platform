import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './../../Components.css'; // Assuming you have a separate CSS file for styles

export default function Headers() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNextPage = () => navigate(1);
  const handlePreviousPage = () => navigate(-1);

  return (
    <header className="header">
      <center>
      <nav className="navigation">
        <button 
          onClick={handlePreviousPage} 
          className="nav-button"
          aria-label="Go back"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <button 
          onClick={handleNextPage} 
          className="nav-button"
          aria-label="Go forward"
        >
          <i className="fas fa-arrow-right"></i>
        </button>
        <Link to="/" className="logo">
          <h1>AI Powered Learning Platform</h1>
          <p>Admin Dashboard Panel</p>
        </Link>
        <Link to="/profile" className="profile-link">
            <i className="fas fa-user-circle"></i> Profile
        </Link>
      </nav>
      </center>
    </header>
  );
}