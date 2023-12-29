import React, { Fragment, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import Pagination from "../../UserModule/Pagination";

import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import DeleteModal from "./Modal/deleteModal";
import axios from "axios";
import Header from "../Header";
import Grid from "./svg/Grid";
import List from "./svg/List";
import Image from "next/image";
import WebsiteLoader from "../../websiteLoader";

const headItems = [
  "PRODUCT NAME",
  "CATEGORY",
  "REGULAR PRICE",
  "OFFER PRICE",
  "BRAND",
  "STOCK",
  "COLOR",
  "STATUS",
  "VIEW",
  "ACTION",
];

const ProductList = () => {
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [productID, setProductID] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [productCategory, setProductCategory] = useState(["All"]);
  const [productBrands, setProductBrands] = useState("");
  const [isShowComponent, setShowComponent] = useState("grid");
  const [productId, setProductId] = useState("your_product_id");
  const [quantity, setQuantity] = useState(1);
  const [isLoadingBtn, setLoadingBtn] = useState(false);
  const [catagoryFilter, setCatagoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [numSelected, setNumSelected] = useState(selected?.length || null);
  const [rowCount, setRowCount] = useState(allProduct?.length || null);

  const isSelected = (id) => selected.indexOf(id) !== -1;

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
    getAllProducts(1);
  }, [isRefresh]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // ------  get all products ------ //
  const pageLimit = 10;
  const getAllProducts = async (page, limit) => {
    setLoadingBtn(true);
    const options = {
      method: "GET",
      url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct`,
      params: {
        page: page,
        limit: limit,
      },
    };

    try {
      const response = await axios.request(options);

      if (response.status === 200) {
        setAllProduct(response.data.products);
        setLoadingBtn(false);
        const categories = response?.data?.products.map(
          (product) => product.category
        );
        const uniqueCategories = [...new Set(categories)];
        setProductCategory([...uniqueCategories]);

        const brands = response?.data?.products.map((product) => product.brand);
        const uniqueBrands = [...new Set(brands)];
        setProductBrands([...uniqueBrands]);

        const fields = response?.data?.products.map((product) => product.title);
        const uniqueFields = [...new Set(fields)];
        ["All", ...uniqueFields];
        setTotalPages(response?.data?.totalPages || 1);
      } else {
        setLoadingBtn(false);
      }
    } catch (error) {
      setLoadingBtn(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts(currentPage, pageLimit);
  }, [currentPage]);

  // ------ filter products by category ------ //
  const handleSearchCategories = (e) => {
    const cate = e.target.value;
    if (cate === "All") {
      setCatagoryFilter("");
      getAllProducts();
      refreshData();
      setSelectedCategory(cate);
    } else {
      setCatagoryFilter(e.target.value);
      const options = {
        method: "GET",
        url:
          brandFilter == ""
            ? `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?category=${cate}`
            : `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?category=${cate}&brand=${brandFilter}`,
      };
      axios
        .request(options)
        .then(function (response) {
          console.log("hell", response.data);
          if (response.status === 200) {
            setAllProduct(response.data?.products);
            setSelectedCategory(cate);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  // ------ filter products by brand ------ //
  const handleSearchBrand = (e) => {
    const bnd = e.target.value;

    if (bnd === "All") {
      setBrandFilter("");
      refreshData();
    } else {
      setBrandFilter(bnd);
      const options = {
        method: "GET",
        url:
          catagoryFilter == ""
            ? `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?brand=${bnd}`
            : `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?brand=${bnd}&category=${catagoryFilter}`,
      };
      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            setAllProduct(response?.data?.products);
            console.log(response?.data?.products,"jj")
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };
  // ------ search products ------ //
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search.trim() === "") {
      refreshData();
    } else {
      const options = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?search=${search}`,
      };
      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            setAllProduct(response.data.products);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const handleShowComponent = (component) => {
    setShowComponent(component);
  };

  const allDelete = async () => {
    try {
      const response = await axios.post(
        `https://e-commerce-backend-brown.vercel.app/api/product/deleteBulkProducts`,
        { ProductIds: selected }
      );

      if (response.status === 200) {
        toast.success("Successfully deleted all products");

        getAllProducts();
      } else {
        toast.error("Failed to delete brands");
      }
    } catch (error) {
      toast.error("Error deleting brands:");
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = allProduct?.map((n) => n?._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const addToCart = async (productId, quantity) => {
    const apiUrl = "https://e-commerce-backend-brown.vercel.app/api/auth/cart";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data; // You may want to return some confirmation or response from the server.
      } else {
        throw new Error("Failed to add the product to the cart");
      }
    } catch (error) {
      console.error("Error adding the product to the cart:", error);
      throw error;
    }
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

  const EnhancedTableToolbar = ({ numLength }) => {
    return (
      <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg h-[80px] bg-lightBlue-100 mt-4">
        <h2 className="text-lg font-medium ">{numLength} Product selected</h2>
        <button
          onClick={allDelete}
          className="border border-1 rounded-md text-sm border-red-400 text-red-700 hover:bg-red-200 py-2 px-4 hover:border-none"
        >
          Delete All
        </button>
      </div>
    );
  };
  return (
    <>
      {isLoadingBtn && <WebsiteLoader />}
      <ToastContainer />

      <section>
        <Header headTitle="Products List" />

        {selected?.length > 0 ? (
          <EnhancedTableToolbar numLength={selected?.length} />
        ) : (
          <div
            className="flex justify-between items-center  border border-[#f3f3f3] rounded-lg bg-white 
          2xl:px-10 2xl:h-[100px] 2xl:mt-5
          xl:px-10 xl:h-[80px] xl:mt-4 
          lg:px-5 lg:h-[65px] lg:mt-4"
          >
            <div className="flex justify-center items-end gap-x-3 mr-3">
              <div
                className={`cursor-pointer border flex justify-center items-center 2xl:h-[40px] 2xl:w-[40px]
                ${
                  isShowComponent === "grid"
                    ? "border-lightBlue-300"
                    : "border-transparent"
                }`}
                onClick={() => handleShowComponent("grid")}
              >
                <Grid />
              </div>
              <div
                className={`cursor-pointer border-2  flex justify-center items-center 2xl:h-[40px] 2xl:w-[40px]
                ${
                  isShowComponent === "list"
                    ? "border-lightBlue-300 "
                    : "border-transparent"
                }`}
                onClick={() => handleShowComponent("list")}
              >
                <List />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <input
                type="search"
                placeholder="Search Product"
                className=" border bg-gray-200 active:border outline-none rounded-lg  2xl:w-1/3 2xl:py-[10px] 2xl:px-[10px]  xl:w-1/3 xl:py-[10px] xl:px-[7px]  lg:w-1/3 lg:py-[5px] lg:px-[7px] nav-input"
                onChange={handleSearch} //search input
              ></input>
            </div>

            <div className=" flex  2xl:gap-5  xl:gap-4 lg:gap-3">
              {/*----- filter by Brand start ------- */}

              <div className="w-auto flex flex-col  gap-1">
                <label className="whitespace-nowrap text-start 2xl:text-[18px] lg:text-[10px] xl:text-[13px] lg:my-1 lg:text-[12px]">
                  Filter by Brand
                </label>
                <select
                  name="brand"
                  id="brand"
                  placeholder="Brand"
                  className="border border-gray-400  rounded-md w-12/12 bg-white cursor-pointer
                  2xl:px-3 2xl:py-[5px]
                  xl:px-1 xl:py-[0px] 
                  lg:px-[2px] lg:py-[0px] "
                  onChange={handleSearchBrand}
                >
                  <option onClick={getAllProducts}>All</option>
                  {productBrands?.length > 0 &&
                    productBrands.map((bnd, index) => (
                      <option className="flex  gap-x-2 my-2" key={index}>
                        <p
                          className="text-[#645D64] uppercase  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline 2xl:text-[18px] text-[14px]"
                          onClick={() => handleSearchBrand(bnd)}
                          value={bnd}
                        >
                          {bnd}
                        </p>
                      </option>
                    ))}
                </select>
              </div>

              {/*----- filter by category start ------- */}
              <div className="w-auto flex flex-col items-center gap-1">
                <label
                  htmlFor=""
                  className="whitespace-nowrap  2xl:text-[18px] lg:text-[10px] xl:text-[13px] lg:my-1 lg:text-[12px]"
                >
                  Filter by Category
                </label>
                <select
                  name="category"
                  placeholder="Category"
                  className="border border-gray-400 rounded-md bg-white lg:w-12/12 md:w-full cursor-pointer
                  2xl:px-3 2xl:py-[5px]
                  xl:px-1 xl:py-[0px] 
                  lg:px-[2px] lg:py-[0px] "
                  onChange={handleSearchCategories}
                >
                  <option onClick={getAllProducts}>All</option>
                  {productCategory?.length > 0 &&
                    productCategory.map((cate, index) => (
                      <option className="flex gap-x-2 my-2" key={index}>
                        <button
                          className={`text-[#645D64] flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline 2xl:text-[18px] text-[14px] ${
                            selectedCategory === cate &&
                            "font-bold text-[#0284C7]"
                          }`}
                          onClick={() =>
                            handleSearchCategories({ target: { value: cate } })
                          }
                          value={cate}
                        >
                          {cate}
                        </button>
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        )}
        {/*--------- show by grid or list ---------*/}

        {isShowComponent === "grid" ? (
          <>
            <div className="">
              <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-6 mt-6">
                {Array.isArray(allProduct) &&
                  allProduct.map((items, ix) => (
                    <div
                      className="max-w-md w-full  shadow-md  overflow-hidden bg-white  border-[2px] border-gray rounded-[10px]  hover:border-lightBlue-600"
                      key={ix}
                    >
                        <Link href={`/view-product/${items?._id}`}>
                      <div className="h-[40%] ">
                          {items?.images?.length > 0 && (
                            <div className="flex items-center p-2 ">
                              <Image
                                src={items?.images[0]?.url[0]}
                                alt=""
                                className="flex mx-auto items-center rounded-[20px] lg:p-3 xl:p-5  2xl:w-[65%] xl:w-[70%] lg:w-[60%]"
                                width={80}
                                height={80}
                              />
                            </div>
                          )}
                      </div>
                        </Link>

                      <div className="p-5 pb-2 h-[50%] ">
                        <div className=" items-center 2xl:my-3 xl:mt-5">
                          <h6 className="xl:text-[14px] 2xl:text-[22px] w-[100%]
                           font-semibold capitalize mb-0 whitespace-nowrap  text-ellipsis overflow-hidden">
                            {items?.title}
                          </h6>
                        </div>
                        <div className=" items-center">
                          <p className="2xl:text-[20px] lg:text-[10px] xl:text-[13px] lg:my-1 2xl:my-2 xl:my-[6px] capitalize  ">
                            Brand : {items?.brand}
                          </p>
                        </div>
                        <p className="  capitalize text-LightBlue-700 lg:text-[10px] xl:text-[13px] lg:my-1 2xl:text-[20px] 2xl:my-2 xl:my-[6px]">
                          Offer Price : {items?.offerPriceCurr}{" "}
                          {items?.discountedPrice}
                        </p>
                        <p className="  capitalize text-LightBlue-700 lg:text-[10px] xl:text-[13px] lg:my-1 2xl:text-[20px] 2xl:my-2">
                          Regular Price : {items?.regPriceCurr} {items?.price}
                        </p>
                        <p className="text-[18px]  capitalize lg:text-[10px] xl:text-[13px] lg:my-1 2xl:text-[20px] 2xl:my-2 xl:my-[6px] ">
                          Stock : {items?.quantity}
                        </p>
                        <p className="text-[18px]  capitalize lg:text-[10px] xl:text-[13px] lg:my-1 2xl:text-[20px] 2xl:my-2 xl:my-[6px] ">
                          Category : {items?.subCategory}
                        </p>
                        <div className="flex">
                          {" "}
                          <h1 className="mt-1 mr-1 lg:text-[10px] xl:text-[13px] lg:my-1 2xl:text-[20px] 2xl:my-2 xl:my-[6px]">Status : </h1>
                          <p className=" bg-green-100   text-center rounded-xl text-green-700 w-20 lg:text-[10px] xl:text-[13px] lg:my-1 2xl:text-[20px] 2xl:my-2 xl:my-[6px]">
                            selling
                          </p>
                        </div>
                      </div>

                      <div className= " flex justify-between bg-gray-100 px-5 border-t border-gray-200 h-[10%]">
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
                            <MagnifyingGlassPlusIcon className="cursor-pointer lg:h-5 lg:w-5 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 text-gray-800" />
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
                            <PencilSquareIcon className="cursor-pointer lg:h-5 lg:w-5 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 text-gray-800" />
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
                          className="rounded-md bg-opacity-20  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          <TrashIcon className="cursor-pointer lg:h-5 lg:w-5 2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 text-red-800   " />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/*------- product list table start -------*/}
            <table className="table-auto bg-white w-full rounded-md mt-4">
              {/* -----------   head  ----------------- */}
              <thead className="">
                <tr className="bg-gray-200 text-gray-400 text-sm text-start ">
                  <input
                    type="checkbox"
                    className="mx-3 mt-6 cursor-pointer "
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                  {headItems.map((items, inx) => (
                    <th
                      className="text-start py-5 text-[14px] font-medium"
                      key={inx}
                    >
                      {items}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* -----------   body   ----------------- */}
              {allProduct?.map((item, index) => {
                const isItemSelected = isSelected(item?._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <tbody key={item?._id}>
                    <tr
                      role="checkbox"
                      onClick={(event) => handleClick(event, item?._id)}
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      className="cursor-pointer"
                    >
                      <td className="">
                        <input
                          type="checkbox"
                          className="mx-3  cursor-pointer "
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </td>
                      <td className="py-5 text-[14px] font-normal  max-w-[200px]">
                        {item?.title ? item?.title : "-"}
                      </td>
                      <td className="py-5 text-[14px] font-normal ">
                        {item?.category ? item?.category : "-"}
                      </td>
                      <td className="py-5 text-[14px] font-normal ">
                        {/* <del className="text-red-500"> */}
                        {item?.price ? item?.price : "-"}
                        {/* </del> */}
                      </td>
                      <td className="py-5 text-[14px] font-normal  text-green-500">
                        {item?.discountedPrice ? item?.discountedPrice : "-"}
                      </td>
                      <td className="py-5 text-[14px] font-normal ">
                        {item?.brand ? item?.brand : "-"}
                      </td>
                      <td className="py-5 text-[14px] font-normal ">
                        {item?.quantity ? item?.quantity : "-"}
                      </td>
                      <td className="py-5 text-[14px] font-normal ">
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
                      <td className="py-5 text-[14px] font-normal ">
                        <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                          selling
                        </p>
                      </td>
                      {/* --------- view details button  ------- */}
                      <td className="py-5 text-[14px] font-normal ">
                        <button>
                          <Link href={`/view-product/${item?._id}`}>
                            <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500" />
                          </Link>
                        </button>
                      </td>
                      <td className="py-5 ">
                        <div className="flex gap-5 items-center ">
                          {/* --------- edit  button  ------- */}
                          <Link href={`/edit-product/${item?._id}`}>
                            <button>
                              <PencilSquareIcon className="cursor-pointer h-6 w-6 text-gray-500" />
                            </button>
                          </Link>
                          {/* --------- delete button  ------- */}
                          <button
                            type="button"
                            onClick={() => openModal(item?._id)}
                            className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            <TrashIcon className="cursor-pointer h-6 w-6 text-red-800   " />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </>
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>

      {/* --------------   delete modal    --------------------- */}
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
