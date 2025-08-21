import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homes from './Homes/Homes';
import Help from "./Homes/Help";
import About from "./Homes/About";
import PageNotFound from '../Layouts/Errors/PageNotFound';
import GetAllFields from "../Fields/GetAllFields";
import GetFieldsById from "../Fields/GetFieldsById";
import GetMyFields from "../Fields/GetMyFields";
import CreateCourses from "../Courses/CreateCourses";
import GetCourses from "../Courses/GetCourses";
import GetCoursesById from "../Courses/GetCoursesById";
import UpdateCourses from "../Courses/UpdateCourses";
import DeleteCourses from "../Courses/DeleteCourses";
import CreateChapters from "../Chapters/CreateChapters";
import GetChapters from "../Chapters/GetChapters";
import GetChaptersById from "../Chapters/GetChaptersById";
import UpdateChapters from "../Chapters/UpdateChapters";
import DeleteChapters from "../Chapters/DeleteChapters";
import CreateTopics from "../Topics/CreateTopics";
import GetTopics from "../Topics/GetTopics";
import GetTopicsById from "../Topics/GetTopicsById";
import UpdateTopics from "../Topics/UpdateTopics";
import DeleteTopics from "../Topics/DeleteTopics";
import Fields from "../Fields/Fields";
import Courses from "../Courses/Courses";
import Chapters from "../Chapters/Chapters";
import Topics from "../Topics/Topics";

export default function Layouts() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homes />} />
        <Route path='/home' element={<Homes />} />
        <Route path='/Home/help' element={<Help />} />
        <Route path='/Home/about' element={<About />} />

        <Route path='/fields' element={<Fields />} />
        <Route path='/fields/get' element={<GetAllFields />} />
        <Route path='/fields/me' element={<GetMyFields />} />
        <Route path='/fields/get/:id' element={<GetFieldsById />} />

        <Route path='/courses' element={<Courses />} />
        <Route path='/courses/create/:fieldId' element={<CreateCourses />} />
        <Route path='/courses/list/:fieldId' element={<GetCourses />} />
        <Route path='/courses/get/:id' element={<GetCoursesById />} />
        <Route path='/courses/update/:id' element={<UpdateCourses />} />
        <Route path='/courses/delete/:id' element={<DeleteCourses />} />

        <Route path='/chapters' element={<Chapters />} />
        <Route path='/chapters/create/:courseId' element={<CreateChapters />} />
        <Route path='/chapters/list/:courseId' element={<GetChapters />} />
        <Route path='/chapters/get/:id' element={<GetChaptersById />} />
        <Route path='/chapters/update/:id' element={<UpdateChapters />} />
        <Route path='/chapters/delete/:id' element={<DeleteChapters />} />

        <Route path='/topics' element={<Topics />} />
        <Route path='/topics/create/:chapterId' element={<CreateTopics />} />
        <Route path='/topics/list/:chapterId' element={<GetTopics />} />
        <Route path='/topics/get/:id' element={<GetTopicsById />} />
        <Route path='/topics/update/:id' element={<UpdateTopics />} />
        <Route path='/topics/delete/:id' element={<DeleteTopics />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
