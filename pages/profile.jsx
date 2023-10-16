import React from "react";

const profile = () => {
  return (
    <>
      <div>
        <div className="flex my-auto ml-10">
          <div className=" w-1/12">
            <img src="/user.png" className="rounded-[50%] w-full  mb-0" />
            <p className="text-blue-600 text-xl mx-8 cursor-pointer">Change</p>
          </div>
          <p className="text-gray-500 text-xl my-auto w-2/12 mx-5">
            Pick your best pic. This will be use for public profile
          </p>
        </div>
        <div className="m-10">
          <label className="text-gray-500  text-xl">Name*</label>
          <h1 className="m-1 text-bold text-2xl">Hariom Patil</h1>
        </div>
        <div className="m-10">
          <label className="text-gray-500  text-xl">Email*</label>
          <h1 className="m-1 text-bold text-2xl">Hariompatil11@gmail.com</h1>
        </div>
        <div className="m-10">
          <label className="text-gray-500  text-xl">Number*</label>
          <h1 className="m-1 text-bold text-2xl">83490005812</h1>
        </div>
      </div>
    </>
  );
};

export default profile;
