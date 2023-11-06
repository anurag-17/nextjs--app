import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UpdateVendor = ({ vendorEdit }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [editData, setEditData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isDrawerOpenO, setIsDrawerOpenO] = useState(false);
  const openDrawerO = () => {
    setIsDrawerOpenO(true);
  };

  const closeDrawerO = () => {
    setIsDrawerOpenO(false);
  };
  
  const [updateVendor, setUpdateVendor] = useState({
    vendorName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
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

  useEffect(() => {
    fetchVendor();
  }, []);

  const fetchVendor = async () => {
    try {
      setIsFetching(true);
      const res = await fetch(
        `https://e-commerce-backend-brown.vercel.app/api/vendor/getAllVendors/${vendorEdit}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }

      const data = await res.json();
      setIsFetching(data.name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateVendor = async (e) => {
    e.preventDefault();

    const options = {
      method: "put",
      url: `https://e-commerce-backend-brown.vercel.app/api/vendor/updateVendor/${vendorEdit}`,
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        // Authorization: "Bearer " + token,
      },
      data: {
        vendorName: updateVendor?.vendorName
          ? updateVendor?.vendorName
          : editData?.vendorName,
        companyName: updateVendor?.companyName
          ? updateVendor?.companyName
          : editData?.companyName,
        email: updateVendor?.email ? updateVendor?.email : editData?.email,
        phone: updateVendor?.phone ? updateVendor?.phone : editData?.phone,
        address: updateVendor?.address
          ? updateVendor?.address
          : editData?.address,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Vendor updated successfully !");
          refreshData();
          router.push("/vendor");
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
       <ToastContainer />
     <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[70px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Update Vendor </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>
      <form onSubmit={handleUpdateVendor} className=" bg-white border rounded-lg ">
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
            type="submit"
            onClick={handleUpdateVendor}
            className="border p-3 m-2 rounded-lg bg-sky-600 text-white text-[20px]"
          >
            Update Vendor
          </button>
          <button onClick={closeDrawerO}
            type="submit"
            className="border py-2 px-4 m-2 rounded-lg bg-red-600 text-white text-[20px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateVendor;
