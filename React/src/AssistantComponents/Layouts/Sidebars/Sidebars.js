import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome, FiUsers, FiBook, FiAward, FiBarChart2,
  FiDollarSign, FiMessageSquare, FiHelpCircle, FiBookOpen,
  FiUser,
  FiUserX,
  FiUserPlus
} from 'react-icons/fi';

export default function Sidebars() {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const isActive = (path) => location.pathname.includes(path);

  const menuItems = [
    // { path: '/', label: 'Dashboard', icon: <FiHome size={20} /> },
    { path: '/fields/me', label: 'My Fields', icon: <FiBookOpen size={20} /> },
    { path: '/fields/get', label: 'All Fields', icon: <FiBook size={20} /> },
    { path: '/profile', label: 'Profiles', icon: <FiUser size={20} /> },
  ];

  return (
    <aside className={`side-bar ${expanded ? 'active' : ''}`}>
      <div style={{ padding: '20px 16px' }}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <div className="logo" style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FiHome size={28} /> AiPLP
          </div>
        </Link>

        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map(item => (
              <li key={item.path} style={{ marginBottom: '8px' }}>
                <Link
                  to={item.path}
                  className="tab"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive(item.path) ? '#4F46E5' : '#e2e8f0',
                    backgroundColor: isActive(item.path) ? '#1a202c' : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ marginRight: '12px' }}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}