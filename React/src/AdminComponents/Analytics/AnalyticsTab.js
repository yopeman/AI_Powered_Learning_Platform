import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AnalyticsTab() {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[2] || 'fields';

  const analyticsTabs = [
    { id: 'fields', label: 'Field Analytics', path: '/analytics/fields' },
    { id: 'topics', label: 'Topic Analytics', path: '/analytics/topics' },
    { id: 'subscriptions', label: 'Subscription Analytics', path: '/analytics/subscriptions' },
    { id: 'payments', label: 'Payment Analytics', path: '/analytics/payments' },
    { id: 'users', label: 'User Analytics', path: '/analytics/users' },
    { id: 'feedbacks', label: 'Feedback Analytics', path: '/analytics/feedbacks' },
    { id: 'certifications', label: 'Certification Analytics', path: '/analytics/certifications' }
  ];

  return (
    <div className="tabs-container">
      <p className="tabs">
        {analyticsTabs.map(tab => (
          // <li key={tab.id}>
            <Link 
              to={tab.path} 
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </Link>
          // </li>
        ))}
      </p>
    </div>
  );
}