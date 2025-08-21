import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ChaptersTab() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="tabs">
      <Link className='tab active'>Chapters</Link>
      {/* <Link 
        to={`/chapters/list/${location.pathname.split('/')[2] || ''}`} 
        className={`tab ${isActive('/chapters/list') ? 'active' : ''}`}
      >
        Chapter List
      </Link>
      <Link 
        to={`/chapters/create/${location.pathname.split('/')[2] || ''}`} 
        className={`tab ${isActive('/chapters/create') ? 'active' : ''}`}
      >
        Create Chapters
      </Link> */}
    </div>
  );
}