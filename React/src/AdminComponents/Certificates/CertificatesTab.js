import React from 'react';
import { NavLink } from 'react-router-dom';

export default function CertificatesTab() {
  return (
    <div className="tabs-container">
      <p className="tabs">
        <NavLink 
          to='/certificates/get' 
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          View Certificates
        </NavLink>
      </p>
    </div>
  );
}