import React from 'react';
import AssistantsTab from './AssistantsTab';
import { Outlet } from 'react-router-dom';
import GetAssistants from "./GetAssistants";

export default function Assistants() {
  return (
    <div className="assistants-container">
      <GetAssistants />
      {/*<div className="assistants-header">*/}
      {/*  <h1 className="assistants-title">Field Assistants Management</h1>*/}
      {/*  <AssistantsTab />*/}
      {/*</div>*/}
      {/*<div className="assistants-content">*/}
      {/*  <Outlet />*/}
      {/*</div>*/}
    </div>
  );
}