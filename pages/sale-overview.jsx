import React from "react";
import { ShoppingCartIcon, EyeIcon } from "@heroicons/react/24/outline";

const SaleOverview = () => {
  return (
    <div className=" my-5  w-6/12">
      <div className="border rounded-lg bg-white shadow-md p-5  mr-10">
        <div className="flex justify-between">
          <h1 className="text-gray-500 text-[30px] font-medium ">
            Sales Overview
          </h1>
          <h1 className="text-green-500 font-semibold text-[22px] my-auto">
            +20.2%
          </h1>
        </div>
        <h1 className="text-gray-600 text-[25px]">₹42.0k</h1>

        <div className="flex justify-between mt-5">
          <div>
            <div className="flex">
              <ShoppingCartIcon className="h-8 w-7  mr-1 text-sky-600" />
              <h1 className="text-gray-400 text-[22px]">Order</h1>
            </div>
            <h1 className="text-gray-600 text-[22px]">70.7%</h1>
            <p className="text-gray-400 text-[18px] ">6689</p>
          </div>
          <div>
            <div className="w-[2px] bg-gray-300 h-6 mx-auto"></div>
            <p className="text-gray-400 text-[25px]">vs</p>
            <div className="w-[2px] bg-gray-300 h-6 mx-auto"></div>
          </div>

          <div>
            <div className="flex">
              <EyeIcon className="h-8 w-7  mr-1 text-purple-600" />

              <h1 className="text-gray-400 text-[22px]">Visits </h1>
            </div>
            <h1 className="text-gray-600 text-[22px]">29.3%</h1>
            <p className="text-gray-400 text-[18px]">12452</p>
          </div>
        </div>
        <div className="w-full bg-purple-600 my-4 rounded-lg h-4     dark:bg-gray-700">
          <div
            className="bg-sky-600 h-4 rounded-s-lg"
            style={{ width: "70.7%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SaleOverview;
