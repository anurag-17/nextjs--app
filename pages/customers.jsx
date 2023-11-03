import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Transition, Popover } from "@headlessui/react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import EditCustomer from "./edit-customer/[slug]";

const Customers = () => {
  const [getallCustomer, setGetallCustomer] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    defaultCustomer();
  }, []);

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

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

  const handleSearch = (e) => {
    const search = e.target.value;
    if (search.trim() === "") {
      refreshData();
    } else {
      const option = {
        method: "GET",
        url: `http://e-commerce-backend-brown.vercel.app/api/brand/getallBrand?search=${search}`,
      };
      axios
        .request(option)
        .then(function (response) {
          if (response.status === 200) {
            setSearchCustomer(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const removeCustomer = async (_id) => {
    console.log(_id);
    await fetch(
      `https://e-commerce-backend-brown.vercel.app/api/auth/deleteaUser/${_id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          defaultCustomer();
        } else {
          throw new Error("failed to create");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center px-10 pt-4 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">Customer List </h2>

        <div className="mb-3 w-[40%]">
          <input
            type="search"
            className=" border border-gray-500  p-3 rounded-xl focus:border-none w-11/12 "
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
            onChange={handleSearch}
          />
        </div>
        <h2>Welcome Back, Client</h2>
      </div>
      {isDrawerOpen && (
        <div
          id="drawer-form"
          className="fixed content-center mb-5 right-5 z-40 h-[65%] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-6/12 dark:bg-gray-800"
          tabIndex={-1}
          aria-labelledby="drawer-form-label"
        >
          <button
            type="button"
            onClick={closeDrawer}
            className="text-gray-400  shadow-2xl text-sm w-14  top-2  inline-flex items-center justify-center "
          >
            <svg
              className="w-9 h-9 bg-white border  rounded-lg p-1 hover:bg-orange-100 hover:text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <ArrowRightIcon className="w-12 h-12 bg-white border rounded-xl p-1  text-orange-700 hover:bg-orange-100 hover:text-black" />
            </svg>
            <span className="sr-only bg-black">Close menu</span>
          </button>
          <div className="overflow-y-auto ">
            <EditCustomer />
          </div>
        </div>
      )}

      <table className="table bg-white w-full mt-5 gap-48 rounded-lg">
        <thead className=" bg-gray-200 text-gray-400">
          <tr className=" ">
            {/* <label> */}
            <th>
              <input type="checkbox" className="cursor-pointer   " />
            </th>
            <th className="py-5 text-start">Customer Name</th>
            <th className="py-5 text-start">Email</th>
            <th className="py-5 text-start">Address</th>
            <th className="py-5 text-start">Phone No.</th>
            <th className="py-5 text-start">Country</th>
            <th className="py-5 text-start">Action</th>
            {/* </label> */}
          </tr>
        </thead>
        {getallCustomer.map((items) => (
          <tbody>
            {/* <label> */}
            <tr className="">
              <td className="text-center ">
                <input type="checkbox" className="cursor-pointer  my-2" />
              </td>
              <td className="py-5 text-[18px] text-start">
                {items?.firstname} {items?.lastname}
              </td>
              <td className="py-5 text-[18px] text-start ">{items?.email}</td>
              <td className="py-5 text-[18px] text-start  ">
                {items?.address}
              </td>
              <td className="py-5 text-[18px] text-start ">{items?.mobile}</td>
              <td className="py-5 text-[18px] text-start ">
                {items?.country}
              </td>
              <td className="py-5 text-[18px] mx-auto flex  ">
                <Link href={`/edit-customer/${items?._id}`}></Link>
                <button onClick={openDrawer}>
                  <PencilSquareIcon className="cursor-pointer h-6 w-6  text-sky-600 m-2 " />
                </button>

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
                          Do you really want to delete these records? You cant't
                          view this in your list anymore if you delete!
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
                              removeCustomer(items?._id);
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
