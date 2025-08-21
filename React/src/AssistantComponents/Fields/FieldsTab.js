import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function FieldsTab() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="tabs">
      <Link 
        to='/fields/me' 
        className={`tab ${isActive('/fields/me') ? 'active' : ''}`}
      >
        My Fields
      </Link>
      <Link 
        to='/fields/get' 
        className={`tab ${isActive('/fields/get') ? 'active' : ''}`}
      >
        All Fields
      </Link>
    </div>
  );
}