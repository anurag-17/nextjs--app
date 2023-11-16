import React, { useState } from "react";
import axios from "axios";

const EditCate = ({ editData, cateEdit, closeDrawer, refreshData }) => {
  const [isLoading, setLoading] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({
    title: editData?.title || "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setCategoryDetails({
        ...categoryDetails,
        [name]: value.split(","),
      });
    } else if (name === "brand") {
      setCategoryDetails({
        ...categoryDetails,
        [name]: value.toUpperCase(),
      });
    } else {
      setCategoryDetails({
        ...categoryDetails,
        [name]: value,
      });
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `https://e-commerce-backend-brown.vercel.app/api/category/updateCategory/${cateEdit}`,
        categoryDetails,
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "insomnia/2023.5.8",
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        setLoading(false);
        handleClose();
        refreshData();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleClose = () => {
    closeDrawer();
  };

  return (
    <>
      <div className="flex justify-between items-center pt-4 px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Edit Brand </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>
      <div className="bg-white border rounded-lg p-2 mx-auto">
        <form onSubmit={handleUpdateCategory}>
          <div>
            <label className="absolute mt-6 bg-white ml-14 z-20 text-[18px] text-gray-800 bg-">
              Brand Name:
            </label>

            <input
              type="text"
              name="title"
              className="px-3 py-2 rounded m-10 border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600 focus:outline-none h-[50px] relative w-8/12"
              defaultValue={categoryDetails.title}
              onChange={inputHandler}
              required
              minLength={3}
              max={84}
            />
          </div>

          <button
            type="submit"
            className="border p-2 m-10 mt-0 rounded-lg bg-sky-600 text-white text-[20px]"
          >
            Update Category
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCate;
