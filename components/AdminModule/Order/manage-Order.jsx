import React, { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  ArrowRightIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import DetailsDrawer from "./detailsDrawer";
import DeliveryStatus from "./deliveryStatus";

export const headItems = ["s. no.", "Order ID", "No of product", "payment method", "order status",];
export const statusItems = [
  "Not Processed",
  "Cash on Delivery",
  "Processing",
  "Dispatched",
  "Cancelled",
  "Delivered",
]

const ManageOrders = ({ allOrders }) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [orders_products, setOrders_products] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);

  const openDrawer = (order) => {
    setIsDrawerOpen(!isDrawerOpen);
    setOrders_products(order)
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const closeModal = () => {
    setOpenModal(false);
  };



  return (
    <div className="bg-gray-100 min-h-screen  ">
      <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">Orders List </h2>
        <h2>Welcome Back, Admin</h2>
      </div>

      {isDrawerOpen && (
        <div
          id="drawer-form"
          className="fixed content-center mb-5 right-5 z-40 max-h-[500px] p-4 overflow-y-auto  transition-transform -translate-x-0 bg-[#f3f3f3]  dark:bg-gray-800 border rounded-lg"
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
            <DetailsDrawer orderDetails={orders_products} />
          </div>
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {headItems?.map((headerItem, inx) => (
                <th className="p-4 border-b text-[18px] font-semibold capitalize text-left" key={inx}>
                  {headerItem}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allOrders?.length > 0 &&
              allOrders?.map((tableData, index) => (
                <tr key={index} className="" >
                  <td className="p-4 border-b">
                    <p className="text-gray-800 font-medium"> {index + 1}</p>
                  </td>
                  <td className="p-4 border-b">
                    <p className="text-gray-800 font-medium hover:text-lightBlue-700 cursor-pointer"
                      onClick={() => openDrawer(tableData?.products)}> Order : {tableData?._id}</p>
                  </td>
                  <td className="p-4 border-b">
                    <p className="text-gray-800 font-medium"> {tableData?.products?.length} products</p>
                  </td>
                  <td className="p-4 border-b">
                    <p className="text-gray-800 font-medium"> {tableData?.orderStatus}</p>
                  </td>
                  <td className="p-4 border-b flex gap-x-3 items-end">
                    <p className="">
                      <span
                        className={
                          tableData?.status == "Processing"
                            ? "bg-green-200 p-2 rounded-lg"
                            : tableData.status == "Completed"
                              ? "bg-blue-200 p-2 rounded-lg"
                              : "bg-gray-200 p-2 rounded-lg"
                        }
                      >
                        Not Processed
                      </span>
                    </p>
                    <p className="text-[13px] underline cursor-pointer font-medium"
                      onClick={() => setOpenModal(true)}> Change status</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Transition appear show={isOpenModal} as={Fragment}>
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
                    Change status
                  </Dialog.Title>
                  <DeliveryStatus
                    statusItems={statusItems}
                    closeModal={closeModal}
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

export default ManageOrders;
