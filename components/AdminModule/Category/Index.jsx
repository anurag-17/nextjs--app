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

const headItems = ["S. No.", "NAME", "PUBLISHED", "ACTION"];

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
    setLoadingBtn(true);
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/category/getallCategory",
    };

    axios
      .request(options)
      .then((response) => {
        setGetallCategory(response?.data);
        // console.log(response?.data, "jjjj");

        setLoadingBtn(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoadingBtn(false);
      });
  };

  // -------------search Category----------

  const handleSearch = (e) => {
    const search = e.target.value;
    if (e.target.value !== "") {
      const option = {
        method: "GET",
        url: `http://e-commerce-backend-brown.vercel.app/api/category/getallCategory?search=${e.target.value}`,
      };
      axios
        .request(option)
        .then(function (response) {
          if (response.status === 200) {
            setGetallCategory(response?.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      defaultCategory();
    }
  };

  return (
    <>
      {isLoadingBtn && <WebsiteLoader />}
      <ToastContainer />

      <section>
        <div className="flex justify-between items-center 2xl:pt-4 2xl:px-10 mt-2 border border-[#f3f3f3] rounded-lg bg-white 2xl:h-[100px] xl:h-[80px] lg:h-[60px] md:h-[50px] sm:h-[45px] h-[45px]  xl:px-8 lg:px-5 md:px-4 sm:px-4 px-4 2xl:text-2xl xl:text-[18px] lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px]">
          <h2 className=" font-semibold ">Main Category List </h2>
          <div className="flex items-center w-[40%]">
            <input
              type="search"
              className=" border border-gray-500 p-[2px] lg:p-[4px] 2xl:p-3 rounded-lg  w-11/12 focus:outline-none "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
              onChange={handleSearch}
            />
          </div>
          <h2>Welcome Back, Admin</h2>
        </div>

        <div className=" flex justify-end  items-center 2xl:px-10 xl:px-8 lg:px-5 md:px-4 sm:px-3 px-2 border border-[#f3f3f3] rounded-lg bg-white w-full 2xl:h-[100px] xl:h-[80px] lg:h-[60px] md:h-[50px] sm:h-[45px] lg:mt-5 sm:mt-3 mt-2 h-[45px]">
          <div className="flex justify-around">
            <button
              onClick={openDrawer}
              className=" rounded-md my-auto bg-lightBlue-600 text-white cursor-pointer 2xl:p-3  2xl:text-[18px] xl:p-2 xl:text-[14px] lg:p-[6px] lg:text-[12px] md:text-[10px] md:p-1 sm:text-[10px] sm:p-1 p-[3px] text-[10px]"
            >
              + Add category
            </button>
          </div>
        </div>

        {isDrawerOpen && (
          <div
            id="drawer-form"
            className="fixed content-center mb-5 right-5 z-40 h-[50%] lg:h-[45%] lg:w-4/12 w-6/12  p-4 overflow-y-auto  transition-transform -translate-x-0 bg-white    border rounded-lg"
            tabIndex={-1}
            aria-labelledby="drawer-form-label"
          >
            <button
              type="button"
              onClick={closeDrawer}
              className="text-gray-400  shadow-2xl text-sm lg:w-14  top-2  inline-flex items-center justify-center "
            >
              <svg
                className="2xl:w-9 2xl:h-9 xl:w-9 xl:h-9 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-6  sm:h-6 w-5 h-5 bg-white border  rounded-lg p-1 hover:bg-orange-100 hover:text-black"
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
            className="fixed content-center mb-5 right-5 z-40 h-[50%] lg:h-[45%] lg:w-4/12 w-6/12 p-4 overflow-y-auto transition-transform -translate-x-0 bg-white "
            tabIndex={-1}
            aria-labelledby="drawer-form-label"
          >
            <button
              type="button"
              onClick={closeDrawerO}
              className="text-gray-400  shadow-2xl text-sm lg:w-14  top-2  inline-flex items-center justify-center "
            >
              <svg
                className="2xl:w-9 2xl:h-9 xl:w-9 xl:h-9 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-6  sm:h-6 w-5 h-5 bg-white border  rounded-lg p-1 hover:bg-orange-100 hover:text-black"
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

        <div>
          <table className="table-auto bg-white rounded-md mt-5  relative w-full lg:w-8/12 xl:w-8/12">
            <thead className="">
              <tr
                className="bg-coolGray-200 text-gray-400 text-start flex w-full 
          2xl:text-[20px] 
          xl:text-[14px]
           lg:text-[12px] 
           md:text-[12px] 
           sm:text-[12px] 
           text-[10px]"
              >
                <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-2/12">
                  S. No.
                </th>
                <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-4/12">
                  NAME
                </th>
                <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-3/12">
                  PUBLISHED
                </th>
                <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-3/12">
                  ACTION
                </th>
              </tr>
            </thead>
            {getallCategory?.map((items, index) => {
              return (
                <tbody key={index}>
                  <tr className="text-start flex w-full 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[14px] sm:text-[13px] text-[10px]">
                    <td className="mx-5 my-auto w-2/12">{index + 1}</td>
                    <td className=" my-auto w-4/12">
                      {items?.title ? items?.title : "-"}
                    </td>
                    <td className="flex my-auto w-3/12">
                      <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                        selling
                      </p>
                    </td>
                    <td className="w-3/12 ">
                      <div className="flex lg:gap-5 my-3">
                        <button onClick={() => openDrawerO(items?._id)}>
                          <PencilSquareIcon className="cursor-pointer 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 md:h-6 md:w-6 h-5 w-5  text-lightBlue-600 m-2 " />
                        </button>
                        <button
                          type="button"
                          onClick={() => openModal(items?._id)}
                          className="rounded-md  bg-opacity-20 px-2 py-2 md:px-2 md:py-2 lg:px-4 lg:py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          <TrashIcon className="cursor-pointer 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 md:h-6 md:w-6 h-5 w-5 text-red-800" />
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
