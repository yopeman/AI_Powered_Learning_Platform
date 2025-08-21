import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CoursesTab() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="tabs">
      <Link className='tab active'>Courses</Link>
      {/* <Link 
        to='/courses' 
        className={`tab ${isActive('/courses') && !isActive('/courses/create') ? 'active' : ''}`}
      >
        All Courses
      </Link>
      <Link 
        to={`/courses/create/${location.pathname.split('/')[2] || ''}`} 
        className={`tab ${isActive('/courses/create') ? 'active' : ''}`}
      >
        Create Course
      </Link> */}
    </div>
  );
}