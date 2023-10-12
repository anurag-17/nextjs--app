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
import Header from "../Header";

const ProductList = () => {
  let [isOpenDelete, setOpenDelete] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  let [isRefresh, setRefresh] = useState(false);
  let [productID, setProductID] = useState("");
  let [productCategory, setProductCategory] = useState(["All"]);
  let [productBrands, setProductBrands] = useState(["All"]);
  let [productSearch, setProductSearch] = useState(["All"]);

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
        if (response.status === 200) {
          setAllProduct(response?.data);
          // const categories = response?.data?.map((product) => product.category);
          // const uniqueCategories = [...new Set(categories)];
          // setProductCategory([...productCategory, ...uniqueCategories]);
          // const uniqueCategories = categories.filter((category, index) => {
          //   return categories.indexOf(category) === index;
          // });

          const categories = response?.data?.map((product) => product.category);
          const uniqueCategories = [...new Set(categories)];
          setProductCategory(["All", ...uniqueCategories]);

          const brands = response?.data?.map((product) => product.brand);
          const uniqueBrands = [...new Set(brands)];
          setProductBrands(["All", ...uniqueBrands]);

          const fields = response?.data?.map((product) => product.title);
          const uniqueFields = [...new Set(fields)];
          setProductSearch(["All", ...uniqueFields]);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSearchCategories = (e) => {
    const cate = e.target.value;
    if (cate === "All") {
      refreshData();
    } else {
      const options = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?category=${cate}`,
      };
      axios
        .request(options)
        .then(function (response) {
          console.log("hell", response.data);
          if (response.status === 200) {
            setAllProduct(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const handleSearchBrand = (e) => {
    const bnd = e.target.value;
    if (bnd === "All") {
      refreshData();
    } else {
      const options = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?brand=${bnd}`,
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          if (response.status === 200) {
            setAllProduct(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search === "All") {
      refreshData();
    } else {
      const options = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?title=${search}`,
      };
      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            setAllProduct(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <>
      <ToastContainer />

      <section>
        <Header headTitle="Products List" />

        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
          <input
            type="search"
            placeholder="Search Product"
            className="border border-gray-400 p-2 rounded-md w-3/12 cursor-pointer "
            
            onChange={handleSearch}
          ></input>
         
            {productSearch?.length > 0 &&
              productSearch.map((search) => (
                <option key={search} >
                 
                </option>
              ))}
          

          <div className="w-auto flex flex-col items-center gap-x-5">
            <label className="whitespace-nowrap">Search by Brand :</label>
            <select
              name="brand"
              id="brand"
              placeholder="Brand"
              className="border border-gray-400 p-2 rounded-md w-12/12 bg-white cursor-pointer "
              onChange={handleSearchBrand}
            >
              {productBrands?.length > 0 &&
                productBrands.map((bnd) => <option value={bnd}>{bnd}</option>)}
            </select>
          </div>

          {/*----- search by category start ------- */}
          <div className="w-auto flex flex-col items-center gap-x-5">
            <label htmlFor="" className="whitespace-nowrap">
              Search by Category :
            </label>
            <select
              name="category"
              id="category"
              placeholder="Category"
              className="border border-gray-400 py-2  rounded-md bg-white lg:w-12/12 md:w-full cursor-pointer "
              onChange={handleSearchCategories}
            >
              {productCategory?.length > 0 &&
                productCategory.map((cate) => (
                  <option value={cate}>{cate}</option>
                ))}
            </select>
          </div>
          {/*----- search by category end ------- */}
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
                  <input
                    type="checkbox"
                    className="mx-3 mt-6 cursor-pointer "
                  />
                </td>
                <td className="py-5 text-[18px] max-w-[200px]">
                  {item?.title ? item?.title : "-"}
                </td>
                <td className="py-5 text-[18px]">
                  {item?.category ? item?.category : "-"}
                </td>
                <td className="py-5 text-[18px]">
                  {item?.price ? item?.price : "-"}
                </td>
                <td className="py-5 text-[18px]">
                  {item?.brand ? item?.brand : "-"}
                </td>
                <td className="py-5 text-[18px]">
                  {item?.quantity ? item?.quantity : "-"}
                </td>
                <td className="py-5 text-[18px]">
                  {item?.color?.length > 0
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
                <td className="py-5 text-[18px]">
                  <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                    selling
                  </p>
                </td>
                <td className="py-5 text-[18px]">
                  <button>
                    <Link href={`/view-product/${item?._id}`}>
                      <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500" />
                    </Link>
                  </button>
                </td>
                <td className="flex justify-between items-center  py-5 ">
                  <Link href={`/edit-product/${item?._id}`}>
                    <button>
                      <PencilSquareIcon className="cursor-pointer h-6 w-6 text-gray-500" />
                    </button>
                  </Link>

                  <button
                    type="button"
                    onClick={() => openModal(item?._id)}
                    className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <TrashIcon className="cursor-pointer h-6 w-6 text-red-800   " />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <nav
          aria-label="Page navigation example"
          className="m-5 mb-10 float-right"
        >
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="#"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300   dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:text-blue-700 hover:border-blue-300 hover:bg-lightBlue-200"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:text-blue-700 hover:border-blue-300 hover:bg-lightBlue-200"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="z-10 flex items-center text-gray-500 justify-center px-3 h-10 leading-tight hover:text-blue-600 border border-gray-400 hover:border-blue-300 bg-blue-50  dark:border-gray-700  dark:text-white hover:bg-lightBlue-200"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white "
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="#"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
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

export default dynamic(() => Promise.resolve(ProductList), { ssr: false });
