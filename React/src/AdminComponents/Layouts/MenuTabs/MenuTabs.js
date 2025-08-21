import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomesTab from '../Homes/HomesTab';
import UsersTab from '../../Users/UsersTab';
import FieldsTab from '../../Fields/FieldsTab';
import AssistantsTab from '../../Assistants/AssistantsTab';
import AnalyticsTab from '../../Analytics/AnalyticsTab';
import AmountsTab from "../../Amounts/AmountsTab";
import FeedbacksTab from "../../Feedbacks/FeedbacksTab";
import CertificatesTab from "../../Certificates/CertificatesTab";

export default function MenuTabs() {
  return (
    <div className="top-tab">
      <Routes>
        <Route path='/' element={<HomesTab />} />
        <Route path='/home/*' element={<HomesTab />} />
        <Route path='/users/*' element={<UsersTab />} />
        <Route path='/fields/*' element={<FieldsTab />} />
        <Route path='/assistants/*' element={<AssistantsTab />} />
        <Route path='/amounts/*' element={<AmountsTab />} />
        <Route path='/feedbacks/*' element={<FeedbacksTab />} />
        <Route path='/certificates/*' element={<CertificatesTab />} />
        <Route path='/analytics/*' element={<AnalyticsTab />} />
      </Routes>
    </div>
  );
}