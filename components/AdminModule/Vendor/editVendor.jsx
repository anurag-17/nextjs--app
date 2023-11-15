import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const UpdateVendor = ({ editData, closeDrawer, vendorEdit, refreshData }) => {


  const [isLoading, setLoading] = useState(false)
  const [updateVendor, setUpdateVendor] = useState({
    vendorName: editData?.vendorName || "",
    companyName:  editData?.companyName || "",
    email:  editData?.email || "",
    phone:  editData?.phone || "",
    address:  editData?.address || "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setUpdateVendor({
        ...updateVendor,
        [name]: value.split(","),
      });
    } else if (name === "brand") {
      setUpdateVendor({
        ...updateVendor,
        [name]: value.toUpperCase(),
      });
    } else {
      setUpdateVendor({
        ...updateVendor,
        [name]: value,
      });
    }
  };

  const handleUpdateVendor = async (e) => {
    e.preventDefault();
    setLoading(true)

    const options = {
      method: "put",
      url: `https://e-commerce-backend-brown.vercel.app/api/vendor/updateVendor/${vendorEdit}`,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
      },
      data : updateVendor
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Vendor updated successfully !");
          handleClose()
          refreshData();
        } else {
          setLoading(false)
          toast.error("Failed!");
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed!");
      });
  };

  const handleClose = () => {
    closeDrawer()
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[70px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Update Vendor </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>
      <form
        onSubmit={handleUpdateVendor}
        className=" bg-white border rounded-lg "
      >
        <div>
          <div className="flex w-full">
            <div className=" mb-3 w-6/12">
              <label className="absolute mt-7 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                Vendor Name
              </label>
              <input
                onChange={inputHandler}
                value={updateVendor.vendorName}
                defaultValue={
                  editData?.vendorName
                    ? editData?.vendorName
                    : updateVendor.vendorName
                }
                type="text"
                name="vendorName"
                required
                minLength={3}
                max={84}
                className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
              />
            </div>
            <div className=" mb-3 w-6/12">
              <label className="absolute mt-7 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                Company Name
              </label>
              <input
                onChange={inputHandler}
                value={updateVendor.companyName}
                defaultValue={
                  editData?.companyName
                    ? editData?.companyName
                    : updateVendor.companyName
                }
                name="companyName"
                type="text"
                required
                minLength={3}
                max={84}
                className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className=" mb-3 w-6/12">
              <label className="absolute mt-7 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                Email
              </label>
              <input
                onChange={inputHandler}
                value={updateVendor.email}
                defaultValue={
                  editData?.email ? editData?.email : updateVendor.email
                }
                type="text"
                name="email"
                required
                minLength={3}
                max={84}
                className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
              />
            </div>

            <div className=" mb-3 w-6/12">
              <label className="absolute mt-7 ml-14 z-20 text-[18px] text-gray-500 bg-white">
                Phone No
              </label>
              <input
                onChange={inputHandler}
                value={updateVendor.phone}
                defaultValue={
                  editData?.phone ? editData?.phone : updateVendor.phone
                }
                type="number"
                name="phone"
                required
                minLength={3}
                max={84}
                className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
              />
            </div>
          </div>
          <div className=" mb-3 w-6/12 ">
            <label className="absolute mt-7 ml-14 z-20 text-[18px] text-gray-500 bg-white ">
              Address
            </label>
            <input
              onChange={inputHandler}
              value={updateVendor.address}
              defaultValue={
                editData?.address ? editData?.address : updateVendor.address
              }
              type="text"
              name="address"
              required
              minLength={3}
              max={84}
              className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
            />
          </div>

          <br />
        </div>
        <div className=" flex justify-end mb-5 mr-5">
          <button
            onClick={handleClose}
            type="submit"
            className="border py-2 px-4 m-2 rounded-lg bg-red-600 text-white text-[20px]"
          >
            Cancel
          </button>
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
            onClick={handleUpdateVendor}
            className="border p-3 m-2 rounded-lg bg-sky-600 text-white text-[20px]"
          >
            Update Vendor
          </button>

          }
        </div>
      </form>
    </div>
  );
};

export default UpdateVendor;
