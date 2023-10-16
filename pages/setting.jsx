import React from "react";
import { Line } from "react-chartjs-2";

const setting = () => {
  return (
    <>
      <div>

        <h1 className="text-4xl text-bold mb-10">Profile settings</h1>
       <div className="flex  bg-white  w-full">
        <div className="p-6 mt-16 w-3/12">
        
         <h1 className="text-2xl hover:text-sky-600 my-5 border border-white p-2 hover:border hover:p-2 hover:bg-gray-200 hover:w-full text-gray-500 rounded-lg cursor-pointer">Profile</h1>
        
          <h1 className="text-2xl my-5 border hover:text-sky-600 border-white p-2 hover:border hover:p-2 hover:bg-gray-200 hover:w-full text-gray-500 rounded-lg cursor-pointer">Profile Setting</h1>
        </div>
        <div className="  rounded-lg w-8/12 p-6 mt-10">
          <div className="flex">
            <div className=" w-10/12">
              <div className="flex w-10/12 my-10">
                <input
                  type="text"
                  placeholder="First Name"
                  className="rounded-lg p-4 ml-2 w-6/12 border"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="rounded-lg p-4 ml-2 w-6/12 border"
                />
              </div>

              <div className="flex w-10/12 my-10">
                <input
                  type="text"
                  placeholder="Email"
                  className="rounded-lg p-4 ml-2 w-6/12 border"
                />
                <input
                  type="number"
                  placeholder="Phone"
                  className="rounded-lg p-4 ml-2 w-6/12 border"
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="rounded-lg p-4 ml-2 w-10/12 border "
              />
              <br />

              <button className="p-3 rounded-lg bg-blue-600 text-white my-5 mx-2 ">
                Save Change
              </button>
            </div>
            <div className="flex justify-center w-3/12  ">
              <img
                src="/user.png"
                className="mx-auto rounded-[50%] mb-4 h-min  my-10"
              />
            </div>
          </div>

          <hr />
          <div className="flex  my-5">
            <div className="border p-5 rounded-md bg-gray-100 mr-10 ">
              <button
                type="submit"
                className="p-3 bg-white rounded-lg text-green-800 hover:bg-green-200 float-right"
              >
                Change
              </button>
              <h1>Password</h1>
              <p className="text-gray-600 w-10/12 my-2">
                You can reset or change your password by clicking here
              </p>
            </div>
            <div className="border p-5 rounded-md bg-gray-100 ">
              <button
                type="submit"
                className="p-3 bg-white rounded-lg text-red-800 hover:bg-red-200 cursor-pointer float-right "
              >
                Deactivate
              </button>
              <h1>Remove account</h1>
              <p className="text-gray-600 w-10/12 my-2">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
          </div>
        </div>
       </div>
      </div>
    </>
  );
};

export default setting;
