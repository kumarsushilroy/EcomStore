import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserLoginMutation } from "../../redux/authApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {

  
 const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const userInfo = { email, password };


  const [userLogin, {isLoading,  error}] = useUserLoginMutation();

  // const stringifiedData = localStorage.getItem('user');
  // if(stringifiedData && stringifiedData!==undefined){
  //   setUser(JSON.parse(stringifiedData));
  // }
  
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
          <button onClick={()=>navigate('/')} className="bg-blue-50 px-4 rounded">back</button>
          <h3 className="text-center text-success">Login</h3>
           <p className="font-bold m-0">admin credential</p>
           <p className="m-0">email: admin@gmail.com</p>
           <p className="m-0">password: admin123</p>

           <h1 className="my-3"></h1>
           <p className="font-bold m-0">user credential</p>
           <p className="m-0">email: suryas@gmail.com</p>
           <p className="m-0">password: suryas123</p>

          <div className="mb-3 mt-4">
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
