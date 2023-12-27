import dynamic from "next/dynamic";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowRightIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import AddColor from "./add-color";
import DeleteColor from "./deleteColor";
import { ToastContainer } from "react-toastify";
import Editcolor from "./edit-color";

const headItems = ["COLOR NAME", "COLOR", "ACTION"];
const Color = () => {
  const [getallColor, setGetallColor] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [colorID, setColorID] = useState("");
  const [colorEdit, setColorEdit] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
  const [editData, setEditData] = useState([]);

  const openDrawerO = async (_id) => {
    setColorEdit(_id);
    try {
      const options = {
        method: "POST",
        url: "https://e-commerce-backend-brown.vercel.app/api/color/getaColor",
        headers: {
          "User-Agent": "PostmanRuntime/7.35.0",
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

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  function openModal(_id) {
    setColorID(_id);
    console.log("hhhh", _id);
    setOpenDelete(true);
  }
  function closeModal() {
    setOpenDelete(false);
  }
  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const closeDrawerO = () => {
    setIsDrawerOpenO(false);
  };

  useEffect(() => {
    defaultColor();
  }, [isRefresh]);
  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/color/getColors",
  };

  const defaultColor = () => {
    axios
      .request(options)
      .then((response) => {
        setGetallColor(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="px-3 lg:px-0">
      <ToastContainer />
      <div className="flex justify-between items-center 2xl:pt-4 2xl:px-10 mt-2 border border-[#f3f3f3] rounded-lg bg-white 2xl:h-[100px] xl:h-[80px] lg:h-[60px] md:h-[50px] sm:h-[45px] h-[45px]  xl:px-8 lg:px-5 md:px-4 sm:px-4 px-4 2xl:text-2xl xl:text-[18px] lg:text-[16px] md:text-[15px] sm:text-[14px] text-[13px]">
        <h2 className=" font-semibold ">Color List </h2>

        <h2>Welcome Back, Admin</h2>
      </div>
      <div className=" flex justify-end  items-center 2xl:px-10 xl:px-8 lg:px-5 md:px-4 sm:px-3 px-2 border border-[#f3f3f3] rounded-lg bg-white w-full 2xl:h-[100px] xl:h-[80px] lg:h-[60px] md:h-[50px] sm:h-[45px] lg:mt-5 sm:mt-3 mt-2 h-[45px]">
        <div className=" ">
          <button
            onClick={openDrawer}
            className=" rounded-md my-auto bg-lightBlue-600 text-white cursor-pointer 2xl:p-3  2xl:text-[18px] xl:p-2 xl:text-[14px] lg:p-[6px] lg:text-[12px] md:text-[10px] md:p-1 sm:text-[10px] sm:p-1 p-[3px] text-[10px]"
          >
            + Add Color
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          id="drawer-form"
          className="fixed content-center mb-5 right-5 z-40 h-[50%] lg:h-[45%] lg:w-4/12 w-6/12 p-4 overflow-y-auto  transition-transform -translate-x-0 bg-white border rounded-lg"
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
          <div className="">
            <AddColor closeDrawer={closeDrawer} refreshData={refreshData} />
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
            <Editcolor
              colorEdit={colorEdit}
              closeDrawer={closeDrawerO}
              refreshData={refreshData}
              editData={editData}
              colorID={colorID}
            />
          </div>
        </div>
      )}
      <table className="table-auto bg-white rounded-md mt-5  relative w-full lg:w-8/12 xl:w-8/12">
        <thead className="">
          <tr className="bg-coolGray-200 text-gray-400 text-start flex w-full 
          2xl:text-[20px] 
          xl:text-[14px]
           lg:text-[12px] 
           md:text-[12px] 
           sm:text-[12px] 
           text-[10px]">
            <th className="mx-4 my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 text-start w-2/12">
              S.NO
            </th>

            <th className="text-start my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 w-4/12 ">
              NAME
            </th>

            <th className="text-start my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 w-3/12 ">
              COLOR
            </th>
            <th className="text-start my-auto py-2 sm:py-2 md:py-2 lg:py-3 xl:py-4 2xl:py-5 w-3/12 ">
              ACTION
            </th>
          </tr>
        </thead>
        {getallColor.map((item, index) => (
          <tbody>
            <tr className="text-start flex w-full 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[14px] sm:text-[13px] text-[10px]">
              <td className="mx-5 my-auto w-2/12">{index + 1 + "."}</td>

              <td className=" my-auto w-4/12">{item.color}</td>
              <td className="flex my-auto w-3/12">
                <div
                  className=" border 2xl:p-5 xl:p-4 lg:p-3 md:p-3 sm:p-3 p-3 rounded-full   2xl:w-30px xl:w-25px lg:w-20px md:w-30px  sm:w-30px w-18px  2xl:h-30px xl:h-25px lg:h-20px md:h-20px sm:h-20px h-20px"
                  style={{
                    marginTop: "0px",
                    backgroundColor: item.color || "",
                  }}
                ></div>
              </td>
              <td className="w-3/12 ">
                <div className="flex my-3">
                  <div>
                    <button onClick={() => openDrawerO(item?._id)}>
                      <PencilSquareIcon className="cursor-pointer 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 md:h-6 md:w-6 h-5 w-5  text-lightBlue-600 m-2 " />
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => openModal(item?._id)}
                      className="rounded-md  bg-opacity-20 px-2 py-2 md:px-2 md:py-2 lg:px-4 lg:py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <TrashIcon className="cursor-pointer 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 md:h-6 md:w-6 h-5 w-5 text-red-800" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

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
                  <DeleteColor
                    colorID={colorID}
                    closeModal={closeModal}
                    refreshData={refreshData}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Color), { ssr: false });
