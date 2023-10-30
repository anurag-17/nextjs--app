import dynamic from "next/dynamic";
import React from "react";
import UserNavbar from "./userNavbar";
import { Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";
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
                  // value="selectAll"
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
              <tr className="gap-24 flex text-center p-5">
                <input type="checkbox" className="mx-3 cursor-pointer" />
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
                <td className="w-40 ">
                <Popover className="relative">
                        <Popover.Button className="outline-none md:mr-8 cursor-pointer text-gray-700">
                          <TrashIcon className="cursor-pointer h-6 w-6 m-2 text-red-800  text-center " />
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
                                <TrashIcon className="cursor-pointer h-9 w-9 text-red-800 mb-3  " />
                              </div>
                              <p>Are You Sure! Want to Delete?</p>
                              <p className="text-sm text-gray-500 my-3">
                                Do you really want to delete these records? You
                                cant't view this in your list anymore if you
                                delete!
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
                                    removeCategory(items?._id);
                                    handleClose()
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
                <Popover className="relative">
                        <Popover.Button className="outline-none mx-auto md:mr-8 cursor-pointer text-gray-700">
                          <TrashIcon className="cursor-pointer h-6 w-6 m-2 text-red-800  flex justify-center " />
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
                                <TrashIcon className="cursor-pointer h-9 w-9 text-red-800 mb-3  " />
                              </div>
                              <p>Are You Sure! Want to Delete?</p>
                              <p className="text-sm text-gray-500 my-3">
                                Do you really want to delete these records? You
                                cant't view this in your list anymore if you
                                delete!
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
                                    removeCategory(items?._id);
                                    handleClose()
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
                <Popover className="relative">
                        <Popover.Button className="outline-none mx-auto md:mr-8 cursor-pointer text-gray-700">
                          <TrashIcon className="cursor-pointer h-6 w-6 m-2 text-red-800  flex justify-center " />
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
                                <TrashIcon className="cursor-pointer h-9 w-9 text-red-800 mb-3  " />
                              </div>
                              <p>Are You Sure! Want to Delete?</p>
                              <p className="text-sm text-gray-500 my-3">
                                Do you really want to delete these records? You
                                cant't view this in your list anymore if you
                                delete!
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
                                    removeCategory(items?._id);
                                    handleClose()
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(userOrder), { ssr: false });
