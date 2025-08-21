import React from 'react';

export default function AnalyticsCard({ title, items }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
      </div>
      <div className="card-body">
        <div className="detail-grid">
          {items.map((item, index) => (
            <div className="detail-item" key={index}>
              <div className="detail-label">{item.label}</div>
              <div className="detail-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}