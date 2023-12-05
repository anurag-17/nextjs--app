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
    console.log("hhhh",_id)
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

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/color/getColors",
  };
  useEffect(() => {
    defaultColor();
  }, [isRefresh]);

  const defaultColor = () => {
    axios
      .request(options)
      .then((response) => {
        setGetallColor(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
    <ToastContainer/>
      <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">Color List </h2>

        <h2>Welcome Back, Admin</h2>
      </div>
      <div className="  items-center px-10 border border-[#f3f3f3] rounded-lg bg-white w-full h-[100px] mt-5">
        <div className="flex justify-end mt-7 ">
          <button
            onClick={openDrawer}
            className="rounded-md p-2 bg-lightBlue-600 text-white cursor-pointer"
          >
            + Add Color
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
            <AddColor closeDrawer={closeDrawer} refreshData={refreshData} />
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
      <table className="table-auto bg-white rounded-md mt-5  relative w-6/12">
        <thead className="">
          <tr className="bg-coolGray-200 text-gray-400 text-sm text-start flex justify-between gap-28 ">
            <input
              type="checkbox"
              className="mx-3  cursor-pointer "
              // onChange={handleSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
            {headItems.map((items, inx) => (
              <th
                className="text-start py-5 text-[16px] font-medium w-4/12 "
                key={inx}
              >
                {items}
              </th>
            ))}
          </tr>
        </thead>
        {getallColor.map((item) => (
          <tbody>
            <label>
              <tr className="text-start flex justify-between gap-28">
                <td className="my-auto">
                  <input type="checkbox" className="mx-3  cursor-pointer " />
                </td>
                <td className="text-[18px] w-3/12 my-auto">{item.color}</td>
                <td className="text-[18px] w-3/12 my-auto ml-3 ">
                  <div
                    className="border w-2/12 p-4 rounded-full"
                    style={{
                      marginTop: "20px",
                      width: "30px",
                      height: "30px",
                      backgroundColor: item.color || "",
                    }}
                  ></div>
                </td>
                <td className=" text-[18px] w-3/12 ">
                  <div className="flex my-3">
                    <div>
                      <button onClick={() => openDrawerO(item?._id)}>
                        <PencilSquareIcon className="cursor-pointer h-6 w-6  text-lightBlue-600 m-2 " />
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => openModal(item?._id)}
                        className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        <TrashIcon className="cursor-pointer h-6 w-6 text-red-800   " />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </label>
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
