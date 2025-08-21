import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomesTab from '../Homes/HomesTab';
import FieldsTab from "../../Fields/FieldsTab";
import CoursesTab from "../../Courses/CoursesTab";
import ChaptersTab from "../../Chapters/ChaptersTab";
import TopicsTab from "../../Topics/TopicsTab";

export default function MenuTabs() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomesTab />} />
        <Route path='/home/*' element={<HomesTab />} />
        <Route path='/fields/*' element={<FieldsTab />} />
        <Route path='/courses/*' element={<CoursesTab />} />
        <Route path='/chapters/*' element={<ChaptersTab />} />
        <Route path='/topics/*' element={<TopicsTab />} />
      </Routes>
    </div>
  )
}
