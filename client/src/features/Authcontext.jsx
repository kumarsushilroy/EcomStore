import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();


export const UseContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(()=>{
  //    const savedUser = localStorage.getItem('user');
  //    if(savedUser) setUser(JSON.parse(savedUser));
  // },[])

  
  // useEffect(()=>{
  //   if(!user) return ;
  //     if(user?.role=='admin'){
  //      navigate('/admin-dashboard')
  //    }else{
  //      navigate('/home')

  //    }
  // },[user])
  

  // const login = async (userInfo) => {
   
  //   try {
  //     let loginUser = await axios.post(
  //       "http://localhost:4000/api/v1/login",
  //       userInfo,
  //       { withCredentials: true }
  //     );
  //     console.log("loginnn", loginUser);
  //     if (loginUser?.data?.success == true) {
  //       localStorage.setItem("user", JSON.stringify(loginUser.data.user));
  //       setUser(loginUser?.data?.user);
  //     }
  //   } catch (error) {
  //     if (error) {
  //       alert(error.message);
  //     }
  //   }
  // };


  // Logout
   const logOut = async () => {
    const resp = await axios.post("http://localhost:4000/api/v1/logout", null, {
      withCredentials: true,
    });
    localStorage.removeItem('user')
    setUser(null);
    navigate("/");
  };

const updateInfo = async (userInfo, userId)=>{
 const res = await axios.put(`http://localhost:4000/api/v1/update-user/${userId}`, userInfo, {
  withCredentials:true
 });
 localStorage.setItem('user', JSON.stringify(res?.data.updated))
}

  return (
    <UserContext.Provider value={{ user, logOut, updateInfo }}>
      {children}
    </UserContext.Provider>
  );
};
