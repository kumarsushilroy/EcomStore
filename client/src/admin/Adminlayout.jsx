import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import { FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { HiMiniTruck } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../features/Authcontext";

const Adminlayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logOut } = useContext(UserContext);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin-dashboard",
    },
    {
      name: "Categories",
      icon: <BiCategory />,
      path: "/admin-categories",
    },
    {
      name: "Products",
      icon: <MdProductionQuantityLimits />,
      path: "/admin-products",
    },
    {
      name: "Suppliers",
      icon: <HiMiniTruck />,
      path: "/admin-suppliers",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin-orders",
    },
    {
      name: "Users",
      icon: <FaUser />,
      path: "/admin-users",
    },
    {
      name: "Profile",
      icon: <CgProfile />,
      path: "/admin-profile",
    },
    {
      name: "Logout",
      icon: <MdLogout />,
      action: logOut,
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 shadow">
          <Sidebar
            menuItems={menuItems}
            logOut={logOut}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
      />
        </div>
        <div className="col-md-10 shadow">
          <Outlet />
        </div>
      </div>
    </div>
   
  );
};

export default Adminlayout;
