import React from "react";

const SourceVisit = () => {
  return (
    <div className=" m-5  mt-10  w-4/12">
      <div className="border rounded-lg bg-white shadow-md p-5">
        <h1 className="text-gray-500 text-[30px] font-medium ">
          Source Visits
        </h1>
        <p className="text-gray-400 text-[18px]">38.5k Visitors</p>

        <div className="flex justify-between my-6">
          <div>
            <h2 className="text-gray-500 text-[25px]">Direct Source</h2>
            <p className="text-gray-400 text-[20px]">Direct link click</p>
          </div>

          <div className="flex my-auto ">
            <p className="text-gray-600 text-[22px] mx-5">1.2k</p>
            <p className="text-green-600 text-[22px] bg-green-100 p-1 px-3 rounded-lg">
              +4.5%
            </p>
          </div>
        </div>
        <div className="flex justify-between my-6">
          <div>
            <h2 className="text-gray-500 text-[25px]">Social Networks</h2>
            <p className="text-gray-400 text-[20px]">Social Channels</p>
          </div>

          <div className="flex my-auto ">
            <p className="text-gray-600 text-[22px] mx-5">31.2k</p>
            <p className="text-green-600 text-[22px] bg-green-100 p-1 px-3 rounded-lg">
              +8.5%
            </p>
          </div>
        </div>
        <div className="flex justify-between my-6">
          <div>
            <h2 className="text-gray-500 text-[25px]">Email Newsletter</h2>
            <p className="text-gray-400 text-[20px] ">Email Campaigns</p>
          </div>

          <div className="flex my-auto ">
            <p className="text-gray-600 text-[22px] mx-5">989</p>
            <p className="text-green-600 text-[22px] bg-green-100 p-1 px-3 rounded-lg">
              +2.5%
            </p>
          </div>
        </div>
        <div className="flex justify-between my-6">
          <div>
            <h2 className="text-gray-500 text-[25px]">Referrals</h2>
            <p className="text-gray-400 text-[20px]">Impact Radius Visits</p>
          </div>

          <div className="flex my-auto ">
            <p className="text-gray-600 text-[22px] mx-5">344</p>
            <p className="text-red-600 text-[22px] bg-red-100 p-1 px-3 rounded-lg">
              -1.5%
            </p>
          </div>
        </div>
        <div className="flex justify-between my-6">
          <div>
            <h2 className="text-gray-500 text-[25px]">ADVT</h2>
            <p className="text-gray-400 text-[20px]">Google ADVT</p>
          </div>

          <div className="flex my-auto ">
            <p className="text-gray-600 text-[22px] mx-5">3.2k</p>
            <p className="text-green-600 text-[22px] bg-green-100 p-1 px-3 rounded-lg">
              +6.5%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceVisit;
