import React from 'react'
import { NavLink } from "react-router-dom";

export default function AmountsTab() {
  return (
    <div className="tabs-container">
      <p className="tabs">
        <NavLink 
          to='/amounts/get' 
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          View Amount
        </NavLink>
        <NavLink 
          to='/amounts/update' 
          className={({isActive}) => isActive ? "tab active" : "tab"}
        >
          Update Amount
        </NavLink>
      </p>
    </div>
  )
}