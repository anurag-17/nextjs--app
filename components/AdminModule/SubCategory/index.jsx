"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import {
    MagnifyingGlassPlusIcon,
    TrashIcon,
    PencilSquareIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CreateCategoryForm from "../Category/create-cate";

import DeleteModuleC from "./deleteModal";
import EditCate from "./edit-category";
import { ToastContainer } from "react-toastify";
import WebsiteLoader from "../../websiteLoader";
import ShowSubCategory from "./showSubCategory";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../utlis/config";
import EditSubCategory from "./edit-category";
import AddSubCategory from "./addSubCategory";


const SubCategoryPage = () => {
    const [isOpenDelete, setOpenDelete] = useState(false);
    const [categoryID, setCategoryID] = useState("");
    const [isRefresh, setRefresh] = useState(false);
    const [issubCateDrwaer, setSubCateDrwaer] = useState(false);
    const [cateEdit, setCateEdit] = useState("");
    const [editData, setEditData] = useState([]);
    const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
    const [isLoadingBtn, setLoadingBtn] = useState(false);
  
    
    const [allSubCategory, setAllCategory] = useState([]);
    const { auth_token } = useSelector((state) => state.adminAuth || null);


    const openSubCategory = () => {
        setSubCateDrwaer(true);
    };

    const closeSubCategory = () => {
        setSubCateDrwaer(false);
    };

    function closeModal() {
        setOpenDelete(false);
    }

    function openModal(delId) {
        setCategoryID(delId);
        setOpenDelete(true);
    }
 
    useEffect(() => {
        defaultCategory();
    }, [isRefresh]);


    const defaultCategory = () => {
        setLoadingBtn(true)
        const options = {
            method: "GET",
            url: `${BASE_URL}/subCategory/getallSubCategory`,
            headers: {
                "content-type": "application/json",
                "authorization": auth_token,
            },
        };

        axios
            .request(options)
            .then((response) => {
                setAllCategory(response?.data);
                setLoadingBtn(false)
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoadingBtn(false)
            });
    };

    const refreshData = () => {
        setRefresh(!isRefresh);
    };

    const openDrawerO = async ({subCateId}) => {
        setCateEdit(subCateId);
        try {
          const options = {
            method: "POST",
            url: `${BASE_URL}/subCategory/getSubCategory`,
            headers: {
              "authorization": auth_token,
            },
            data: {
              id: subCateId,
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
      }
      
    return (
        <>
            {
                isLoadingBtn &&
                <WebsiteLoader />
            }
            <ToastContainer />

            <section>

                <div className="flex justify-between items-center pt-4 px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
                    <h2 className="text-2xl font-semibold pb-4"> Sub Category List </h2>
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
                            onClick={openSubCategory}
                            className=" rounded-md p-2 bg-lightBlue-600 text-white cursor-pointer mr-4"
                        >
                            + Add Sub category
                        </button>
                    </div>

                </div>

                {issubCateDrwaer && (
                    <div
                        id="drawer-form"
                        className="fixed content-center mb-5 right-5 z-40 h-[500px] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-4/12  "
                        tabIndex={-1}
                        aria-labelledby="drawer-form-label"
                    >
                        <button
                            type="button"
                            onClick={closeSubCategory}
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
                            <AddSubCategory
                                closeDrawer={closeSubCategory}
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
              <EditSubCategory
                cateEdit={cateEdit}
                closeDrawer={closeDrawerO}
                refreshData={refreshData}
                editData={editData}
              />
            </div>
          </div>
        )}


                <ShowSubCategory allSubCategory={allSubCategory}  openDrawerO={openDrawerO} openModal={openModal} />

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

export default dynamic(() => Promise.resolve(SubCategoryPage), { ssr: false });
