import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AddVendor = () => {
  const router = useRouter();
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

    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/vendor/createVendor",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ9MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
      },
      data: vendorDetails,
    };

    axios.request(options).then(function (response) {
      if (response.status === 200) {
        router.push("/vendor");
      } else {
        setLoading(false);
      }
    });
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
            <div className="flex">
              <div className="w-full">
                <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                  Vendor Name
                </label>
                <input
                  onChange={inputHandler}
                  value={vendorDetails.vendorName}
                  type="text"
                  name="vendorName"
                  className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                  // className="custom-input"
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
                  className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
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
                  className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
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
                  className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
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
                  className="px-3 py-2 rounded m-10   border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                  required
                />
              </div>
            </div>
            <br />
          </div>
          <button
            type="submit"
            className="border p-2 m-10 mt-0 rounded-lg bg-sky-600 text-white text-[20px] "
          >
            Add Vendor
          </button>
        </form>
      </section>
    </>
  );
};

export default AddVendor;
