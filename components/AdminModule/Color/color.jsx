import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRightIcon, TrashIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import AddColor from "./add-color";
import DeleteColor from "./deleteColor";
import Editcolor from "./edit-color";

const Color = () => {
  const [getallColor, setGetallColor] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [colorID, setColorID] = useState("");
  const [colorEID, setColorEID] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  function openModal(id) {
    setColorID(id);
    setOpenDelete(true);
  }
  function closeModal() {
    setOpenDelete(false);
  }
  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const openDrawerO = (_id) => {
    setColorEID(_id);
    setIsDrawerOpenO(true);
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
  }, []);

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
    
      <button
        onClick={openDrawer}
        className="rounded-md p-2 bg-sky-600 text-white cursor-pointer"
      >
        + Add Color
      </button>
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
            <AddColor />
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
            <Editcolor colorEID={colorEID}/>
          </div>
        </div>
      )}
      {getallColor.map((item) => (
        <div className="border  w-2/12 rounded-md p-2 my-5">
          <div>
            <h1 className="text-center">{item.color}</h1>
          </div>
          <button onClick={() => openDrawerO(item?._id)}>
                        <PencilSquareIcon className="cursor-pointer h-6 w-6  text-sky-600 m-2 " />
                      </button>
          <button
            type="button"
            onClick={() => openModal(item?._id)}
            className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <TrashIcon className="cursor-pointer h-6 w-6 text-red-800   " />
          </button>
        </div>
      ))}
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

export default Color;
