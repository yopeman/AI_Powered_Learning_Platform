import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopicsTab() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="tabs">
      <Link className='tab active'>Topics</Link>
      {/* <Link 
        to={`/topics/list/${location.pathname.split('/')[2] || ''}`} 
        className={`tab ${isActive('/topics/list') ? 'active' : ''}`}
      >
        Topic List
      </Link>
      <Link 
        to={`/topics/create/${location.pathname.split('/')[2] || ''}`} 
        className={`tab ${isActive('/topics/create') ? 'active' : ''}`}
      >
        Create Topics
      </Link> */}
    </div>
  );
}