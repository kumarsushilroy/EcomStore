import React, { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import { useContext } from 'react'
import { UserContext } from '../features/Authcontext'

const UserProfile = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    console.log('userrr', user)
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');

    const {updateInfo} = useContext(UserContext);
    const obj = {username,email};
    
    useEffect(()=>{
       setUsername(user?.username);
        setEmail(user?.email);
    },[])

    

  return (
    <>
    <div className='w-96 shadow-xl mx-auto mt-20 p-3'>
        <img className='mx-auto w-25 ' src={user?.photo} alt="" />
        <p className='text-center'>{user?.username}</p>
        <p className='text-center'>{user?.email}</p>
        <button data-bs-toggle="modal"  data-bs-target="#updateUserModal" className='bg-green-700 text-white p-2 px-4 rounded '>Edit</button>
    </div>

     <Modal
              id="updateUserModal"
              title="Edit Product"
              saveText="Update"
              onSave={()=>(updateInfo(obj,user._id))}
              
            >
              {/* Modal Body Content Comes Here */}
               
    
              <form>
                <div>
                    <input className='bg-gray-100' onChange={(e)=>setUsername(e.target.value)} value={username} className='border-0 bg-grey-100 p-1 rounded' placeholder='username' type="text" />
                </div>
                <div>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border-0 bg-grey-100 p-1 rounded' placeholder='email' type="text" />
                </div>
              </form>
    
             
    
              
             
            </Modal>

            </>
    
  )
}

export default UserProfile