import React from "react";

const passwordchange = () => {
  return (
    <>
      <div className="flex bg-white">
        <div className="w-6/12">
          <div className="bg-white  p-5 ">
            <h1 className="text-[25px] m-10 mt-0">Change Password</h1>

            <div className="mt-10">
              <div className=" mb-3 ">
                <label className="absolute mt-6 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                  Old Password
                </label>
                <input
                  type="password "
                  className="border p-2 relative rounded-lg m-10 w-full"
                />
              </div>
              <div className=" mb-3 ">
                <label className="absolute mt-6 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                  New Password
                </label>
                <input
                  type="password "
                  className="border p-2 relative rounded-lg m-10 w-full"
                />
              </div>

              <div className=" mb-3 ">
                <label className="absolute mt-6 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                  Confirm Password
                </label>
                <input
                  type="password "
                  className="border p-2 relative rounded-lg m-10 w-full"
                />
              </div>

              <button
                type="submit"
                className="mx-10 border py-2 px-5 bg-sky-600 text-white rounded-lg text-[22px]"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1697718579~exp=1697719179~hmac=44b24d05b8e7c60bfbc271df2575209a83b00d44fd9c3949a4a919e3acc9672d"  className="w-8/12 mx-auto"></img>
        </div>
      </div>
    </>
  );
};

export default passwordchange;
