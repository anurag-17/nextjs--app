import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  PencilSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import EditCustomer from "./editCustomer";
import DeleteModuleCustomer from "./deleteModule";

const headItems = [
  "CUSTOMER NAME",
  "EMAIL",
  "ADDRESS",
  "PHONE NO.",
  "COUNTRY",
  "ACTION",
  "BLOCK/UNBLOCK",
];

const Customers = () => {
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [customerID, setCustomerID] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const [getallCustomer, setGetallCustomer] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [customerEID, setCustomerEID] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const openDrawer = async (_id) => {
    setCustomerEID(_id);
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      if (token) {
        console.log("Token:", token);
        const option = {
          method: "POST",
          url: "https://e-commerce-backend-brown.vercel.app/api/auth/getUserById",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "PostmanRuntime/7.35.0",
            authorization: token,
          },
          data: {
            _id: _id,
          },
        };

        const response = await axios.request(option);
        if (response.status == 200) {
          setEditData(response?.data?.user);

          setIsDrawerOpen(true);
          console.log("aaaa", response?.data?.user);
        } else {
          console.log("error:unexpected response");
        }
      } else {
        console.log("Token not found in local storage");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    defaultCustomer();
  }, []);

  const pageLimit = "15";
  function closeModal() {
    setOpenDelete(false);
  }

  function openModal(id) {
    setCustomerID(id);
    setOpenDelete(true);
  }

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/auth/all-users",
  };
  useEffect(() => {
    defaultCustomer();
  }, [isRefresh]);

  const defaultCustomer = () => {
    axios
      .request(options)
      .then((response) => {
        setGetallCustomer(response.data.users);
        // console.log(response.data.users, "jjjj")

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // -------------search costomer----------

  const handleSearch = (e) => {
    const search = e.target.value;
    if (e.target.value !== "") {
      const option = {
        method: "GET",
        url: `http://e-commerce-backend-brown.vercel.app/api/auth/all-users?search=${e.target.value}`,
      };
      axios
        .request(option)
        .then(function (response) {
          if (response.status === 200) {
            setGetallCustomer(response?.data?.users);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      defaultCustomer();
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center px-10 pt-4 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">Customer List </h2>

        <div className="mb-3 w-[40%]">
          <input
            type="search"
            className=" border border-gray-500  p-3 rounded-xl  w-11/12 outline-none "
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
            onChange={handleSearch}
          />
        </div>
        <h2>Welcome Back, Admin</h2>
      </div>
      <div className="border">
        {isDrawerOpen && (
          <div
            id="drawer-form"
            className="fixed border content-center mb-5 right-5 z-40 h-[75%] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-6/12  "
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
              <EditCustomer
                editData={editData}
                customerEID={customerEID}
                closeDrawer={closeDrawer}
                refreshData={refreshData}
                // token={getTokenFromLocalStorage}
              />
            </div>
          </div>
        )}
      </div>

      <table className="table bg-white w-full mt-5 gap-48 rounded-lg relative">
        <thead className=" bg-gray-200 text-gray-400">
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
        {/* {getallCustomer?.length < 1 && getallCustomer?.map((items) => ( */}

        {getallCustomer?.map((items) => (
          <tbody>
            {/* <label> */}
            <tr className="">
              <Link href={`/admin-customerorder/${items?._id}`}>
                <td className="py-5 text-[18px] text-start px-10">
                  {items?.firstname} {items?.lastname}
                </td>
              </Link>
              <td className="py-5 text-[18px] text-start px-10">
                {items?.email}
              </td>
              <td className="py-5 text-[18px] text-start px-10  ">
                {items?.address}
              </td>
              <td className="py-5 text-[18px] text-start px-10 ">
                {items?.mobile}
              </td>
              <td className="py-5 text-[18px] text-start px-10">
                {items?.country}
              </td>
              <td className="py-5 text-[18px] mx-auto flex  px-10">
                {/* <Link href={`/editCustomer`}></Link> */}
                <button onClick={() => openDrawer(items?._id)}>
                  <PencilSquareIcon className="cursor-pointer h-6 w-6  text-lightBlue-600 m-2 " />
                </button>
                <button
                  type="button"
                  onClick={() => openModal(items?._id)}
                  className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <TrashIcon className="cursor-pointer h-6 w-6 text-red-800   " />
                </button>
              </td>
              <td className="py-5 text-[18px] text-start w-[232px] px-10">
                <label className="relative inline-flex items-center me-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <div className="w-11 h-[25px] bg-gray-200 rounded-full peer  dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {isChecked ? "Unblock" : "Block"}
                  </span>

                  <br />
                  <span className="ml-2"></span>
                </label>
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
                  <DeleteModuleCustomer
                    customerID={customerID}
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

export default Customers;
