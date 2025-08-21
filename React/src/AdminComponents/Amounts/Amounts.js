import React from 'react'
import AmountsTab from './AmountsTab';
import { Outlet } from 'react-router-dom';
import GetAmounts from "./GetAmounts";

export default function Amounts() {
  return (
    <div className="amounts-container">
      <GetAmounts />
      {/*<div className="amounts-header">*/}
      {/*  <h1 className="amounts-title">Amount Management</h1>*/}
      {/*  <AmountsTab />*/}
      {/*</div>*/}
      {/*<div className="amounts-content">*/}
      {/*  <Outlet />*/}
      {/*</div>*/}
    </div>
  )
}