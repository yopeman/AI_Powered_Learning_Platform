import React from 'react';
import FeedbacksTab from './FeedbacksTab';
import { Outlet } from 'react-router-dom';
import GetFeedbacks from "./GetFeedbacks";

export default function Feedbacks() {
  return (
    <div className="feedbacks-container">
      <GetFeedbacks />
      {/*<div className="feedbacks-header">*/}
      {/*  <h1 className="feedbacks-title">User Feedback Management</h1>*/}
      {/*  <FeedbacksTab />*/}
      {/*</div>*/}
      {/*<div className="feedbacks-content">*/}
      {/*  <Outlet />*/}
      {/*</div>*/}
    </div>
  );
}