import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../features/Authcontext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  
  const cart = useSelector((state)=>state.cart);
  const [user , setUser] = useState(null);
 
  const { logOut } = useContext(UserContext);
 
  
  


  useEffect(()=>{
    let parsedUser = localStorage.getItem('user');
   if(parsedUser!=='undefined'){
     setUser(JSON.parse(parsedUser));
   }
  },[localStorage.getItem('user')])

  console.log('USER==', user)

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
          <Link to='/cartpage' className="hover:text-blue-600 cursor-pointer">Cart({cart?.cart?.length})</Link>
          
          {
            user && (
               <Link to={"/userOrder"}>
                <li className="hover:text-blue-600 cursor-pointer">My orders</li>
               </Link>
            )
          }
         
          {
            !user?(<button onClick={()=>navigate('/login')} className="bg-green-600 text-white px-3 rounded">Login</button>):(
<span>
            <li onClick={()=>setDropdown(!dropDown)} className="relative cursor-pointer"><img className="w-15" src={user?.photo} alt="user" /></li>
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

          <Link onClick={()=>setOpen(false)} to='/cartpage' className="hover:text-blue-600 cursor-pointer">Cart({cart?.cart?.length})</Link>
          {
            user && (
               <Link to={"/userOrder"}>
                <li className="hover:text-blue-600 cursor-pointer">My orders</li>
               </Link>
            )
          }
          
          {
            !user?(<button onClick={()=>navigate('/login')} className="bg-green-600 w-36 text-white px-3 rounded">Login</button>):(
<span>
            <li onClick={()=>setDropdown(!dropDown)} className="relative cursor-pointer"><img className="w-15" src={user?.photo} alt="user" /></li>
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
      </div>

     
    </nav>

  
  );
};

export default Header;
