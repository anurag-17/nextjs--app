import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const CountrySale = () => {
  return (
    <div className=" m-5  mt-10  w-4/12">
      <div className="border rounded-lg bg-white shadow-md p-5  ">
        <div className=" ">
          <h1 className="text-gray-500 text-[30px] font-medium ">
            Sales By Country
          </h1>
          <h1 className="text-gray-400 text-[18px]">Monthly Sale Overview</h1>
        </div>
        <div className="flex justify-between my-auto ">
          <div className="flex my-2">
            <img src="/ind flag.png" className="w-16 m-2" />
            <div className="my-auto ml-2">
              <p className="text-[18px] text-gray-500">₹2,34,46,2300</p>
              <p className="text-[18px] text-gray-500 ">India</p>
            </div>
          </div>
          <div className="flex my-auto">
            <ChevronUpIcon className="h-6 w-5 text-green-500" />
            <p className="text-green-500 font-semibold text-[22px]"> 16.3%</p>
          </div>
        </div>
        <div className="flex justify-between my-auto">
          <div className="flex my-2">
            <img src="/aus flag.png" className="w-16 m-2" />
            <div className="my-auto ml-2">
              <p className="text-[18px] text-gray-500">₹84,46,2300</p>
              <p className="text-[18px] text-gray-500 ">Australia</p>
            </div>
          </div>
          <div className="flex my-auto">
            <ChevronUpIcon className="h-6 w-5 text-green-500" />
            <p className="text-green-500 font-semibold text-[22px]"> 11.3%</p>
          </div>
        </div>
        <div className="flex justify-between my-auto">
          <div className="flex my-2">
            <img src="canada flag.jpeg" className="w-16 m-2" />
            <div className="my-auto ml-2">
              <p className="text-[18px] text-gray-500">₹74,46,2300</p>
              <p className="text-[18px] text-gray-500 ">Canada</p>
            </div>
          </div>
          <div className="flex my-auto">
            <ChevronUpIcon className="h-6 w-5 text-green-500" />
            <p className="text-green-500 font-semibold text-[22px]"> 21.3%</p>
          </div>
        </div>
        <div className="flex justify-between my-auto">
          <div className="flex my-2">
            <img src="/fran flag.png" className="w-16 m-2" />
            <div className="my-auto ml-2">
              <p className="text-[18px] text-gray-500">₹1,34,46,2300</p>
              <p className="text-[18px] text-gray-500 ">France</p>
            </div>
          </div>
          <div className="flex my-auto">
            <ChevronUpIcon className="h-6 w-5 text-green-500" />
            <p className="text-green-500 font-semibold text-[22px]"> 13.3%</p>
          </div>
        </div>
        <div className="flex justify-between my-auto">
          <div className="flex my-2">
            <img src="/uk flag.png" className="w-16 m-2" />
            <div className="my-auto ml-2">
              <p className="text-[18px] text-gray-500">₹34,46,2300</p>
              <p className="text-[18px] text-gray-500 ">UK</p>
            </div>
          </div>
          <div className="flex my-auto">
            <ChevronDownIcon className="h-6 w-5 text-red-500" />
            <p className="text-red-500 font-semibold text-[22px]"> 8.3%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySale;
