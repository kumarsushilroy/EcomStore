import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserLoginMutation } from "../../redux/authApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {

  
 const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userInfo = { email, password };

  const [userLogin, {isLoading,  error}] = useUserLoginMutation();
  const stringifiedData = localStorage.getItem('user');
  let user = stringifiedData?JSON.parse(stringifiedData):null
  console.log('userrr=', user)
 useEffect(() => {
  if(error){
    alert(error?.data.message)
    return
  }
 
}, [error]);

  
  // let parsedUser;
  // parsedUser = JSON.parse(localStorage.getItem('user'));
  // console.log('parsedUserr', parsedUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInf = await userLogin(userInfo)
    console.log('userInfoff', userInf)
    localStorage.setItem('user', JSON.stringify(userInf?.data.user))
    let parsedUser = JSON.parse(localStorage.getItem('user'))
    if(parsedUser?.role=='admin'){
      navigate('/admin-dashboard')
    }else{
      navigate('/')
    }
     
   
  }

  
 
  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-md-3 shadow-lg mx-auto rounded">
        <form onSubmit={handleSubmit} className="p-5">
          <h3 className="text-center text-success">Login</h3>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
<div className="flex items-center gap-3">
  <button disabled={isLoading} type="submit" className="btn btn-success">
           {isLoading?'Loging....':'Login'}
          </button>
 <Link to='/register'>Register</Link>
</div>
         
        </form>
      </div>
    </div>
  
    
  );
};

export default Login;
