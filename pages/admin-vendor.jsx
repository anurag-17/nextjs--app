import dynamic from "next/dynamic";
import React, { useEffect, useState,Fragment } from "react";
import Link from "next/link";
import { Transition, Dialog } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import Grid from "../components/AdminModule/Product/svg/Grid";
import List from "../components/AdminModule/Product/svg/List";
import DeleteModuleV from "../components/AdminModule/Vendor/deleteModule";
import UpdateVendor from "../components/AdminModule/Vendor/editVendor";
import AddVendor from "../components/AdminModule/Vendor/addVendor";

import {
  TrashIcon,
  PencilSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const headItems = [
  "VENDOR NAME",
  "COMPANY NAME",
  "EMAIL",
  "PHONE NO.",
  "ADDRESS",
  "ACTION",
];

const vendor = () => {
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [vendorID, setVendorID] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const [getAllVendors, setgetAllVendors] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [vendorEdit, setVendorEdit] = useState("");
  const [isShowComponent, setShowComponent] = useState("list");
  const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
  const [editData, setEditData] = useState({});

  const openDrawerO = async (_id) => {
    setVendorEdit(_id)
    try {
      const options = {
        method: "POST",
        url: "https://e-commerce-backend-brown.vercel.app/api/vendor/getaVendor",
        headers: {
          "User-Agent": "insomnia/2023.5.8",
        },
        data: {
          id: _id,
        },
      };
      const response = await axios.request(options);
      if (response.status === 200) {
        setEditData(response?.data?.result);
        setIsDrawerOpenO(true);
      } else {
        console.error("Error: Unexpected response status");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeDrawerO = () => {
    setIsDrawerOpenO(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const pageLimit = "15";
  function closeModal() {
    setOpenDelete(false);
  }

  function openModal(id) {
    setVendorID(id);
    setOpenDelete(true);
  }
  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  useEffect(() => {
    defaultVendor();
  }, [isRefresh]);

  const defaultVendor = () => {
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/vendor/getAllVendors",
    };
    axios
      .request(options)
      .then((response) => {
        setgetAllVendors(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //------search---------
  const handleSearch = (e) => {
    const search = e.target.value;
    if (e.target.value !== "") {
      const option = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/vendor/getAllVendors?search=${e.target.value}`,
      };
      axios
        .request(option)
        .then(function (response) {
          if (response.status === 200) {
            setgetAllVendors(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      defaultVendor();
    }
  };

  //----------grid/list--------
  const handleShowComponent = (component) => {
    setShowComponent(component);
  };

  return (
    <>
       <ToastContainer />
      <div>
        <div className="flex justify-between items-center px-10 pt-4 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold pb-4">All Vendors</h2>
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

          <h2>Welcome Back, Admin</h2>
        </div>
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
          <div className="flex justify-center items-end gap-x-3 mr-3">
            <div
              className={`cursor-pointer border h-[30px] w-[30px] flex justify-center items-center 
                ${
                  isShowComponent === "grid"
                    ? "border-lightBlue-300"
                    : "border-transparent"
                }`}
              onClick={() => handleShowComponent("grid")}
            >
              <Grid />
            </div>
            <div
              className={`cursor-pointer border-2 h-[30px] w-[30px] flex justify-center items-center 
                ${
                  isShowComponent === "list"
                    ? "border-lightBlue-300 "
                    : "border-transparent"
                }`}
              onClick={() => handleShowComponent("list")}
            >
              <List />
            </div>
          </div>
          <div className="flex justify-around">
            <button
              onClick={openDrawer}
              className=" rounded-md p-2 bg-lightBlue-600 text-white cursor-pointer mr-4"
            >
              + Add Vendor
            </button>

            <button className="border border-1  rounded-md text-sm border-red-400 text-red-700 hover:bg-red-200  p-2 hover:border-none">
              Delete
            </button>
          </div>
        </div>

        {isDrawerOpen && (
          <div
            id="drawer-form"
            className="fixed content-center mb-5 right-5 z-40 h-[65%] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-6/12  "
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
              <AddVendor   refreshData={refreshData} closeDrawer = {closeDrawer} />
            </div>
          </div>
        )}

        {isDrawerOpenO && (
          <div
            id="drawer-form"
            className="fixed content-center mb-5 right-5 z-40 h-[65%] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-6/12  "
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
            <div className="overflow-y-auto ">
              <UpdateVendor editData={editData} closeDrawer={closeDrawerO} vendorEdit = {vendorEdit}    refreshData={refreshData}/>
            </div>
          </div>
        )}

        {isShowComponent === "grid" ? (
          <>
            <div className="flex flex-wrap  justify-evenly ">
              {getAllVendors.map((item) => (
                <div className="border rounded-lg bg-white w-[28%] p-8 my-5">
                  <div className="flex">
                    {/* vender profile image */}
                    <div className="w-36 mt-14 ">
                      <img
                        src="/profile.png"
                        className="w-20  border-[5px] border-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-full"
                      />
                    </div>
                    <div>
                      <h1 className="text-[28px] font-medium">
                        {item?.vendorName}
                      </h1>
                      <div className="flex my-5">
                        <img src="/ph.svg" className="mr-3  w-5" />
                        <h2 className="text-gray-500 text-[20px] font-medium">
                          <a href="tel:8349335812">{item?.phone}</a>
                        </h2>
                      </div>
                      <div className="flex my-5">
                        <img src="/mail.svg" className="mr-3  w-5" />
                        <h2 className="text-gray-500 text-[20px] font-medium">
                          <a href="mailto:hariompatil9@gmail.com">
                            {item?.email}
                          </a>
                        </h2>
                      </div>
                      <div className="flex my-5">
                        <img src="/location.svg" className="mr-3  w-6" />
                        <h2 className="text-gray-500 text-[20px] font-medium">
                          <a href="tel:0731-22552255">{item?.address}</a>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <hr className="my-7" />
                  <div className="flex pt-6">
                    <div>
                      <p className="text-[22px]">Items </p>
                      <p className=" text-[22px] font-medium my-3">120</p>
                    </div>
                    <div className="w-[2px] bg-gray-300 h-20  mx-auto "></div>
                    <div>
                      <p className="text-[22px]">Sells</p>
                      <p className=" text-[22px] font-medium my-3">1206</p>
                    </div>
                    <div className="w-[1px] bg-gray-300 h-20 mx-auto "></div>
                    <div>
                      <p className="text-[22px]">Earning</p>{" "}
                      <p className=" text-[22px] font-medium my-3">92852</p>
                    </div>
                  </div>
                  <div>
                    <Link href={`/vendor-profile/${item?._id}`}>
                      <button className="border py-2 px-5 w-full mt-5 rounded-lg bg-lightBlue-600 text-white text-[20px] ">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <table className="table bg-white w-full mt-5 gap-48 rounded-lg relative">
              <thead className=" bg-gray-200 text-gray-400 ">
                <tr className="gap-48 ">
                  {headItems.map((items, inx) => (
                    <th
                      className="text-start py-5 text-[14px] font-medium px-10 "
                      key={inx}
                    >
                      {items}
                    </th>
                  ))}
                </tr>
              </thead>
              {getAllVendors?.map((items) => (
                <tbody>
                  <tr className="">
                    <td className="py-5 text-[18px] px-10">
                      {items?.vendorName}{" "}
                    </td>
                    <td className="py-5 text-[18px] px-10 ">
                      {items?.companyName}
                    </td>
                    <td className="py-5 text-[18px] px-10">{items?.email}</td>
                    <td className="py-5 text-[18px] px-10 ">{items?.phone}</td>
                    <td className="py-5 text-[18px] px-10 ">
                      {items?.address}
                    </td>
                    <td className="py-5 text-[18px] mx-auto flex px-10">
                      <button onClick={() => openDrawerO(items?._id)}>
                        <PencilSquareIcon className="cursor-pointer h-6 w-6 text-lightBlue-600 m-2 " />
                      </button>
                      <button
                        type="button"
                        onClick={() => openModal(items?._id)}
                        className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        <TrashIcon className="cursor-pointer h-6 w-6 text-red-800 " />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </>
        )}
      </div>

      {/*------------ delete modal---------- */}
      <Transition appear show={isOpenDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white py-10 px-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="lg:text-[25px] text-[16px] font-semibold leading-6 text-gray-900"
                  >
                    Are You Sure! Want to Delete?
                  </Dialog.Title>
                  <DeleteModuleV
                    vendorID={vendorID}
                    closeModal={closeModal}
                    refreshData={refreshData}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default dynamic(() => Promise.resolve(vendor), { ssr: false });
