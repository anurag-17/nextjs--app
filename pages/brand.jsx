"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Transition, Popover } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CreateBrand from "./create-brand";
import Editbrand from "./edit-brand/[slug]";

const brandlist = () => {
  const [getallBrand, setGetallBrand] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [productSearch, setProductSearch] = useState(["All"]);
  const [selected, setSelected] = useState([]);
  const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDrawerO = () => {
    setIsDrawerOpenO(true);
  };

  const closeDrawerO = () => {
    setIsDrawerOpenO(false);
  };

  const handleClose = () => {
    closeModal();
    refreshData();
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  console.log(selected);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = allProduct?.map((n) => n?._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

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

  // -------------search product----------
  const handleSearch = (e) => {
    const search = e.target.value;
    if (e.target.value !== "") {
      const option = {
        method: "GET",
        url: `http://e-commerce-backend-brown.vercel.app/api/brand/getallBrand?search=${e.target.value}`,
      };
      axios
        .request(option)
        .then(function (response) {
          if (response.status === 200) {
            setGetallBrand(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      defaultBrand();
    }
  };

  const allDelete = async () => {
    try {
      console.log(isChecked);
      const response = await axios.post(
        `https://e-commerce-backend-brown.vercel.app/api/brand/deleteBulkBrands`,
        { brandIds: selected }
      );

      // Check the HTTP status code for success (2xx codes)
      if (response.status === 200) {
        console.log("Successfully deleted brands");
        // Call the function to refresh your brand data
        defaultBrand();
      } else {
        // Handle other status codes or error responses from the server
        console.error(
          "Failed to delete brands. Status code: " + response.status
        );
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

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <>
      <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">Brand List </h2>

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
      <div className="  items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
        <div className="flex  justify-end mt-7 ">
          <Link href="/create-brand"></Link>
          <button
            onClick={openDrawer}
            className="rounded-md p-2 bg-sky-600 text-white cursor-pointer"
          >
            + Add Brand
          </button>
          <button
            onClick={allDelete}
            className="border border-1 mx-5 rounded-md text-sm border-red-400 text-red-700 hover:bg-red-200  p-2 hover:border-none"
          >
            Delete
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          id="drawer-form"
          className="fixed content-center mb-5 right-5 z-40 h-[45%] p-4 overflow-y-auto  transition-transform -translate-x-0 bg-white w-4/12 dark:bg-gray-800 border rounded-lg"
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
          <div className="">
            <CreateBrand />
          </div>
        </div>
      )}

      {isDrawerOpenO && (
        <div
          id="drawer-form"
          className="fixed content-center mb-5 right-5 z-40 h-[45%] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-4/12 dark:bg-gray-800"
          tabIndex={-1}
          aria-labelledby="drawer-form-label"
        >
          <button
            type="button"
            onClick={closeDrawerO}
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
          <div>
            <Editbrand />
          </div>
        </div>
      )}

      <table class="table-auto  bg-white  rounded-md mt-5 relative">
        <thead className="">
          <label>
            <tr className="bg-coolGray-200 text-gray-400 text-sm text-start flex gap-48 items-center ">
              <input
                type="checkbox"
                className="mx-3 my-5 cursor-pointer"
                value="selectAll"
                // checked={selectAll}
                onChange={handleSelectAllClick}
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
              <tr className="flex gap-48">
                <td className="">
                  <input
                    type="checkbox"
                    // checked={selectDelete}
                    className="mx-3 mt-5 cursor-pointer "
                    value={items?._id}
                    checked={items.isChecked}
                    onClick={(event) => handleClick(event, items?._id)}
                  />
                </td>
                <td className="py-5 text-[18px] w-[2%]">
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
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          openDrawerO();
                        }}
                      >
                        <PencilSquareIcon className="cursor-pointer h-6 w-6  text-sky-600 m-2 " />
                      </button>
                    </Link>

                    <Popover className=" ">
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
                        <Popover.Panel className="absolute top-20 z-10 bg-white shadow-2xl border-2 rounded-lg border-gray p-3  w-6/12 right-72 ">
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
                                className="border border-1 rounded-md border-sky-400 text-sky-700 hover:bg-sky-200 text-sm  p-1
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
