import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import DeleteModal from "../AdminModule/Product/Modal/deleteModal";

import Link from "next/link";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
const ProductGrid = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [addInWishlist, setAddInWishlist] = useState();
  let [productID, setProductID] = useState("");
  let [isOpenDelete, setOpenDelete] = useState(false);
  let [isRefresh, setRefresh] = useState(false);

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

  return (
    <>
      <section className="bg-gray-00 min-h-screen">
        <div className="flex justify-between  items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold">Products Grid </h2>
          <h2>Welcome Back, User</h2>
        </div>
        <div className="grid lg:grid-cols-4 gap-7 my-16 ">
          {allProduct.map((items, ix) => (
            <div
              className=" bg-white  border-[5px] border-gray  hover:rounded-[20px] m-4 hover:border-lightBlue-600"
              key={ix}
            >
              <Image
                src="/img1.jpeg"
                alt=""
                className=" mx-auto rounded-[20px] "
                width={400}
                height={400}
              />
              <div className="bg-white px-4 pb-6 rounded-[20px]">
                <div className="flex justify-between items-center my-4">
                  <h6 className="text-25px[] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden">
                    {items.title}
                  </h6>
                </div>

                <p className="text-[16px]  capitalize  ">
                  Brand : {items.brand}
                </p>
                <p className="text-sm font-semibold capitalize my-2 text-sky-600">
                  Offer price : {items.discountedPrice} <br />
                </p>
                <del className="text-sm font-semibold capitalize my-2 text-sky-600">
                  {" "}
                  Regular Price : ₹{items.price}
                </del>

                <p className="text-[18px]  capitalize my-2 ">
                  Stock : {items.quantity}
                </p>
                <p className="text-[18px]  capitalize my-2 ">
                  Category : {items.category}
                </p>
                <div className="flex">
                  {" "}
                  <h1 className="mt-1  mr-1">Status : </h1>
                  <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                    selling
                  </p>
                </div>
                <p className="text-[18px]  capitalize my-2  flex gap-x-5">
                  Colors :
                  <div className="flex gap-x-2">
                    {items.color?.map((opt, inx) => (
                      <p className="">{opt}</p>
                    ))}
                  </div>
                </p>
                <div className="flex justify-between ">
                  <button
                    type="button"
                    className=""
                    data-te-toggle="tooltip"
                    data-te-html="true"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                    title="View product"
                  >
                    <Link href={`/view-product/${items?._id}`}>
                      <MagnifyingGlassPlusIcon className="cursor-pointer h-10 w-10 text-gray-800" />
                    </Link>
                  </button>
                  <button
                    type="button"
                    className=""
                    data-te-toggle="tooltip"
                    data-te-html="true"
                    data-te-ripple-init=""
                    data-te-ripple-color="black"
                    title="Edit"
                  >
                    <Link href={`/edit-product/${items?._id}`}>
                      <PencilSquareIcon className="cursor-pointer h-10 w-10 text-gray-800" />
                    </Link>
                  </button>

                  <button
                    data-te-toggle="tooltip"
                    data-te-html="true"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                    title="Delete "
                    type="button"
                    onClick={() => openModal(items?._id)}
                    className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <TrashIcon className="cursor-pointer h-10 w-10 text-red-800   " />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
