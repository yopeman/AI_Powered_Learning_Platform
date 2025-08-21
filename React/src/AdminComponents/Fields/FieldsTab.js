import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FieldsTab() {
  return (
    <div className="tabs-container">
      <p className="tabs">
        <NavLink
          to='/fields/get'
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          View Fields
        </NavLink>
        <NavLink 
          to='/fields/create' 
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          Create Field
        </NavLink>
      </p>
    </div>
  );
}