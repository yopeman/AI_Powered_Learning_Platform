import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homes from './Homes/Homes';
import Help from "./Homes/Help";
import About from "./Homes/About";

import Users from '../Users/Users';
import CreateUsers from '../Users/CreateUsers';
import GetUsers from '../Users/GetUsers';
import GetUsersById from '../Users/GetUsersById';
import UpdateUsers from '../Users/UpdateUsers';
import DeleteUsers from '../Users/DeleteUsers';

import Fields from '../Fields/Fields';
import CreateFields from '../Fields/CreateFields';
import GetFields from '../Fields/GetFields';
import GetFieldsById from '../Fields/GetFieldsById';
import UpdateFields from '../Fields/UpdateFields';
import DeleteFields from '../Fields/DeleteFields';
import SubscriptionFields from '../Fields/SubscriptionFields';
import DeleteSubscriptions from '../Fields/DeleteSubscriptions';

import Assistants from '../Assistants/Assistants';
import CreateAssistants from '../Assistants/CreateAssistants';
import GetAssistants from '../Assistants/GetAssistants';
import GetAssistantsById from '../Assistants/GetAssistantsById';
import UpdateAssistants from '../Assistants/UpdateAssistants';
import DeleteAssistants from '../Assistants/DeleteAssistants';

import Analytics from '../Analytics/Analytics';
import FieldAnalytics from '../Analytics/FieldAnalytics';
import TopicAnalytics from '../Analytics/TopicAnalytics';
import UserAnalytics from '../Analytics/UserAnalytics';
import SubscriptionAnalytics from '../Analytics/SubscriptionAnalytics';
import PaymentAnalytics from '../Analytics/PaymentAnalytics';

import Amounts from "../Amounts/Amounts";
import GetAmounts from "../Amounts/GetAmounts";
import UpdateAmounts from "../Amounts/UpdateAmounts";

import Feedbacks from "../Feedbacks/Feedbacks";
import GetFeedbacks from "../Feedbacks/GetFeedbacks";
import GetFeedbacksById from "../Feedbacks/GetFeedbacksById";
import DeleteFeedbacks from "../Feedbacks/DeleteFeedbacks";

import Certificates from "../Certificates/Certificates";
import GetCertificates from "../Certificates/GetCertificates";
import DeleteCertificates from "../Certificates/DeleteCertificates";

import PageNotFound from '../Layouts/Errors/PageNotFound';
import FeedbackAnalytics from "../Analytics/FeedbackAnalytics";
import CertificationAnalytics from "../Analytics/CertificationAnalytics";

export default function Layouts() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homes />} />
        <Route path='/home' element={<Homes />} />
        <Route path='/Home/help' element={<Help />} />
        <Route path='/Home/about' element={<About />} />

        <Route path='/users' element={<Users />} />
        <Route path='/users/create' element={<CreateUsers />} />
        <Route path='/users/get' element={<GetUsers />} />
        <Route path='/users/get/:id' element={<GetUsersById />} />
        <Route path='/users/update/:id' element={<UpdateUsers />} />
        <Route path='/users/delete/:id' element={<DeleteUsers />} />

        <Route path='/fields' element={<Fields />} />
        <Route path='/fields/create' element={<CreateFields />} />
        <Route path='/fields/get' element={<GetFields />} />
        <Route path='/fields/get/:id' element={<GetFieldsById />} />
        <Route path='/fields/subscription/:id' element={<SubscriptionFields />} />
        <Route path='/fields/subscription/delete/:id' element={<DeleteSubscriptions />} />
        <Route path='/fields/update/:id' element={<UpdateFields />} />
        <Route path='/fields/delete/:id' element={<DeleteFields />} />

        <Route path='/assistants' element={<Assistants />} />
        <Route path='/assistants/create' element={<CreateAssistants />} />
        <Route path='/assistants/get' element={<GetAssistants />} />
        <Route path='/assistants/get/:id' element={<GetAssistantsById />} />
        <Route path='/assistants/update/:id' element={<UpdateAssistants />} />
        <Route path='/assistants/delete/:id' element={<DeleteAssistants />} />

        <Route path='/analytics' element={<Analytics />} />
        <Route path='/analytics/fields' element={<FieldAnalytics />} />
        <Route path='/analytics/topics' element={<TopicAnalytics />} />
        <Route path='/analytics/users' element={<UserAnalytics />} />
        <Route path='/analytics/subscriptions' element={<SubscriptionAnalytics />} />
        <Route path='/analytics/payments' element={<PaymentAnalytics />} />
        <Route path='/analytics/feedbacks' element={<FeedbackAnalytics />} />
        <Route path='/analytics/certifications' element={<CertificationAnalytics />} />

        <Route path='/amounts' element={<Amounts />} />
        <Route path='/amounts/get' element={<GetAmounts />} />
        <Route path='/amounts/update' element={<UpdateAmounts />} />

        <Route path='/feedbacks' element={<Feedbacks />} />
        <Route path='/feedbacks/get' element={<GetFeedbacks />} />
        <Route path='/feedbacks/get/:id' element={<GetFeedbacksById />} />
        <Route path='/feedbacks/delete/:id' element={<DeleteFeedbacks />} />

        <Route path='/certificates' element={<Certificates />} />
        <Route path='/certificates/get' element={<GetCertificates />} />
        <Route path='/certificates/delete/:id' element={<DeleteCertificates />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
