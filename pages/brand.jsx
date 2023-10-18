"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";

const brandlist = () => {
  const [getallBrand, setGetallBrand] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/brand/getallBrand",
  };
  useEffect(() => {
    defaultBrand();
  }, []);
  const defaultBrand = () => {
    axios
      .request(options)
      .then((response) => {
        setGetallBrand(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  const removeCategory = async (_id) => {
    console.log(_id);
    await fetch(
      `https://e-commerce-backend-brown.vercel.app/api/brand/deleteBrand/${_id}`,
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
          defaultBrand();
        } else {
          throw new Error("failed to create");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const allDelete = async () => {
    try {
      console.log(isChecked);
      const response = await axios.post(
        `https://e-commerce-backend-brown.vercel.app/api/brand/deleteBulkBrands`,
        { brandIds: isChecked }
      );
  
      // Check the HTTP status code for success (2xx codes)
      if (response.status === 200) {
        console.log("Successfully deleted brands");
        // Call the function to refresh your brand data
        defaultBrand();
      } else {
        // Handle other status codes or error responses from the server
        console.error("Failed to delete brands. Status code: " + response.status);
      }
    } catch (error) {
      // Handle network errors or exceptions thrown during the request
      console.error("Error deleting brands:", error);
    }
  };
  

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    // If the header checkbox is clicked
    if (value === "selectAll") {
      setSelectAll(checked);
      if (checked) {
        const allItemIds = getallBrand.map((item) => item._id);
        setisChecked(allItemIds);
      } else {
        setisChecked([]);
      }
    } else {
      // If an item checkbox is clicked
      if (checked) {
        setisChecked([...isChecked, value]);
      } else {
        setisChecked(isChecked.filter((id) => id !== value));
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold">Brand List </h2>
        <h2>Welcome Back, Client</h2>
      </div>
      <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
        <div className="flex float-right ">
          <Link href="/create-brand">
            <button className="rounded-md p-2 bg-green-600 text-white cursor-pointer">
              + Add Brand
            </button>
          </Link>
          <button
            onClick={allDelete}
            className="border border-1 mx-5 rounded-md text-sm border-red-400 text-red-700 hover:bg-red-200  p-2 hover:border-none"
          >
            Delete
          </button>
        </div>
      </div>
      <table class="table-auto  bg-white w-full rounded-md mt-5">
        <thead className="">
          <label>
            <tr className="bg-coolGray-200 text-gray-400 text-sm text-start flex justify-between  ">
              <input
                type="checkbox"
                className="mx-3 my-5 cursor-pointer"
                value="selectAll"
                checked={selectAll}
                onChange={handleCheckbox}
              />

              <th className="text-start">NAME</th>
              {/* <th className="text-start">DESCRIPTION</th> */}
              <th className="text-start">PUBLISHED</th>
              <th className="text-start">ACTION</th>
            </tr>
          </label>
        </thead>
        {getallBrand.map((items) => (
          <tbody>
            <label>
              <tr className="flex justify-between">
                <td className="">
                  <input
                    type="checkbox"
                    // checked={selectDelete}
                    className="mx-3 mt-5 cursor-pointer "
                    value={items?._id}
                    checked={items.isChecked}
                    onChange={(e) => handleCheckbox(e)}
                  />
                </td>
                <td className="py-5 text-[18px]">
                  {" "}
                  {items?.brand ? items?.brand : "-"}
                </td>
                <td className="py-5 text-[18px] tex">
                  <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                    selling
                  </p>
                </td>

                <td className=" flex">
                  <button className="flex">
                    <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500 m-2" />

                    <Link href={`/edit-brand/${items?._id}`}>
                      <button>
                        <PencilSquareIcon className="cursor-pointer h-6 w-6  text-sky-600 m-2 " />
                      </button>
                    </Link>

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
                                onClick={() => {
                                  removeCategory(items?._id);
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
                  </button>
                </td>
              </tr>
            </label>
          </tbody>
        ))}
      </table>
    </>
  );
};

export default dynamic(() => Promise.resolve(brandlist), { ssr: false });
