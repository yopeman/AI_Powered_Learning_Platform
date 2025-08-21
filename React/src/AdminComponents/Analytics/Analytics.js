import React from 'react';
import AnalyticsTab from './AnalyticsTab';
import FieldAnalytics from './FieldAnalytics';

export default function Analytics() {
  return (
    <div className="card">
      <FieldAnalytics />
      {/*<div className="card-header">*/}
      {/*  <h1 className="card-title">Analytics Dashboard</h1>*/}
      {/*</div>*/}
      {/*<div className="card-body">*/}
      {/*  <AnalyticsTab />*/}
      {/*</div>*/}
    </div>
  );
}