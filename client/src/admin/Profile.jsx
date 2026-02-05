import React from 'react'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) 
  console.log('user==', user)
  return (
    <div className='container'>
      <div className="row">
      <div className="col-md-8 w-full mx-auto mt-5 shadow">
        <div className='d-flex justify-content-around align-items-center'>
           <div><img src={user?.photo} alt="" /></div>
           <span>
            <div className='d-flex align-items-center'>Name:<span className='fw-bold'>{user?.username}</span></div>
        <div>Email: <span className='fw-bold'>{user?.email}</span></div>
        <div>Role: <span className='fw-bold'>{user?.role}</span></div>
           </span>
        </div>
       
        
      </div>
    </div>
    </div>
  )
}

export default Profile