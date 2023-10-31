import dynamic from "next/dynamic";
import React from "react";
import Header from "../components/Header";
import TopCards from "../components/TopCards";
import BarChart from "../components/BarChart";
import RecentOrders from "../components/RecentOrders";

import Progresschart from "./progress-chart";

import SaleOverview from "./sale-overview";
import CountrySale from "./country-sale";
import SourceVisit from "./source-visit";
import TotalEarning from "./total-earning";

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
        <div className=" h-screen w-full">
          <div className=" m-5 flex  ">
            <SaleOverview />
            <Progresschart />
          </div>

          <div className=" flex">
            <CountrySale />
            <SourceVisit />
            <TotalEarning />
          </div>
        </div>
      </main>
    </>
  );
};
export default dynamic(() => Promise.resolve(Admindashboard), { ssr: false });
