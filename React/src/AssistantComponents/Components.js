import React from 'react';
import './Components.css';
import Headers from './Layouts/Headers/Headers';
import Footers from './Layouts/Footers/Footers';
import Sidebars from './Layouts/Sidebars/Sidebars';
import MenuTabs from './Layouts/MenuTabs/MenuTabs';
import Layout from './Layouts/Layouts';

export default function Components() {
  return (
    <div className='my-container'>
      <div className='header'>
        <Headers />
      </div>
      <div className='main-container'>
        <div className='side-bar'>
          <Sidebars />
        </div>
        <div className='main-box'>
          <div className='top-tab'>
           <MenuTabs />
          </div>
          <div className='main-content'>
            <Layout />
          </div>
        </div>
      </div>
      <div className='footer'>
        <Footers />
      </div>
    </div>
  );
}
