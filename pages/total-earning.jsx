import React from "react";
import Profitchart from "./profit-chart";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const TotalEarning = () => {
  return (
    <div className=" m-5  mt-10  w-4/12">
      <div className="border rounded-lg bg-white shadow-md p-5">
        <h1 className="text-gray-500 text-[30px] font-medium ">
          Total Earning
        </h1>
        <div className="flex">
          <h1 className="text-gray-500 text-[45px] font-medium ">87%</h1>
          <div className="flex my-auto ml-2 ">
            <ChevronUpIcon className="h-6 w-5 text-green-500" />
            <p className="text-green-500 font-semibold text-[25px]"> 13.3%</p>
          </div>
        </div>
        <div className="flex justify-center my-1">
          <Profitchart />
        </div>
        <div className="flex justify-between my-6">
          <div>
            <h2 className="text-gray-500 text-[25px]">Total Sales</h2>
            <p className="text-gray-400 text-[18px] ml-1">Refund</p>
          </div>
          <h2 className="text-green-500 font-semibold text-[22px] my-auto">
            +11298
          </h2>
        </div>
        <div className="flex justify-between my-2 my-6">
          <div>
            <h2 className="text-gray-500 text-[25px]">Total Revenue</h2>
            <p className="text-gray-400 text-[18px] ml-1">Client Payment</p>
          </div>
          <h2 className="text-green-500 font-semibold text-[22px] my-auto">
            +221298
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TotalEarning;
