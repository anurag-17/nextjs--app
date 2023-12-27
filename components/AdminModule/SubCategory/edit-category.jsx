import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../utlis/config";

const EditSubCategory = ({ editData, cateEdit, closeDrawer }) => {
  const [isLoading, setLoading] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState();
  const { auth_token } = useSelector((state) => state.adminAuth || null);
  const [getallCategory, setGetallCategory] = useState();
  const [isLoadingBtn, setLoadingBtn] = useState(false);
  const [isRefresh, setRefresh] = useState(false);

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setCategoryDetails({
      ...categoryDetails,
      [name]: value,
    });
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/subCategory/updateSubCategory/${cateEdit}`,
        categoryDetails,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: auth_token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Updated successfully !");
        setLoading(false);
        closeDrawer();
        refreshData();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    defaultCategory();
  }, [isRefresh]);

  const defaultCategory = () => {
    setLoadingBtn(true);
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/category/getallCategory",
    };

    axios
      .request(options)
      .then((response) => {
        setGetallCategory(response?.data);
        console.log("hell", response?.data);
        setLoadingBtn(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoadingBtn(false);
      });
  };

  return (
    <>
      <div className="flex justify-between items-center pt-4 px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Edit Category </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>

      <div className="bg-white border rounded-lg p-2 mx-auto">
        <form onSubmit={handleUpdateCategory}>
          <div className="mt-2">
            <label className="absolute bg-white ml-14 z-20 text-[18px] text-gray-800 ">
              Sub category
            </label>
            <input
              onChange={inputHandler}
              defaultValue={editData?.subCategory}
              type="text"
              name="subCategory"
              className="px-3 py-2 rounded m-10 border border-gray-300 bg-gray-50 text-md focus:bg-white dark:border dark:border-gray-600  focus:outline-none h-[50px] elative w-8/12"
              required
            />
          </div>

          <div>
            <label className="absolute mt-6 bg-white ml-14 z-20 text-[18px] text-gray-800 bg-">
              Category:
            </label>

            <select
              type="text"
              name="category"
              className="px-3 py-2 rounded m-10 border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:border dark:border-gray-600 focus:outline-none h-[50px] relative w-8/12"
              value={editData?.category}
              onChange={inputHandler}
              required
              minLength={3}
              max={84}
            >
              <option value="" disabled>
                Select Category
              </option>
              {getallCategory?.map((item, index) => (
                <option 
              value={editData?.category}
                >
                  <p>{item?.title}</p>
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="border p-2 m-10 mt-0 px-8 rounded-lg bg-lightBlue-600 text-white text-[20px]"
          >
            {isLoading ? "Loading." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSubCategory;
