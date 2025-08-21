import React from 'react';
import { Link } from 'react-router-dom';

export default function Help() {
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Help Center</h1>
      </div>
      <div className="card-body">
        <div className="detail-section">
          <h2>Frequently Asked Questions</h2>

          <div className="detail-item">
            <h3>How do I reset my password?</h3>
            <p>Go to your profile page and click on "Change Password". Follow the instructions to reset your password.</p>
          </div>

          <div className="detail-item">
            <h3>How can I update my account information?</h3>
            <p>Navigate to your profile page where you can edit your personal information and save changes.</p>
          </div>

          <div className="detail-item">
            <h3>Where can I find my certificates?</h3>
            <p>All your certificates are available in the Certificates section of the dashboard.</p>
          </div>

          <div className="detail-item">
            <h3>How do I contact support?</h3>
            <p>You can reach our support team at support@aiplp.com or through the contact form on our website.</p>
          </div>

          <div className="button-group" style={{ marginTop: '30px' }}>
            <Link to="/home/about">
            <button className="primary-btn">Contact Support</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}