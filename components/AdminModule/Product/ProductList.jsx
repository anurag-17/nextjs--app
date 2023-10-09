import React, { Fragment, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import DeleteModal from "./Modal/deleteModal";
import axios from "axios";


const ProductList = () => {

    let [isOpenDelete, setOpenDelete] = useState(false);
    const [allProduct, setAllProduct] = useState([]);
    let [isRefresh, setRefresh] = useState(false);
    let [productID, setProductID] = useState("");

  function closeModal() {
    setOpenDelete(false);
  }

  function openModal(id) {
    setProductID(id)
    setOpenDelete(true);
  }

  const refreshData = () => {
    setRefresh(!isRefresh)
  }

  useEffect(() => {
    getAllProducts();
  }, [isRefresh]);

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
    <ToastContainer/>
      <section>
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold">Products List </h2>
          <h2>Welcome Back, Clint</h2>
        </div>
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
          <input
            type="search"
            placeholder="Search Product"
            className="border border-gray-400 p-2 rounded-md w-3/12 cursor-pointer "
          />
          <select
            name="cars"
            id="cars"
            placeholder="Category"
            className="border border-gray-400 p-2 rounded-md w-3/12 bg-white cursor-pointer "
          >
            Category
            <option className="p-5" value="saab">
              Men's Cloth
            </option>
            <option value="opel">Women's Cloth</option>
            <option value="volvo">Watches</option>
            <option value="audi">Footwear's</option>
          </select>
          <select
            name="cars"
            id="cars"
            placeholder="Price"
            className="border border-gray-400 p-2 rounded-md bg-white w-3/12 cursor-pointer "
          >
            <option value="volvo">Low to High</option>
            <option value="saab">High to Low</option>
          </select>
        </div>

        <table class="table-auto bg-white w-full rounded-md mt-5">
          <thead className="">
            <tr className="bg-gray-200 text-gray-400 text-sm text-start ">
              <input type="checkbox" className="mx-3 mt-6 cursor-pointer " />
              <th className="text-start py-5 ">PRODUCT NAME</th>
              <th className="text-start">CATEGORY</th>
              <th className="text-start">PRICE</th>
              <th className="text-start">BRAND</th>
              <th className="text-start">STOCK</th>
              <th className="text-start">COLOUR</th>
              <th className="text-start">STATUS</th>
              <th className="text-start">VIEW</th>
              <th className="text-start">ACTION</th>
            </tr>
          </thead>
          {allProduct?.map((item, index) => (
            <tbody>
              <tr>
                <td className="">
                  {" "}
                  <input
                    type="checkbox"
                    className="mx-3 mt-6 cursor-pointer "
                  />
                </td>
                <td className="py-5 text-[18px]">
                  {item?.title ? item?.title : "-"}
                </td>
                <td className="py-5 text-[18px]">
                  {item?.category ? item?.category : "-"}
                </td>
                <td className="py-5 text-[18px]">
                  {item?.price ? item?.price : "-"}
                </td>
                <td className="py-5 text-[18px] tex">
                  {item?.brand ? item?.brand : "-"}
                </td>
                <td className="py-5 text-[18px] tex">
                  {item?.quantity ? item?.quantity : "-"}
                </td>
                <td className="py-5 text-[18px] tex">
                  {item?.color.length > 0
                    ? item?.color?.map((optn, inx) => (
                        <p
                          className=" capitalize text-[16px] font-normal leading-[30px]"
                          key={inx}
                        >
                          {optn}
                        </p>
                      ))
                    : "-"}
                </td>
                <td className="py-5 text-[18px] tex">
                  <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                    selling
                  </p>
                </td>
                <td>
                  <button>
                    <Link href={`/view-product/${item?._id}`}>
                      <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500" />
                    </Link>
                  </button>
                </td>
                <td className="flex justify-around">
                  <Link href={`/edit-product/${item?._id}`}>
                    <button>
                      <PencilSquareIcon className="cursor-pointer h-6 w-6 text-gray-500" />
                    </button>
                  </Link>

                  <button
                    type="button"
                    onClick={()=>openModal(item?._id)}
                    className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <TrashIcon className="cursor-pointer h-6 w-6 text-red-800   " />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
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
                  <DeleteModal productID={productID} closeModal={closeModal} refreshData={refreshData}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductList), { ssr: false });
