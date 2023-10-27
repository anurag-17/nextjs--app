import dynamic from "next/dynamic";
import React from "react";
import UserNavbar from "./userNavbar";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const userOrder = () => {
  return (
    <div>
      <UserNavbar />
      <div className="px-20">
        <h1 className="text-[30px] font-medium my-5">Order List</h1>
        <div className="p-5 bg-white border rounded-md">
          <table className="">
            <thead>
              <tr className="bg-coolGray-200 text-gray-500 text-sm text-start flex gap-24 items-center px-5 ">
                <input
                  type="checkbox"
                  className="mx-3 my-5 cursor-pointer"
                  value="selectAll"
                />
                <th className="w-40">Order ID</th>
                <th className="w-40">Date</th>
                <th className="w-40">Payment Status</th>
                <th className="w-40">Total</th>
                <th className="w-40">Payment Method</th>
                <th className="w-40">Order Status</th>
                <th className="w-40">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="gap-24 flex text-center  p-5">
                <input type="checkbox" className="mx-3   cursor-pointer" />
                <td className="w-40">#Kz025421</td>
                <td className="w-40">sep 22, 2023</td>
                <td className="w-40 bg-purple-100 text-purple-500 py-1 rounded-lg my-auto">
                  Pending
                </td>
                <td className="w-40">1999</td>
                <td className="w-40">Mastercard</td>
                <td className="w-40 bg-yellow-100 text-yellow-500 py-1 rounded-lg my-auto">
                  Shipped
                </td>
                <td className="w-40 flex justify-center">
                  <TrashIcon className="cursor-pointer h-6 w-6 m-2 text-red-800   " />
                </td>
              </tr>
              <tr className="gap-24 flex text-center  p-5">
                <input type="checkbox" className="mx-3  cursor-pointer" />
                <td className="w-40">#Kz025421</td>
                <td className="w-40">sep 22, 2023</td>
                <td className="w-40 bg-green-100 text-green-500 py-1 rounded-lg my-auto">
                  Paid
                </td>
                <td className="w-40">1999</td>
                <td className="w-40">Mastercard</td>
                <td className="w-40 bg-red-100 text-red-500 py-1 rounded-lg my-auto">
                  Delivered
                </td>
                <td className="w-40 flex justify-center">
                  <TrashIcon className="cursor-pointer h-6 w-6 m-2 text-red-800   " />
                </td>
              </tr>
              <tr className="gap-24 flex text-center  p-5">
                <input type="checkbox" className="mx-3  cursor-pointer" />
                <td className="w-40">#Kz025421</td>
                <td className="w-40">sep 22, 2023</td>
                <td className="w-40 bg-yellow-100 text-yellow-500 py-1 rounded-lg my-auto">
                  COD
                </td>
                <td className="w-40">1999</td>
                <td className="w-40">Mastercard</td>
                <td className="w-40 bg-yellow-100 text-yellow-500 py-1 rounded-lg my-auto">
                  Processing
                </td>
                <td className="w-40 flex justify-center ">
                  <TrashIcon className="cursor-pointer h-6 w-6 m-2 text-red-800   " />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(userOrder), { ssr: false });
