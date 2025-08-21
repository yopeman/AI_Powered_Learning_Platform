import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AssistantsTab() {
  return (
    <div className="tabs-container">
      <p className="tabs">
        <NavLink
          to='/assistants/get'
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          View Assistants
        </NavLink>
        <NavLink 
          to='/assistants/create' 
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          Create Assistant
        </NavLink>
      </p>
    </div>
  );
}