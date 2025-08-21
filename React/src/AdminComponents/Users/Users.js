import React from 'react';
import UsersTab from './UsersTab';
import GetUsers from "./GetUsers";

export default function Users() {
  return (
    <div className="card">
      <GetUsers />
      {/*<div className="card-header">*/}
      {/*  <h1 className="card-title">User Management</h1>*/}
      {/*</div>*/}
      {/*<div className="card-body">*/}
      {/*  <UsersTab />*/}
      {/*</div>*/}
    </div>
  );
}