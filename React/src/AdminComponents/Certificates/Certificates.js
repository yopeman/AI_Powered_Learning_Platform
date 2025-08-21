import React from 'react';
import CertificatesTab from './CertificatesTab';
import { Outlet } from 'react-router-dom';
import GetCertificates from "./GetCertificates";

export default function Certificates() {
  return (
    <div className="certificates-container">
      <GetCertificates />
      {/*<div className="certificates-header">*/}
      {/*  <h1 className="certificates-title">Certificates Management</h1>*/}
      {/*  <CertificatesTab />*/}
      {/*</div>*/}
      {/*<div className="certificates-content">*/}
      {/*  <Outlet />*/}
      {/*</div>*/}
    </div>
  );
}