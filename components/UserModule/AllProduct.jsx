import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import DeleteModal from "../AdminModule/Product/Modal/deleteModal";
import right from "/public/right-arrows.svg";

import Link from "next/link";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import TopBarCustomer from "../../pages/topBar-customer";
import UserNavbar from "./userNavbar";
import Slider from "./sliderrange";
const ProductGrid = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [getallCategory, setGetallCategory] = useState([]);
  const [getallBrand, setGetallBrand] = useState([]);
  const [addInWishlist, setAddInWishlist] = useState();
  let [productID, setProductID] = useState("");
  let [isOpenDelete, setOpenDelete] = useState(false);
  let [isRefresh, setRefresh] = useState(false);

  const option = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/brand/getallBrand",
  };
  useEffect(() => {
    defaultBrand();
  }, []);
  const defaultBrand = () => {
    axios
      .request(option)
      .then((response) => {
        setGetallBrand(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/category/getallCategory",
  };

  useEffect(() => {
    defaultCategory();
  }, []);

  const defaultCategory = () => {
    axios
      .request(options)
      .then((response) => {
        setGetallCategory(response.data);
        console.log(response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function closeModal() {
    setOpenDelete(false);
  }

  function openModal(id) {
    setProductID(id);
    setOpenDelete(true);
  }

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "User-Agent": "insomnia/2023.5.8",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        if (response.status === 200) {
          setAllProduct(response?.data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(productId, quantity);
      console.log("Product added to cart:", response);
      // Handle the response as needed, e.g., update the UI.
    } catch (error) {
      console.error("Failed to add the product to the cart:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  return (
    <>
      <UserNavbar />
      <section className="bg-gray-00 min-h-screen px-20 flex">
        <div className="space-y-9">
          <div className="bg-white p-5 py-9 rounded-sm w-96 mr-4 ">
            <p className="font-semibold text-2xl mb-4">Product Categories</p>
            <hr className="mb-2" />
            <div className="space-y-4 ">
              {getallCategory.map((category) => (
                <div
                  className="text-[#645D64] flex hover:text-[#0284C7] cursor-pointer no-underline hover:underline"
                  key={category.id}
                >
                  <Image className="w-3  " src={right} />
                  {category.title}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 py-12 rounded-sm w-96 mr-4 ">
            <p className="font-semibold text-2xl mb-4">Price Range</p>
            <hr className="mb-2" />
            <div className=" ">
              <div className="flex justify-between text-[#645D64]  ">
                <div className=" ">
                  {/* <Image className="w-3 " src={right} /> */}
                  <p className="text-[#645D64]  no-underline hover:underline mb-3">
                    Range:{" "}
                    <span className="font-semibold text-black"> $0- $1000</span>
                  </p>
                  <Slider min={0} max={1000} />
                </div>
                {/* <p>15</p> */}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 py-9 rounded-sm w-96 mr-4">
            <p className="font-semibold text-2xl mb-4">Product Brands</p>
            <hr className="mb-2" />
            <div className=" ">
              <div className=" justify-between text-[#645D64] space-y-4 ">
                {getallBrand.map((brands) => (
                  <div
                    className="text-[#645D64] flex hover:text-[#0284C7] cursor-pointer no-underline hover:underline"
                    key={brands}
                  >
                  <Image className="w-3  " src={right} />
                    {brands?.brand}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="bg-white p-5 py-9 rounded-sm w-96 mr-4 ">
            <p className="font-semibold text-2xl mb-4">Size</p>
            <hr className="mb-3" />
            <div className=" ">
              <div className=" justify-between text-[#645D64]  ">
                <div className="flex space-x-3">
                  <p className="border px-4 p-2 hover:text-[#0284C7] no-underline hover:underline">XL</p>
                  <p className="border px-4 p-2 hover:text-[#0284C7] no-underline hover:underline">X</p>
                  <p className="border px-4 p-2 hover:text-[#0284C7] no-underline hover:underline">L</p>
                  <p className="border px-4 p-2 hover:text-[#0284C7] no-underline hover:underline">M</p>
                  <p className="border px-4 p-2 hover:text-[#0284C7] no-underline hover:underline">Slim Fit</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div>
          <div className="flex gap-3">
            <div class=" w-1/4">
              <div class="relative mb- flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon1"
                />

                {/* <!--Search button--> */}
                <button
                  class="relative z-[2] flex items-center rounded-r bg-primary px-3 py-2 text-xs font-medium uppercase leading-tight text-[#0284C7] hover:text-white border transition duration-150 ease-in-out hover:bg-[#0284C7] hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                  type="button"
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white grid grid-cols-3 gap-4 items-center p-2 border">
              <p className="cursor-pointer hover:text-[#0284C7] no-underline hover:underline ">
                Top Rated{" "}
              </p>
              <p className="cursor-pointer hover:text-[#0284C7] no-underline hover:underline ">
                Popular{" "}
              </p>
              <p className="cursor-pointer hover:text-[#0284C7] no-underline hover:underline ">
                Newest
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-7 my-16 ">
            {allProduct.map((items, ix) => (
              <div
                className=" bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 hover:border-lightBlue-600"
                key={ix}
              >
                <Link href={`/user-productdetail/${items?._id}`}>
                  <Image
                    src="/img1.jpeg"
                    alt=""
                    className=" mx-auto rounded-[20px] "
                    width={400}
                    height={400}
                  />
                </Link>
                <div className="bg-white px-10 pb-6 rounded-[20px] ">
                  <div className="flex justify-between items-center my-4">
                    <h6 className="text-[25px] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden">
                      {items.title}
                    </h6>
                    <button onClick={handleAddToCart}>
                      <HeartIcon class="h-8 w-8 text-gray-500" />
                    </button>
                  </div>

                  <p className="text-[18px]  flex capitalize  ">
                    Brand : <p className="font-semibold px-2">  {items.brand} </p>
                  </p>
                  <p className="text-[20px] flex font-semibold capitalize my-2 text-sky-600">
                    Offer price : <p className="text-sky-800 px-2 font-bold">₹{items.discountedPrice} </p><br />
                  </p>
                  <del className="text-md font-semibold capitalize my-2 text-sky-600">
                    {" "}
                    Regular Price : ₹{items.price}
                  </del>

                  <p className="text-[18px] flex capitalize my-2 ">
                    Stock : <p className="px-2 font-semibold">{items.quantity}</p>
                  </p>
                  <p className="text-[18px] flex capitalize my-2 ">
                    Category : <p className="font-semibold px-2">{items.category}</p>
                  </p>
                  <div className="flex">
                    {" "}
                    <h1 className="mt-1  mr-1 text-[18px]">Status : </h1>
                    <p className=" bg-sky-200 p-1 text-center font-semibold rounded-xl text-sky-600 w-20">
                      selling
                    </p>
                  </div>
                  <p className="text-[18px]  capitalize my-2  flex gap-x-5 ">
                    Colors :
                    <div className="flex font-semibold gap-x-2 whitespace-nowrap overflow-hidden text-ellipsis ">
                      {items.color?.map((opt, inx) => (
                        <p className="">{opt}</p>
                      ))}
                    </div>
                  </p>
            
                  <button className="w-full border p-3 rounded-lg text-white bg-sky-600 hover:bg-sky-900 my-2 items-end">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Transition appear show={isOpenDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white py-10 px-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="lg:text-[25px] text-[16px] font-semibold leading-6 text-gray-900"
                  >
                    Are You Sure! Want to Delete?
                  </Dialog.Title>
                  <DeleteModal
                    productID={productID}
                    closeModal={closeModal}
                    refreshData={refreshData}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductGrid), { ssr: false });
