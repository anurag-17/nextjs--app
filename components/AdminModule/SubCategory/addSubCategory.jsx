"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {  toast } from "react-toastify";

import { BASE_URL } from "../../../utlis/config";


const AddSubCategory = ({ closeDrawer, refreshData }) => {

  const [category, setCategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [getallCategory, setGetallCategory] = useState([]);
  const { auth_token } = useSelector((state) => state.adminAuth || null);

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setLoading(true)
    
    const data = {
      category: category,
      subCategory: subCategory
    }

    try {
      await fetch(
        `${BASE_URL}/subCategory/createSubCategory`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "authorization": auth_token,
          },
          body: JSON.stringify(data),
        }
      )
        .then((res) => {
          if (res.ok) {
            // router.push("/categories");
            toast.success("Category Create successfully !");
            refreshData();
            closeDrawer();
            setLoading(false)
          } else {
            setLoading(false)
            throw new Error("failed to create");
          }
        })
        .catch((e) => {
          console.log(e);
          setLoading(false)
          toast.failed("Server error !");
        });
    } catch (error) { setLoading(false) }
  };



  useEffect(() => {
    defaultCategory();
  }, []);

  const defaultCategory = () => {
    const option = {
      method: "GET",
      url: `${BASE_URL}/category/getallCategory`,
    };
    axios
      .request(option)
      .then((response) => {
        setGetallCategory(response?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
    
      <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Add New Category </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" bg-white border  rounded-lg p-2 mx-auto"
      >

        <div className="mt-2">

          <label className="absolute bg-white ml-14 z-20 text-[18px] text-gray-800 ">
            Sub category
          </label>
          <input
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            type="text"
            name="name"
            className="px-3 py-2 rounded m-10 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] elative w-8/12"
            required
          />
        </div>
        {/*------ category -----*/}
        <div className="gap-3 md:gap-5 xl:gap-6 lg:gap-6 ">

          <label className="absolute bg-white ml-14 z-20 text-[18px] text-gray-800 ">
            Choose main category
          </label>
          <div className="w-full">
            <select
              name="category"
              placeholder="Add Category"
              className="px-3 py-2 rounded m-10 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] elative w-8/12 text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Category
              </option>
              {getallCategory?.map((item,index) => (
                <option
                  key={index}
                  value={item?._id}
                  selected={item?.title === category}
                >
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
        </div>


        <button
          type="submit"
          className="border p-2 m-10 mt-0 rounded-lg bg-lightBlue-600 text-white text-[20px] "
          disabled = {isLoading}
          onClick={() => {
            handleSubmit();
          }}
        >
         { isLoading ? "Loading." : "Save" } 
        </button>
      </form>
    </>
  );
};

export default AddSubCategory;
