import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { useUpdateUserMutation } from "../../redux/authApi";
import axios from "axios";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("userrr", user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  // const {updateInfo} = useContext(UserContext);

  const [updateUser, { data: updateUserInfo }] = useUpdateUserMutation();

  const updateInfo = async (e) => {
    e.preventDefault();
    let id = user?._id;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("photo", photo);
    
    const res = await updateUser({ id, userInfo: formData });
    localStorage.setItem('user', JSON.stringify(res?.data.updated))
    console.log('RES==', res)
  };

  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
  }, []);

  return (
    <>
      <div className="w-96 shadow-xl mx-auto mt-20 p-3">
        <img className="mx-auto w-25 " src={user?.photo} alt="" />
        <p className="text-center">{user?.username}</p>
        <p className="text-center">{user?.email}</p>
        <button
          data-bs-toggle="modal"
          data-bs-target="#updateUserModal"
          className="bg-green-700 text-white p-2 px-4 rounded"
        >
          Edit
        </button>
      </div>

      <Modal
        id="updateUserModal"
        title="Edit Product"
        saveText="Update"
        onSave={updateInfo}
      >
        <form onSubmit={updateInfo}>
          <div className="flex">
            <span className="bg-yellow-100">
              <img id="photo" src={user?.photo} alt="" />
              <input
                onChange={(e) => setPhoto(e.target.files[0])}
                id="photo"
                type="file"
              />
            </span>
            <div>
              <div>
                <input
                  className="bg-gray-100"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  placeholder="username"
                  type="text"
                />
              </div>
              <div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="border-0 bg-grey-100 p-1 rounded"
                  placeholder="email"
                  type="text"
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UserProfile;
