import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/authApi";
import {toast} from 'react-hot-toast';

const Register = () => {

 const [register,{data:userData, isSuccess, isLoading, error}] = useRegisterMutation();
 console.log('succccccsss=', userData)
  
 const navigate = useNavigate();
 
 const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo , setPhoto] = useState("");
  
 useEffect(() => {
  if(error){
    toast.error(error?.data.message)
    return
  }
 
}, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   const formData = new FormData();
   formData.append('username', username);
   formData.append('email', email);
   formData.append('password', password);
   formData.append('photo', photo)
   try {
   await register(formData).unwrap();
   toast.success("Register successfully!");
   navigate("/login");
} catch(err){
   toast.error(err?.data?.message);
}
  }

  
 
  return (
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-md-3 shadow-lg mx-auto rounded">
        <form onSubmit={handleSubmit} className="p-5">
          <h3 className="text-center text-success">Register</h3>
          
          <div className="mb-3">

            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              required
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />

            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
             required
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

           <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Upload Photo
            </label>
            <input
              onChange={(e) => setPhoto(e.target.files[0])}
              type="file"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
<div className="flex items-center gap-3">
 <button className="bg-green-600 hover:bg-green-700 text-white font-bold rounded p-2 px-4" disabled={isLoading}>Register</button>
</div>
         
        </form>
      </div>
    </div>
  
    
  );
};

export default Register;
