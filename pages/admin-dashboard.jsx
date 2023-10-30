import dynamic from "next/dynamic";
import React from "react";
import Header from "../components/Header";
import TopCards from "../components/TopCards";
import BarChart from "../components/BarChart";
import RecentOrders from "../components/RecentOrders";

import {
  ShoppingCartIcon,
  EyeIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Progresschart from "./progress-chart";
import Profitchart from "./profit-chart";

const Admindashboard = () => {
  return (
    <>
      {/* <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm"></div> */}

      <main className="bg-gray-100 min-h-screen">
        <Header />
        <TopCards />
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChart />
          <RecentOrders />
        </div>
        <div className=" h-screen ">
          <div className="w-full m-5 flex ">
            <div className="border rounded-lg bg-white shadow-md p-5 w-4/12 mr-10">
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
                  <h1 className="text-gray-600 text-[22px]">25.7%</h1>
                  <p className="text-gray-400 text-[18px]">12452</p>
                </div>
              </div>
              <div className="w-full bg-purple-600 my-4 rounded-lg h-2 dark:bg-gray-700">
                <div
                  className="bg-sky-600 h-2 rounded-s-lg"
                  style={{ width: "70.7%" }}
                />
              </div>
            </div>
            <div className=" mt-5">
              <Progresschart />
            </div>
          </div>
          <div className=" m-5  mt-10 flex  w-full">
            <div className="border rounded-lg bg-white shadow-md p-5 w-4/12">
              <div className=" justify-between">
                <h1 className="text-gray-500 text-[30px] font-medium ">
                  Sales By Country
                </h1>
                <h1 className="text-gray-400 text-[18px]">
                  Monthly Sale Overview
                </h1>
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
                  <p className="text-green-500 font-semibold text-[22px]">
                    {" "}
                    16.3%
                  </p>
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
                  <p className="text-green-500 font-semibold text-[22px]">
                    {" "}
                    11.3%
                  </p>
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
                  <p className="text-green-500 font-semibold text-[22px]">
                    {" "}
                    21.3%
                  </p>
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
                  <p className="text-green-500 font-semibold text-[22px]">
                    {" "}
                    13.3%
                  </p>
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
                  <p className="text-red-500 font-semibold text-[22px]">
                    {" "}
                    8.3%
                  </p>
                </div>
              </div>
            </div>

            <div className="w-4/12 mx-10">
              <div className="border rounded-lg bg-white shadow-md p-5">
                <h1 className="text-gray-500 text-[30px] font-medium ">
                  Source Visits
                </h1>
                <p className="text-gray-400 text-[18px]">38.5k Visitors</p>

                <div className="flex justify-between my-5">
                  <div>
                    <h2 className="text-gray-500 text-[25px]">Direct Source</h2>
                    <p className="text-gray-400 text-[20px]">
                      Direct link click
                    </p>
                  </div>

                  <div className="flex my-auto ">
                    <p className="text-gray-600 text-[22px] mx-5">1.2k</p>
                    <p className="text-green-600 text-[22px] bg-green-100 p-1 px-3 rounded-lg">
                      +4.5%
                    </p>
                  </div>
                </div>
                <div className="flex justify-between my-5">
                  <div>
                    <h2 className="text-gray-500 text-[25px]">
                      Social Networks
                    </h2>
                    <p className="text-gray-400 text-[20px]">Social Channels</p>
                  </div>

                  <div className="flex my-auto ">
                    <p className="text-gray-600 text-[22px] mx-5">31.2k</p>
                    <p className="text-green-600 text-[22px] bg-green-100 p-1 px-3 rounded-lg">
                      +8.5%
                    </p>
                  </div>
                </div>
                <div className="flex justify-between my-5">
                  <div>
                    <h2 className="text-gray-500 text-[25px]">
                      Email Newsletter
                    </h2>
                    <p className="text-gray-400 text-[20px] ">
                      Email Campaigns
                    </p>
                  </div>

                  <div className="flex my-auto ">
                    <p className="text-gray-600 text-[22px] mx-5">989</p>
                    <p className="text-green-600 text-[22px] bg-green-100 p-1 px-3 rounded-lg">
                      +2.5%
                    </p>
                  </div>
                </div>
                <div className="flex justify-between my-5">
                  <div>
                    <h2 className="text-gray-500 text-[25px]">Referrals</h2>
                    <p className="text-gray-400 text-[20px]">
                      Impact Radius Visits
                    </p>
                  </div>

                  <div className="flex my-auto ">
                    <p className="text-gray-600 text-[22px] mx-5">344</p>
                    <p className="text-red-600 text-[22px] bg-red-100 p-1 px-3 rounded-lg">
                      -1.5%
                    </p>
                  </div>
                </div>
                <div className="flex justify-between my-5">
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

            <div className="w-4/12 ">
              <div className="border rounded-lg bg-white shadow-md p-5">
                <h1 className="text-gray-500 text-[30px] font-medium ">
                  Total Earning
                </h1>
                <div className="flex">
                  <h1 className="text-gray-500 text-[45px] font-medium ">
                    87%
                  </h1>
                  <div className="flex my-auto ml-2">
                    <ChevronUpIcon className="h-6 w-5 text-green-500" />
                    <p className="text-green-500 font-semibold text-[25px]">
                      {" "}
                      13.3%
                    </p>
                  </div>
                </div>
                <div className="flex justify-center my-1">
                  <Profitchart/>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-gray-500 text-[25px]">Total Sales</h2>
                    <p className="text-gray-400 text-[18px] ml-1">Refund</p>
                  </div>
                  <h2 className="text-green-500 font-semibold text-[22px] my-auto">
                    +11298
                  </h2>
                </div>
                <div className="flex justify-between my-2">
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
          </div>
        </div>
      </main>
    </>
  );
};
export default dynamic(() => Promise.resolve(Admindashboard), { ssr: false });
