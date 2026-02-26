import React from "react";
import { useAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation, useUpdateRoleMutation  } from "../../redux/authApi";
import {toast}  from 'react-hot-toast';

const Users = () => {
  const { data: allUsers, isLoading, isSuccess } = useAllUsersQuery();
  const [updateUser, { data }] = useUpdateUserMutation();
  const [deleteUser, {data:deletedUser, isSuccess:deleteUserSuccess, isLoading:deleteUserLoading}] = useDeleteUserMutation();
  const [updateRole] = useUpdateRoleMutation();
  console.log('deleteduserrr==', deletedUser)

  const changeRole = async (role, id) => {
    const obj = { role, id }
    await updateRole(obj);
   
  };

  // const handleUserDelete = async(id)=>{
  //  await deleteUser(id);
  //  if(deleteUserSuccess){
  //     toast.success(deletedUser?.message || 'user deleted')
  //  }
  // }

  const handleUserDelete = async (id) => {
  try {
    const res = await deleteUser(id).unwrap();
    toast.success(res.message || "User deleted");
  } catch (error) {
    toast.error(error?.data?.message || "Delete failed");
  }
};

 
  return (
    <div>
      
      <table className="table p-5 overflow-y-scroll">
        <thead>
          <tr>
            <th scope="col">Profile</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.users?.map((item, i) => (
            <tr>
              <td>
                <img className="w-16" src={item.photo} alt="photo" />
              </td>
              <td>{item.username}</td>
              <td>{item.email}</td>

              <td>
                <select
                  value={item.role}
                  onChange={(e) => changeRole(e.target.value, item._id)}
                  className="border outline-0"
                  name=""
                  id=""
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td><button disabled={deleteUserLoading} onClick={()=>{handleUserDelete(item._id)}} className="bg-red-600 hover:bg-red-700 transition-all p-1 px-3 rounded text-white font-bold">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
