import React, { useEffect, useState } from "react";
import Image from "next/image";
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
import CreateCurrency from "./create-currency";
import EditCurrency from "./edit-currency";

const Currency = () => {
  const [getCurrency, setGetCurrency] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
  const [currencyEdit,setCurrencyEdit]=useState("");

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDrawerO = (_id) => {
    setCurrencyEdit(_id);
    setIsDrawerOpenO(true);
  };

  const closeDrawerO = () => {
    setIsDrawerOpenO(false);
  };

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/currency/getAllCurrencies",
  };
  useEffect(() => {
    defaultCurrency();
  }, []);
  const defaultCurrency = () => {
    axios
      .request(options)
      .then((response) => {
        setGetCurrency(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeCurrency = async (_id) => {
    console.log(_id);
    try {
      const payload = {
        id: _id,
      };
      const response = await fetch(
        `https://e-commerce-backend-brown.vercel.app/api/currency/deleteCurrency`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Currency deleted successfully!");
        defaultCurrency();
      } else {
        throw new Error("Failed to delete currency");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center px-10 pt-4 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold pb-4">Currency </h2>
          <div className="mb-3 w-[40%]">
            <input
              type="search"
              className=" border border-gray-500  p-3 rounded-xl focus:border-none w-11/12 "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
          </div>

          <h2>Welcome Back, Admin</h2>
        </div>

        <div className="flex justify-end items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
          <div className="flex justify-around">
            <Link href="/currency"></Link>
            <button
              onClick={openDrawer}
              className=" rounded-md p-2 bg-lightBlue-600 text-white cursor-pointer mr-4"
            >
              + Add Currency
            </button>

            <button className="border border-1  rounded-md text-sm border-red-400 text-red-700 hover:bg-red-200  p-2 hover:border-none">
              Delete
            </button>
          </div>
        </div>

        {isDrawerOpen && (
          <div
            id="drawer-form"
            className="fixed content-center mb-5 right-5 z-40 h-[65%] p-4 overflow-y-auto transition-transform -translate-x-0 bg-white w-6/12 dark:bg-gray-800"
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
              <CreateCurrency />
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
              <EditCurrency currencyEdit={currencyEdit} />
            </div>
          </div>
        )}

        <div>
          <div className="relative overflow-x-auto w-3/5">
            <table className="w-full text-sm text-left  dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-[#E5E7EB] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <input type="checkbox" classNameName="" />
                  </th>
                  <th scope="col" className="px- py-3">
                    Currency
                  </th>
                  <th scope="col" className="px- py-3">
                    Currency Sign
                  </th>
                  <th scope="col" className="px- py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {getCurrency.map((item) => (
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-3">
                      <input type="checkbox" classNameName="" />
                    </td>
                    <td className="px- py-4">{item?.currencyName}</td>
                    <td className="">{item?.currencySign}</td>

                    <td className=" flex">
                      <button className="flex">
                        <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500 m-2" />

                        {/* <Link href={`/edit-brand/${items?._id}`}> */}
                        <button onClick={() => openDrawerO(item?._id)}>
                          <PencilSquareIcon className="cursor-pointer h-6 w-6  text-lightBlue-600 m-2 " />
                        </button>
                        {/* </Link> */}

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
                                  Do you really want to delete these records?
                                  You cant't view this in your list anymore if
                                  you delete!
                                </p>
                                <div className="flex justify-around">
                                  <button
                                    className="border border-1 rounded-md border-lightBlue-400 text-lightBlue-700 hover:bg-lightBlue-200 text-sm  p-1
                              hover:border-none"
                                  >
                                    No, Keep It
                                  </button>
                                  <button
                                    onClick={() => {
                                      removeCurrency(item?._id);
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
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Currency;
