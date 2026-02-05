import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../features/Authcontext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  
  const { user, logOut } = useContext(UserContext);

  let cart = localStorage.getItem('cartItem');
  cart = JSON.parse(cart)
  
  let userr = null ;
  let parsedUser = localStorage.getItem('user');
  userr = parsedUser?JSON.parse(parsedUser):null

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [dropDown, setDropdown] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md  top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h4 className="text-2xl font-bold text-blue-600">MyLogo</h4>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">About</li>
          <Link to='/cartpage' className="hover:text-blue-600 cursor-pointer">Cart({cart?.length})</Link>
          
          {
            userr && (
               <Link to={"/userOrder"}>
                <li className="hover:text-blue-600 cursor-pointer">My orders</li>
               </Link>
            )
          }
         
          {
            !userr?(<button onClick={()=>navigate('/login')} className="bg-green-600 text-white px-3 rounded">Login</button>):(
<span>
            <li onClick={()=>setDropdown(!dropDown)} className="relative cursor-pointer"><img className="w-15" src={userr?.photo} alt="user" /></li>
            {dropDown && (
              <ul className="absolute py-3 px-0 gap-1 flex flex-col bg-gray-100 shadow">
                <li onClick={()=>{setDropdown(!dropDown), navigate('/userProfile')}} className="px-4 hover:bg-white pointer hover:border-r-2 cursor-pointer">
                  Profile
                </li>
                <li onClick={()=>{setDropdown(!dropDown), logOut()}} className="px-4 hover:bg-white pointer hover:border-r-2 cursor-pointer">
                  Logout
                </li>
              </ul>
            )}
          </span>
            )
          }
          
          
        </ul>

        {/* Mobile Toggle Button */}
        <div className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? "X" : "Menu"}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col py-4 px-6 space-y-4 text-lg">
          <li className="hover:text-blue-600">Home</li>
          <li className="hover:text-blue-600">About</li>
          <li className="hover:text-blue-600">Services</li>
          <li className="hover:text-blue-600">Contact</li>
        </ul>
      </div>

     
    </nav>

  
  );
};

export default Header;
