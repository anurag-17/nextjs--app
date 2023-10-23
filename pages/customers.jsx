import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Transition, Popover } from "@headlessui/react";
import axios from "axios";

const Customers = () => {
  const [getallCustomer, setGetallCustomer] = useState([]);

  useEffect(() => {
    defaultCustomer();
  }, []);

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/auth/all-users",
  };

  const defaultCustomer = () => {
    axios
      .request(options)
      .then((response) => {
        setGetallCustomer(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error); 
      });
  };

  return (
    <div>
        <div className="flex justify-between items-center px-10 pt-4 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold pb-4">Customer List </h2>
          <h2>Welcome Back, Client</h2>
        </div>
        {/* <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
          <div className="flex justify-between ">
            <button className="border border-gray-400 rounded-md p-2 mr-3 flex justify-around hover:border-green-500 hover:text-green-500">
              <ArrowDownTrayIcon class="h-6 w-5  mr-1 text-black" />
              Import
            </button>
            <button className="border border-gray-400 rounded-md p-2 hover:border-yellow-600 hover:text-yellow-600 flex">
              <ArrowUpTrayIcon class="h-6 w-5 mr-1 text-black" />
              Export
            </button>
          </div>
          <div className="flex justify-around">
            <Link href="/add-vendor">
              <button className=" rounded-md p-2 bg-green-600 text-white cursor-pointer mr-4">
                + Add Vendor
              </button>
            </Link>

            <button className="border border-1  rounded-md text-sm border-red-400 text-red-700 hover:bg-red-200  p-2 hover:border-none">
              Delete
            </button>
          </div>
        </div> */}

        <table className="table bg-white w-full mt-5 gap-48 rounded-lg">
          <thead className=" bg-gray-400 ">
            <tr className="gap-48 ">
              {/* <label> */}
              <th>
                <input type="checkbox" className="cursor-pointer   " />
              </th>
              <th className="py-5">Customer Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone No.</th>
              <th>Country</th>
              <th>Action</th>
              {/* </label> */}
            </tr>
          </thead>
          {getallCustomer.map((items) => (
            <tbody>
              {/* <label> */}
              <tr className="">
                <td className="text-center">
                  <input type="checkbox" className="cursor-pointer  " />
                </td>
                <td className="py-5 text-[18px] text-center">
                  {items?.firstname} {items?.lastname}
                </td>
                <td className="py-5 text-[18px] text-center ">
                  {items?.email}
                </td>
                <td className="py-5 text-[18px] text-center  ">
                  {items?.address}
                </td>
                <td className="py-5 text-[18px] text-center ">
                  {items?.mobile}
                </td>
                <td className="py-5 text-[18px] text-center ">
                  {items?.country}
                </td>
                <td className="py-5 text-[18px] mx-auto flex justify-center">
                  {/* <Link href={`/update-vendor/${items?._id}`}>
                    <button>
                      <PencilSquareIcon className="cursor-pointer h-6 w-6  text-sky-600 m-2 " />
                    </button>
                  </Link> */}

                  <Popover className="relative">
                    <Popover.Button className="outline-none mx-auto  cursor-pointer text-gray-700">
                      <TrashIcon className="cursor-pointer h-6 w-6 m-2 text-red-800   " />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform scale-95"
                      enterTo="transform scale-100"
                      leave="transition ease-in duration=75"
                      leaveFrom="transform scale-100"
                      leaveTo="transform scale-95"
                    >
                      <Popover.Panel className="absolute -right-16 sm:right-72  z-50 bg-white shadow-2xl border-2 rounded-lg border-gray p-3 max-w-xs sm:max-w-sm w-screen ">
                        <div className="relative  p-3">
                          <div className="flex justify-center items-center w-full">
                            <TrashIcon className="cursor-pointer h-9 w-9 text-red-800 mb-3 " />
                          </div>
                          <p>Are You Sure! Want to Delete?</p>
                          <p className="text-sm text-gray-500 my-3">
                            Do you really want to delete these records? You
                            cant't view this in your list anymore if you delete!
                          </p>
                          <div className="flex justify-around">
                            <button
                              className="border border-1 rounded-md border-green-400 text-green-700 hover:bg-green-200 text-sm  p-1
                              hover:border-none"
                            >
                              No, Keep It
                            </button>
                            <button
                              onClick={() => {
                                removeVendor(items?._id);
                              }}
                              className="border border-1 rounded-md 
                              text-sm 
                              border-red-400 text-red-700 hover:bg-red-200  p-1
                              hover:border-none"
                            >
                              Yes, Delete It
                            </button>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </td>
              </tr>
              {/* </label> */}
            </tbody>
          ))}
        </table>
      </div>
  );
};

export default Customers;
