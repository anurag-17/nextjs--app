"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import CreateCategoryForm from "../Category/create-cate";

import DeleteModuleC from "./deleteMudule";
import EditCate from "./edit-category";
import { ToastContainer } from "react-toastify";
import WebsiteLoader from "../../websiteLoader";


const headItems = ["S. No.","NAME", "PUBLISHED", "ACTION"];

const CategoryList = () => {
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [categoryID, setCategoryID] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const [getallCategory, setGetallCategory] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cateEdit, setCateEdit] = useState("");
  const [editData, setEditData] = useState([]);
  const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
  const [isLoadingBtn, setLoadingBtn] = useState(false);

  const openDrawerO = async (_id) => {
    setCateEdit(_id);
    try {
      const options = {
        method: "POST",
        url: "https://e-commerce-backend-brown.vercel.app/api/category/getCategory",
        data: {
          id: _id,
        },
      };
      const response = await axios.request(options);
      if (response.status === 200) {
        setEditData(response?.data);
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

  function closeModal() {
    setOpenDelete(false);
  }

  function openModal(id) {
    setCategoryID(id);
    setOpenDelete(true);
  }
  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  useEffect(() => {
    defaultCategory();
  }, [isRefresh]);
  

  const defaultCategory = () => {
    setLoadingBtn(true)
      const options = {
        method: "GET",
        url: "https://e-commerce-backend-brown.vercel.app/api/category/getallCategory",
      };

    axios
      .request(options)
      .then((response) => {
        setGetallCategory(response?.data);
        setLoadingBtn(false)
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoadingBtn(false)
      });
  };

  return (
    <>
    {
        isLoadingBtn &&
        <WebsiteLoader />
      }
    <ToastContainer/>


      <section>
        <div className="flex justify-between items-center pt-4 px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold pb-4">Main  Category List </h2>
          <div className="mb-3 w-[40%]">
            <input
              type="search"
              className=" border border-gray-500 p-3 rounded-xl focus:border-none w-11/12 "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
          </div>
          <h2>Welcome Back, Admin</h2>
        </div>
       
          <div className="flex justify-end items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
            <div className="flex justify-around">
              <button
                onClick={openDrawer}
                className=" rounded-md p-2 bg-lightBlue-600 text-white cursor-pointer mr-4"
              >
                + Add category
              </button>
            </div>
          
          </div>

        {isDrawerOpen && (
          <div
            id="drawer-form"
            className="fixed content-center mb-5 right-5 z-40 h-[500px] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-4/12  "
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
            <div>
              <CreateCategoryForm
                closeDrawer={closeDrawer}
                refreshData={refreshData}
              />
            </div>
          </div>
        )}

        {isDrawerOpenO && (
          <div
            id="drawer-form"
            className="fixed content-center mb-5 right-5 z-40 h-[500px] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-4/12  "
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
              <EditCate
                cateEdit={cateEdit}
                closeDrawer={closeDrawerO}
                refreshData={refreshData}
                editData={editData}
              />
            </div>
          </div>
        )}

     

    <div className="flex lg:flex-row flex-col gap-y-10 gap-x-10">
    <table className="table-auto bg-white rounded-md mt-5  relative  ">
          <thead className="">
            <tr className="bg-coolGray-200 text-gray-400 text-sm text-start  grid grid-cols-4 justify-between items-center gap-x-20 ">
            
              {headItems.map((items, inx) => (
                <th
                className=" py-5 px-4 text-[14px] font-medium uppercase  text-left"
                key={inx}
                >
                  {items}
                </th>
              ))}
            </tr>
          </thead>
          {getallCategory?.map((items, index) => {
            return (
              <tbody key={index} >
                  <tr
                    className="grid grid-cols-4 justify-between  cursor-pointer gap-x-20 text-left  px-4 "
                    >
                  
                    <td className="py-5 text-[18px] capitalize ">
                      {index + 1}
                    </td>
                  
                    <td className="py-5 text-[18px] capitalize ">
                      {items?.title ? items?.title : "-"}
                    </td>
                    <td className="py-5 text-[18px] ">
                      <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                        selling
                      </p>
                    </td>
                    <td >
                      <div className="flex gap-5">
                        <button onClick={() => openDrawerO(items?._id)}>
                          <PencilSquareIcon className="cursor-pointer h-6 w-6  text-lightBlue-600 m-2 " />
                        </button>
                        <button
                          type="button"
                          onClick={() => openModal(items?._id)}
                          className="rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          <TrashIcon className="cursor-pointer h-6 w-6 text-red-800   " />
                        </button>
                      </div>
                    </td>
                  </tr>
              </tbody>
            );
          })}
        </table>
    </div>



      </section>
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
                  <DeleteModuleC
                    categoryID={categoryID}
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

export default dynamic(() => Promise.resolve(CategoryList), { ssr: false });
