"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";

const PasswordChange = ({ _id }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://e-commerce-backend-brown.vercel.app/api/auth/updatePassword",
        {
          _id,
          currentPassword,
          newPassword,
          
        }
  //       {
  //         Authorization: `Bearer ${token}`,
  // 'Content-Type': 'application/json',
  //       }
      );

      if (response.status === 201 ) {
        setMessage("Password changed successfully.");
      } else {
        setMessage("Password change failed: " + response.data.error);
      }
      console.log(response);
    } catch (error) {
      setMessage(
        "An error occurred while changing the password: " + error.message + " !"
      );
    }
  };
  console.log("hhh", _id);
  
  return (
    <>
      <div className="flex bg-white ml-5 ">
        <div className="w-6/12">
          <div className="bg-white  p-5  ">
            <h1 className="text-[25px] m-10 mt-0">Change Password</h1>

            <form onSubmit={handleSubmit}>
            {/* <PasswordChange _id = {userId}/> */}
              <div className="my-16">
                <div className=" mb-3 ">
                  <label className="absolute mt-6 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border p-4 relative rounded-lg m-10 w-full"
                    required
                  />
                </div>

                <div className=" mb-3 ">
                  <label className="absolute mt-6 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border p-4 relative rounded-lg m-10 w-full"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mx-10 border py-2 px-5 bg-sky-600 text-white rounded-lg text-[22px]"
                >
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
      <div id="message" className="m-3 ml-6 text-red-700">
        {message}
      </div>
    </>
  );
};

export default PasswordChange;
