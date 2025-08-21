import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';

export default function HomesTab() {
  const location = useLocation();
  // const activeTab = location.pathname.split('/')[2] || 'about';

  return (
    <div className="tabs-container">
      <p className="tabs">
          <NavLink
            to="/home/about"
            className={({isActive}) => isActive ? "tab active" : "tab"}
          >
            About
          </NavLink>
          <NavLink
            to="/home/help"
            className={({isActive}) => isActive ? "tab active" : "tab"}
          >
            Help
          </NavLink>
      </p>
    </div>
  );
}