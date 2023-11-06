import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const Currency = () => {
  const [getCurrency, setGetCurrency] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const options = {
    method: "GET",
    url: "http://e-commerce-backend-brown.vercel.app/api/currency/getAllCurrencies",
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

          <h2>Welcome Back, Client</h2>
        </div>

        <div className="flex justify-end items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
          <div className="flex justify-around">
            <Link href="#"></Link>
            <button
              // onClick={openDrawer}
              className=" rounded-md p-2 bg-sky-600 text-white cursor-pointer mr-4"
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
           {/* <AddVendor/> */}
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
