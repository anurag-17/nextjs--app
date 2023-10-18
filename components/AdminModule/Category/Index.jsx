"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const CategoryList = ({_id,closeModal,refreshData}) => {
  console.log(_id);
  const [getallCategory, setGetallCategory] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const [brandIds, setBrandIds] = useState("");
  const [selectDelete, setSelectDelete] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const handleClose = () => {
    closeModal();
    refreshData();
  }

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/category/getallCategory",
  };

  useEffect(() => {
    defaultCategory();
  }, []);

  const defaultCategory = () => {
    axios
      .request(options)
      .then((response) => {
        setGetallCategory(response.data);
        console.log(response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const removeCategory = async (_id) => {
    console.log(_id);
    await fetch(
      `https://e-commerce-backend-brown.vercel.app/api/category/deleteCategory/${_id}`,
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
          defaultCategory();
        } else {
          throw new Error("failed to create");
          
        }
      })
      .catch((e) => {
        console.log(e);
        
      });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    // If the header checkbox is clicked
    if (value === "selectAll") {
      setSelectAll(checked);
      const allItemIds = getallCategory.map((item) => item._id);

      // If header checkbox is checked, set all item checkboxes to true
      if (checked) {
        setisChecked(allItemIds);
      } else {
        // If header checkbox is unchecked, unselect all items
        setisChecked([]);
      }
    } else {
      // If an item checkbox is clicked
      if (checked) {
        // Add the item to the list of selected items
        setisChecked([...isChecked, value]);
      } else {
        // Remove the item from the list of selected items
        setisChecked(isChecked.filter((id) => id !== value));
      }

      // Check if all individual checkboxes are selected, update header checkbox accordingly
      const allItemIds = getallCategory.map((item) => item._id);
      if (isChecked.length === allItemIds.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
    }
  };

  const allDelete = async () => {
    try {
      console.log(isChecked);
      const response = await axios.post(
        `https://e-commerce-backend-brown.vercel.app/api/category/deleteBulkCategory`,
        { CategoryIds: isChecked }
      );
  
      // Check the HTTP status code for success (2xx codes)
      if (response.status === 200) {
        console.log("Successfully deleted Catagory");
        // Call the function to refresh your brand data
        defaultCategory();
      } else {
        // Handle other status codes or error responses from the server
        console.error("Failed to delete catagory. Status code: " + response.status);
        
      }
    } catch (error) {
      // Handle network errors or exceptions thrown during the request
      console.error("Error deleting catagory:", error);
      
    }
  };
  
  // const selectAllDelete = (e) => {
  //   const checkboxChecked = e.target.checked;
  //   setSelectDelete(checkboxChecked);
  //   const checkbox = document.getElementById("myCheckbox");
  //   const selectDelete = checkbox.checked;
  //   console.log("selectDelete:", selectDelete);
  // };

  // const handleCheckbox = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setisChecked([...isChecked, value]);
  //   } else {
  //     setisChecked(isChecked.filter((e) => e !== value));
  //   }
  // };
  return (
    <>
      <section>
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold">Category List </h2>
          <h2>Welcome Back, Client</h2>
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
            <Link href="/create-cate">
              <button className=" rounded-md p-2 bg-green-600 text-white cursor-pointer mr-4">
                + Add Category
              </button>
            </Link>

            <button
              onClick={allDelete}
              className="border border-1  rounded-md text-sm border-red-400 text-red-700 hover:bg-red-200  p-2 hover:border-none"
            >
              Delete
            </button>
          </div>
        </div>
        <table class="table-auto bg-white w-full rounded-md mt-5">
          <thead className="">
            <label>
              <tr className="bg-coolGray-200 text-gray-400 text-sm text-start flex justify-between ">
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
          {getallCategory.map((items) => (
            <tbody>
              <label>
                <tr className="flex justify-between">
                  <td className="">
                    <input
                      type="checkbox"
                      className="mx-3 cursor-pointer mt-5"
                      value={items?._id}
                      checked={items.isChecked}
                      onChange={(e) => handleCheckbox(e)}
                    />
                  </td>
                  <td className="py-5 text-[18px]">
                    {" "}
                    {items?.title ? items?.title : "-"}
                  </td>
                  <td className="py-5 text-[18px] tex">
                    <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                      selling
                    </p>
                  </td>
                  <td className=" flex">
                    <button className="flex">
                      <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500 m-2" />

                      <Link href={`/edit-cate/${items?._id}`}>
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
                              onClick={handleClose}
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
                    </button>
                  </td>
                </tr>
              </label>
            </tbody>
          ))}
        </table>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(CategoryList), { ssr: false });
