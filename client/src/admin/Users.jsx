import React from "react";
import { useAllUsersQuery, useUpdateUserMutation } from "../../redux/authApi";

const Users = () => {
  const { data: allUsers, isLoading, isSuccess } = useAllUsersQuery();
  const [updateUser, { data }] = useUpdateUserMutation();

  const changeRole = async (role, id) => {
    await updateUser({ role, id });
  };

  console.log("allUsssr==", allUsers);
  return (
    <div>
      
      <table className="table p-5 overflow-y-scroll">
        <thead>
          <tr>
            <th scope="col">Profile</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
