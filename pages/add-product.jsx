import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [isLoading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    color: [],
  });
  // const [token, setToken] = useState(
  //   JSON.parse(sessionStorage.getItem("accessToken"))
  // );
 const refreshData = () => {
  setProductDetails({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    color: [],
  })
 }

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setProductDetails({
        ...productDetails,
        [name]: value.split(","),
      });
    } else {
      setProductDetails({
        ...productDetails,
        [name]: value,
      });
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
const options = {
  method: 'POST',
  url: 'https://e-commerce-backend-brown.vercel.app/api/product/createProduct',
  headers: {
    cookie: 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw',
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/2023.5.8',
    // Authorization: "Bearer " + token,
  },
  data: productDetails
};

axios.request(options).then(function (response) {
  console.log(response);
  if(response.status === 200) {
    notify()
    setLoading(false);
    refreshData()
  }
  else{
    setLoading(false);
    return
  }
}).catch(function (error) {
  setLoading(false);
  console.error(error);
  toast.success("Failed. Can not repeat product name!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
});

  };

  const notify = () => {
    toast.success("Success. Product added successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };



  return (
    <section className="bg-gray-100 min-h-screen">
      <ToastContainer/>
      <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <div className="">
          <h2 className="text-2xl font-semibold">Add Product </h2>
          <p className="xl:text-[18px] lg:text-[16px] pt-1 font-normal">
            Add your product and necessary information from here
          </p>
        </div>
        <h2 className="xl:text-[18px] lg:text-[16px] font-normal">
          Welcome Back, Admin
        </h2>
      </div>

      <div className=" mt-[44px] bg-white py-10 ">
        <div className="h-[100px] ">
          <h2 className="text-[25px] font-semibold text-green-600 leading-[30px] px-6">
            Basic Info
          </h2>
          <div className="border-b border-[#f3f3f3] mt-6 w-full">
            <div className="border-b border-green-600 w-[160px]"></div>
          </div>
        </div>

        {/*---- form start here ----*/}
        <form action="" onSubmit={handleFormSubmit}>
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            {/*------ title -----*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label htmlFor="" className="custom-input-label">
                Product Title/Name
              </label>
              <div className="col-span-8 sm:col-span-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Product Title/Name"
                  className="custom-input"
                  value={productDetails.title}
                  onChange={inputHandler}
                  required
                  minLength={3}
                  max={84}
                />
              </div>
            </div>

            {/*------ Description -----*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label htmlFor="" className="custom-input-label">
                Product Description
              </label>
              <div className="col-span-8 sm:col-span-4">
                <textarea
                  rows="6"
                  className="custom-input h-[100px]"
                  name="description"
                  placeholder="Product Description"
                  spellCheck="false"
                  value={productDetails.description}
                  onChange={inputHandler}
                  required
                  minLength={10}
                  max={500}
                ></textarea>
              </div>
            </div>

            {/*------ price -----*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="custom-input-label">Product Price</label>
              <div className="col-span-8 sm:col-span-4">
                <div className="flex flex-row">
                  <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                  ₹
                  </span>
                  <input
                    type="number"
                    name="price"
                    placeholder="OriginalPrice"
                    className="custom-input"
                    value={productDetails.price}
                    onChange={inputHandler}
                    required
                    minLength={1}
                    // max={32}
                  />
                </div>
                {/* <span className="text-red-400 text-sm mt-2">
                  Minimum value 1!
                </span> */}
              </div>
            </div>

            {/*------ category -----*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label htmlFor="" className="custom-input-label">
                Product Category
              </label>
              <div className="col-span-8 sm:col-span-4">
                <input
                  type="text"
                  name="category"
                  placeholder="Add Category"
                  className="custom-input"
                  value={productDetails.category}
                  onChange={inputHandler}
                  required
                  minLength={3}
                  max={32}
                />
              </div>
            </div>

            {/*------ quantity -----*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label htmlFor="" className="custom-input-label">
                Product Quantity
              </label>
              <div className="col-span-8 sm:col-span-4">
                <input
                  type="number"
                  name="quantity"
                  placeholder="Add quantity"
                  className="custom-input"
                  value={productDetails.quantity}
                  onChange={inputHandler}
                  required
                  minLength={10}
                  // max={32}
                />
              </div>
            </div>

            {/*------ brand -----*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label htmlFor="" className="custom-input-label">
                Product Brand
              </label>
              <div className="col-span-8 sm:col-span-4">
                <input
                  type="text"
                  name="brand"
                  placeholder="Add Brand Name"
                  className="custom-input uppercase"
                  value={productDetails.brand}
                  onChange={inputHandler}
                  required
                  minLength={10}
                  max={32}
                />
              </div>
            </div>

            {/*------ brand -----*/}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label htmlFor="" className="custom-input-label">
                Product Colour
              </label>
              <div className="col-span-8 sm:col-span-4">
                <input
                  type="text"
                  name="color"
                  placeholder="Enter colors separated by commas"
                  className="custom-input"
                  value={productDetails.color}
                  onChange={inputHandler}
                  required
                />
              </div>
            </div>

            {/*------ Images -----*/}
            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="custom-input-label">Product Images</label>
              <div className="col-span-8 sm:col-span-4">
                <div className="w-full text-center">
                  <div
                    className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
                    role="presentation"
                  >
                    <input
                      accept="image/*,.jpeg,.jpg,.png,.webp"
                      multiple=""
                      type="file"
                    />
                    <span className="mx-auto flex justify-center">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-3xl text-green-500"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="16 16 12 12 8 16"></polyline>
                        <line x1="12" y1="12" x2="12" y2="21"></line>
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>{" "}
                        <polyline points="16 16 12 12 8 16"></polyline>
                      </svg>
                    </span>
                    <p className="text-sm mt-2">Drag your images here</p>
                    <em className="text-xs text-gray-400">
                      (Only *.jpeg, *.webp and *.png images will be accepted)
                    </em>
                  </div>
                  <div className="text-green-500"></div>
                  <aside className="flex flex-row flex-wrap mt-4"></aside>
                </div>
              </div>
            </div> */}
            {/*------ submit button -----*/}
            <div className="mt-8">
              {isLoading ? (
                <button
                  type="button"
                  className="w-full  text-cyan-600 py-3 text-center bg-white mb-2 border border-cyan-600 font-semibold text-[18px]"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  // onClick={handlesubmit}
                  className="w-full bg-cyan-600 py-3 text-center text-white mb-2 font-semibold text-[18px]"
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        </form>
        
        {/*---- form end here ----*/}
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(AddProduct), { ssr: false });