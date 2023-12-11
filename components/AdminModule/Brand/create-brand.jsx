import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const CreateBrand = ({ closeDrawer, refreshData }) => {
  const [brand, setBrand] = useState("");
  const router = useRouter();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    try {
      await fetch(
        "https://e-commerce-backend-brown.vercel.app/api/brand/createBrand",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ brand }),
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success("Brand Create successfully !");
            handleClose();
            refreshData();
            setDrawerOpen(false);
          } else {
            throw new Error("failed to create");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) { }
  };
  const handleClose = () => {
    closeDrawer();
  };
  return (
    <div>
      <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Add New Brand </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className=" bg-white border  rounded-lg p-2 mx-auto"
      >
        <div>
          <div className="  ">
            <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
              Brand Name
            </label>
            <input
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              type="text"
              name="name"
              className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white        dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
              required
            />
            <button
              type="submit"
              className="border p-2 m-10 mt-0 rounded-lg bg-lightBlue-600 text-white text-[20px] "
              onClick={() => {
                handleSubmit();
                setDrawerOpen(false);
              }}
            >
              Add Brand
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBrand;
