import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="card" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div className="card-header">
        <h1 className="card-title">Page Not Found</h1>
      </div>
      <div className="card-body">
        <div className="detail-view">
          <div className="detail-section">
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h2 style={{ fontSize: '72px', margin: '0', color: '#4F46E5' }}>404</h2>
              <p style={{ fontSize: '24px', marginBottom: '30px' }}>Oops! The page you're looking for doesn't exist.</p>
              <div className="button-group" style={{ justifyContent: 'center' }}>
                <Link to="/" className="primary-btn">
                  Go to Homepage
                </Link>
                <button className="secondary-btn" onClick={() => window.history.back()}>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}