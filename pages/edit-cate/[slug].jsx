import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const EditCate = ({ cateEdit }) => {
  const router = useRouter();
  // const { slug } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({
    category: "",
  });

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

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

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      setIsFetching(true);
      const res = await fetch(
        `https://e-commerce-backend-brown.vercel.app/api/category/updateCategory/${cateEdit}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }

      const data = await res.json();
      setCategory(data.name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "PUT",
      url: `https://e-commerce-backend-brown.vercel.app/api/category/updateCategory/${cateEdit}`,
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        // Authorization: "Bearer " + token,
      },
      data: {
        title: categoryDetails?.title ? categoryDetails?.title : editData?.title,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Product updated successfully !");
          refreshData();
          router.push("/categories");
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed. something went wrong!");
      });
  };
  return (
    <>
      <ToastContainer />

      <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Edit Categories </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>
      <div className="bg-white border rounded-lg p-2 mx-auto">
        <form onSubmit={handleUpdateCategory}>
          {isFetching ? (
            <p>Loading...</p>
          ) : (
            <div>
              <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                {" "}
                Categories Name:
              </label>

              <input
                type="text"
                name="title"
                className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                value={categoryDetails.title}
                defaultValue={
                  editData?.title ? editData?.title : categoryDetails.title
                }
                // value={productDetails.title}
                onChange={inputHandler}
                required
                minLength={3}
                max={84}
              />
            </div>
          )}
          <button
            type="submit"
            className="border p-2 m-10 mt-0 rounded-lg bg-sky-600 text-white text-[20px]"
            onClick={handleUpdateCategory}
          >
            Update Category
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCate;
