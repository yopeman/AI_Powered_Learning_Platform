import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FeedbacksTab() {
  return (
    <div className="tabs-container">
      <p className="tabs">
        <NavLink 
          to='/feedbacks/get' 
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          View Feedbacks
        </NavLink>
      </p>
    </div>
  );
}