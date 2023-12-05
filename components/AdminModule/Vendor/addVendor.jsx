import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddVendor = ({ refreshData, closeDrawer }) => {
  const [isLoading, setLoading] = useState(false);
  const [vendorDetails, setVendorDetails] = useState({
    vendorName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setVendorDetails({
        ...vendorDetails,
        [name]: value.split(","),
      });
    } else {
      setVendorDetails({
        ...vendorDetails,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const options = {
        method: "POST",
        url: "https://e-commerce-backend-brown.vercel.app/api/vendor/createVendor",
        headers: {
          "Content-Type": "application/json",
        },
        data: vendorDetails,
      };

      axios.request(options).then(function (response) {
        if (response.status === 200) {
          toast.success("Successfully added !");
          setLoading(false);
          closeDrawer()
          refreshData();
        } else {
          toast.error("Failed!");
          setLoading(false);
          return;
        }
      });
    } catch {
      toast.error("Failed!");
      setLoading(false);
      console.log("error");
    }
  };

  return (
    <>
      <section className=" overflow-y-auto">
        <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[70px] my-5 ">
          <h2 className="text-2xl font-semibold pb-4">Add New Vendor </h2>
          <div className="mb-3 w-[40%]"></div>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className=" bg-white border  rounded-lg p-2 mx-auto"
        >
          <div>
            <div className="flex mt-5">
              <div className="w-full">
                <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                  Vendor Name
                </label>
                <input
                  onChange={inputHandler}
                  value={vendorDetails.vendorName}
                  type="text"
                  name="vendorName"
                  className="px-3 py-2 rounded  m-16  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                  // className="custom-input"
                  // placeholder="Vendor name"
                  required
                  minLength={3}
                  max={84}
                />{" "}
              </div>
              <div className="w-full">
                <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                  Company Name
                </label>
                <input
                  onChange={inputHandler}
                  value={vendorDetails.companyName}
                  type="text"
                  name="companyName"
                  className="px-3 py-2 rounded  m-16  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                  required
                />{" "}
              </div>
            </div>
            <div className="flex">
              <div className="w-full">
                <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                  Email
                </label>
                <input
                  onChange={inputHandler}
                  value={vendorDetails.email}
                  type="text"
                  name="email"
                  className="px-3 py-2 rounded  m-16  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                  required
                />{" "}
              </div>
              <div className="w-full">
                <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                  Phone No.
                </label>
                <input
                  onChange={inputHandler}
                  value={vendorDetails.phone}
                  type="number"
                  name="phone"
                  className="px-3 py-2 rounded  m-16  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                  required
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-6/12">
                <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                  Address
                </label>
                <input
                  onChange={inputHandler}
                  value={vendorDetails.address}
                  type="text"
                  name="address"
                  className="px-3 py-2 rounded m-16   border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                  required
                />
              </div>
            </div>
            <br />
          </div>
          {
            isLoading ?
          <button
            type="button"
            className="border p-3 m-2 rounded-lg bg-gray-500 text-white text-[20px]"
          >
           Loading...
          </button>
          :
          <button
            type="submit"
            className="border py-2 px-6 m-16 mt-0 rounded-lg bg-lightBlue-600 text-white text-[16px] font-semibold "
          >
            Add Vendor
          </button>
}
        </form>
      </section>
    </>
  );
};

export default AddVendor;
