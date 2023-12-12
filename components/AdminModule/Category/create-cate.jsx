"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../utlis/config";



const CreateCategoryForm = ({closeDrawer, refreshData}) => {

  const [title, setTitle] = useState("");
  const router = useRouter();
  const { auth_token } = useSelector((state) => state.adminAuth || null);


  const handleSubmit = async (e) => {
     e.preventDefault();

     const data = {
      "title": title,
      "subCategories": []
    }


    try {
      await fetch(
        `${BASE_URL}/category/createCategory`,
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
            router.push("/categories");
            toast.success("Category Create successfully !");
            refreshData();
            closeDrawer();
          } else {
            throw new Error("Server error");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.failed("Server error !");
        });
    } catch (error) {}
  };

  return (
    <>
       <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Add New Categories </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>
  
    <form
      onSubmit={handleSubmit}
      className=" bg-white border  rounded-lg p-2 mx-auto"
    >
   
      <div>
    
      <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
            Category Name
            </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="name"
          className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white        dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
     
        />
      </div>
      <button
        type="submit"
        className="border p-2 m-10 mt-0 rounded-lg bg-lightBlue-600 text-white text-[20px] "
      >
        Add Category
      </button>
    </form>
    </>
  );
};

export default CreateCategoryForm;
