import dynamic from "next/dynamic";
import React from "react";
import { Menu, Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  CheckIcon,
  PencilSquareIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const CategoryList = () => {
  const categories = [
    {
      id: "0C24",
      name: "Fish",
      description: "",
      published: `fa fa-home`,
      action: "",
    },
    {
      id: "0BE8",
      name: "Beauty",
      description: "",
      published: `fa fa-home`,
      action: "",
    },
    {
      id: "0BC4",
      name: "Fruits",
      description: "",
      published: `fa fa-home`,
      action: "",
    },
    {
      id: "1BC4",
      name: "Biscuits",
      description: "",
      published: `fa fa-home`,
      action: "",
    },
    {
      id: "2BA4",
      name: "Cooking",
      description: "",
      published: `fa fa-home`,
      action: "",
    },
  ];
  return (
    <>
      <section>
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold">Category List </h2>
          <h2>Welcome Back, Clint</h2>
        </div>
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
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
            <button className="flex rounded-md p-2 bg-red-700 text-white  cursor-pointer mr-3">
              <TrashIcon class="h-5 mr-1 w-5 text-white" />
              Delete
            </button>
            <button className=" rounded-md p-2 bg-green-600 text-white cursor-pointer">
              + Add Category
            </button>
          </div>
        </div>

        <table class="table-auto bg-white w-full rounded-md mt-5">
          <thead className="">
            <tr className="bg-coolGray-200 text-gray-400 text-sm text-start ">
              <input type="checkbox" className="mx-3 mt-6 cursor-pointer " />
              <th className="text-start py-5 ">ID</th>

              <th className="text-start">NAME</th>
              <th className="text-start">DESCRIPTION</th>
              <th className="text-start">PUBLISHED</th>
              <th className="text-start">ACTION</th>
            </tr>
          </thead>
          {categories?.map((item) => (
            <tbody>
              <tr>
                <td className="">
                  <input
                    type="checkbox"
                    className="mx-3 mt-2 cursor-pointer "
                  />
                </td>
                <td className="py-5 text-[18px]">{item?.id}</td>
                <td className="py-5 text-[18px]">{item?.name}</td>
                <td className="py-5 text-[18px] tex">{item?.description}</td>

                <td className="py-5 text-[18px] tex">
                  <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                    selling
                  </p>
                </td>

                <td className=" flex">
                  <button className="flex">
                    <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500 m-2" />
                    <PencilSquareIcon className="cursor-pointer h-6 w-6  text-sky-600 m-2 " />
                    <Popover className="relative">
                      <Popover.Button className="outline-none mx-auto md:mr-8 cursor-pointer text-gray-700">
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
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(CategoryList), { ssr: false });
