import React from 'react'
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Home, User, Settings, Phone } from "lucide-react";

const Sidebar = ({menuItems, isOpen, setIsOpen, logOut}) => {

   const [open, setOpen] = useState(false);

   const isActive = useLocation().pathname
   console.log('isActive=', isActive)
  return (
     <div >
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 border"
        style={{
          width: isOpen ? "220px" : "60px",
          minHeight: "100vh",
          transition: "0.3s",
        }}
      >
        <button
          className="btn btn-outline-light mb-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "<<" : ">>"}
        </button>

        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item my-2">
              <NavLink
               style={{textDecoration:"none"}}
                onClick={item.action && logOut}
                to={item.path}
                className={`d-flex flex text-black items-center ${item.path==isActive?'bg-amber-500 p-1 rounded':''}`}
              >
                <i className={`bi ${item.icon} me-2 `}>{item.icon}</i>
                {isOpen && item.name}
              </NavLink>
             
            </li>
          ))}
          
        </ul>
      </div>

      {/* Main Area */}
      
    </div>

  )
}

export default Sidebar