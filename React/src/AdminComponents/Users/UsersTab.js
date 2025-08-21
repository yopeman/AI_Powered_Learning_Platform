import React from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';

export default function UsersTab() {
  const location = useLocation();
  // const activeTab = location.pathname.split('/')[2] || 'create';

  return (
    <div className="tabs-container">
      <p className="tabs">
        <NavLink
          to='/users/get'
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          View Users
        </NavLink>
        <NavLink
          to='/users/create'
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          Create User
        </NavLink>
      </p>
    </div>
  );
}