import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const AddColor = ({ closeDrawer, refreshData }) => {
  const [color, setColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://e-commerce-backend-brown.vercel.app/api/color/createColor",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ color }),
        }
      );

      if (response.ok) {
        toast.success("Color Added successfully!");
        handleClose();
        refreshData();
      } else {
        throw new Error("failed to create");
      }
    } catch (error) {
      toast.error("Failed. Something went wrong!");
    }
  };

  const handleClose = () => {
    closeDrawer();
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
          <h2 className="text-2xl font-semibold pb-4">Add New Color </h2>
          <div className="mb-3 w-[40%]"></div>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" bg-white border  rounded-lg p-2 mx-auto"
        >
          <div>
            <div className="  ">
              <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                Color Name
              </label>
              <input
                onChange={(e) => setColor(e.target.value)}
                value={color}
                type="text"
                name="name"
                className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white        dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                required
              />
              <button
                type="submit"
                className="border p-2 m-10 mt-0 rounded-lg bg-lightBlue-600 text-white text-[20px] "
              >
                Add Color
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddColor;
