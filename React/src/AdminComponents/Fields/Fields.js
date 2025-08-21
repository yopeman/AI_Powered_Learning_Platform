import React from 'react';
import FieldsTab from './FieldsTab';
import { Outlet } from 'react-router-dom';
import GetFields from "./GetFields";

export default function Fields() {
  return (
    <div className="fields-container">
      <GetFields />
      {/*<div className="fields-header">*/}
      {/*  <h1 className="fields-title">Field Management</h1>*/}
      {/*  <FieldsTab />*/}
      {/*</div>*/}
      {/*<div className="fields-content">*/}
      {/*  <Outlet />*/}
      {/*</div>*/}
    </div>
  );
}