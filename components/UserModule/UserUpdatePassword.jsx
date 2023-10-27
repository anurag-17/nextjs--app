import React from "react";
import axios from "axios";
import { useState } from "react";

const UserUpdatePassword = () => {



  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    _id: "",
  });

  axios
    .post(
      "https://e-commerce-backend-brown.vercel.app/api/auth/updatePassword",
      {
        
      
      },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.33.0",
        },
      }
    )
    .then((res) => {
      console.log("Password updated successfully");
    })
    .catch((error) => {
      console.error(error);
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div>
        <div className="flex bg-white ml-5 ">
          <div className="w-6/12">
            <div className="bg-white  p-5  ">
              <h1 className="text-[25px] m-10 mt-0">Change Password</h1>

              <form>
                <div className="my-16">
                  <div className=" mb-3 ">
                    <label className="absolute mt-6 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                      Current Password
                    </label>
                    <input
                      type="text"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="border p-4 relative rounded-lg m-10 w-full"
                      required
                    />
                  </div>

                  <div className=" mb-3 ">
                    <label className="absolute mt-6 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                      New Password
                    </label>
                    <input
                      type="text"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="border p-4 relative rounded-lg m-10 w-full"
                      required
                    />
                  </div>

                  <button className="mx-10 border py-2 px-5 bg-sky-600 text-white rounded-lg text-[22px]">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-6/12 my-auto">
            <img src="/changePassword.png" className="w-9/12 mx-auto"></img>
          </div>
        </div>
        <div id="message" className="m-3 ml-6 text-red-700"></div>
      </div>
    </>
  );
};
export default UserUpdatePassword;
