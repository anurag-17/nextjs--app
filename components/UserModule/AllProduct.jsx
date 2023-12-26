import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";

import UserNavbar from "./userNavbar";
import WebsiteLoader from "../websiteLoader";
import { getUserWishList } from "../../redux/slices/authSlice";

import right from "/public/right-arrows.svg";
import Pagination from "./Pagination";
import { current } from "@reduxjs/toolkit";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.userDetails || null);
  const { userWishList } = useSelector((state) => state.auth || null);
  const [productCategory, setProductCategory] = useState("");
  const [productBrands, setProductBrands] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  const [getallCategory, setGetallCategory] = useState([]);
  const [getallBrand, setGetallBrand] = useState([]);
  let [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingBtn, setLoadingBtn] = useState(false);

  const [isWished, setIsWished] = useState({});

  const [productColorsArray, setProductColorsArray] = useState([]);
  const [isOpenLogin, setOpenLogin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [brandFilter,setBrandFilter]=useState("");
  const [catagoryFilter,setCatagoryFilter]=useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const openLoginModal = () => {
    setOpenLogin(true);
  };

  const closeLoginModal = () => {
    setOpenLogin(false);
  };

  useEffect(() => {
    defaultBrand();
  }, []);

  const defaultBrand = () => {
    const option = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/brand/getallBrand",
    };
    axios
      .request(option)
      .then((response) => {
        setGetallBrand(response?.data);
        // console.log("abc",response?.data);
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
        setTotalPages(response?.data?.totalPages);
        // console.log("qqq",response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  

  useEffect(() => {
    getAllProducts();
  }, []);

  


  const addToWishlist = async (id) => {
    const prodId = id;
    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/product/addToWishlist",
      headers: {
        "Content-Type": "application/json",

        authorization: token,
      },
      data: {
        prodId: id,
      },
    };
    try {
      const response = await axios.request(options);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const toggleWishlist = async (productId) => {
    setIsWished((prevIsWished) => ({
      ...prevIsWished,
      [productId]: !prevIsWished[productId], 
    }));

    try {
      const response = await addToWishlist(productId);

      console.log(response);
      if (response.status === 200) {
        // console.log("ressss",response.data.products)  
        if (response?.data?.message === "Product added to wishlist") {
          toast.success(response?.data?.message);
        } else {
          toast.warning(response?.data?.message);
        }
        setLoading(false);
        refreshData();
        dispatch(getUserWishList(response?.data?.wishlist));
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("User Invalid Please Login");
    }
  };

  const handleColorChange = (productId, selectedColor) => {
    const productIndex = productColorsArray.findIndex(
      (item) => item.productId === productId
    );
    if (productIndex !== -1) {
      const updatedArray = [...productColorsArray];
      updatedArray[productIndex].color = selectedColor;
      setProductColorsArray(updatedArray);
    } else {
      const updatedArray = [
        ...productColorsArray,
        { productId, color: selectedColor },
      ];
      setProductColorsArray(updatedArray);
    }
  };

// ---------page limit--------
const pageLimit = 12;
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
      const categories = response?.data?.products.map((product) => product.category);
      const uniqueCategories = [...new Set(categories)];
      setProductCategory([...uniqueCategories]);

      const brands = response?.data?.products.map((product) => product.brand);
      const uniqueBrands = [...new Set(brands)];
      setProductBrands([...uniqueBrands]);

      const fields = response?.data?.products.map((product) => product.title);
      const uniqueFields = [...new Set(fields)];
      ["All", ...uniqueFields];
      setTotalPages(response?.data?.totalPages);
    } else {
      setLoadingBtn(false);
    }
  } catch (error) {
    setLoadingBtn(false);
    console.error(error);
  }
};

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};

useEffect(() => {
  getAllProducts(currentPage, pageLimit);
}, [currentPage]);


  // ------ search products ------ //
  const handleSearch = (e) => {
    const title = e.target.value.trim();
    console.log(e.target.value.trim());
    if (title === "") {
      getAllProducts();
    } else {
      callFunction(title);
    }
  };

  const handleKeyDown = (e) => {
    console.log("Pressed key:", e.key);
    if (e.key === "backspace") {
      callFunction(e.target.value);
    }
  };

  const callFunction = async (title) => {
    const options = {
      method: "GET",
      url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?search=${title}`,
    };
    await axios
      .request(options)
      .then(function (response) {
        if (response.status === 200) {
          console.log("sasa",response.data.products);
          setAllProduct(response?.data?.products);
          setTotalPages(response?.data?.totalPages);
          refreshData();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // ------ filter products by brand ------ //
  const handleSearchBrand = (bnd) => {
    if (bnd === "All") {
      setBrandFilter("")
      refreshData();
    } else { 
      setBrandFilter(bnd)
      const options = {
        method: "GET",
        url: catagoryFilter == "" ? `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?brand=${bnd}`:`https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?category=${catagoryFilter}&brand=${bnd}`,
      };
      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            setAllProduct(response?.data?.products);
            setTotalPages(response.data?.totalPages);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };
  console.log(brandFilter !== "");
  // ------ filter products by category ------ //
  const handleSearchCategories = (e) => {
    const cate = e.target.value;
    if (cate === "All") {
      setCatagoryFilter("")
      getAllProducts();
      refreshData();
      setSelectedCategory(cate);
    } else {
      setCatagoryFilter(e.target.value)
      const options = {
        method: "GET",
        url:brandFilter == "" ? `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?category=${cate}`:`https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?category=${cate}&brand=${brandFilter}`,
      };
      axios
        .request(options)
        .then(function (response) {
          console.log("hell", response.data);
          if (response.status === 200) {
            setAllProduct(response.data?.products);
            setSelectedCategory(cate);
            setTotalPages(response.data?.totalPages);

          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    addtoCartBySession();
  }, []);

  const addtoCartBySession = () => {
    const sessionCart = JSON.parse(sessionStorage.getItem("addToCart")) || [];

    if (sessionCart?.length > 0 && token) {
      console.log("");
      addToCart(sessionCart);
    } else {
    }
  };

  const addToCart = (data) => {
    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/auth/cart",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      data: {
        cart: [
          {
            _id: data[0]?._id,
            count: data[0]?.count,
            color: data[0]?.color,
          },
        ],
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          sessionStorage.removeItem("addToCart");
          // setCartItems(dispatch(data?.cart?.products))
          refreshData();
        } else {
          return;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  useEffect(() => {
    // Initialize isWished state based on userWishList
    const initialWishlistState = userWishList.reduce((acc, productId) => {
      acc[productId] = true;
      return acc;
    }, {});
    setIsWished(initialWishlistState);
  }, [userWishList]);

  return (
    <>
      {isLoadingBtn && <WebsiteLoader />}
      <ToastContainer
        position="bottom-right"
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <UserNavbar />

      <section className="bg-gray-00 min-h-screen  ">
        <div className="px-[15px] flex gap-x-10  md:flex-row flex-col justify-between">
          <div className="space-y-9 md:w-[20%]">
            {/*----- filter by category start ------- */}
            <div className="bg-white p-5 py-9 rounded-sm md:mr-4">
      <p className="font-semibold 2xl:text-2xl lg:text-xl md:text-[16px] text-[21px] mb-4">
        Product Categories
      </p>
      <hr className="mb-2" />
      <div className="flex gap-x-2">
        <Image
          className="w-3"
          alt="loading"
          src={right}
          height={16}
          width={16}
        />
        <button
          className={`text-[#645D64] flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline 2xl:text-[18px] text-[14px] ${
            selectedCategory === 'All' && 'font-bold text-[#0284C7]'
          }`}
          onClick={() => handleSearchCategories({ target: { value: 'All' } })}
        >
          All
        </button>
      </div>
      {productCategory?.length > 0 &&
        productCategory.map((cate, index) => (
          <div className="flex gap-x-2 my-2" key={index}>
            <Image
              className="w-3"
              alt="loading"
              src={right}
              height={16}
              width={16}
            />
            <button
              className={`text-[#645D64] flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline 2xl:text-[18px] text-[14px] ${
                selectedCategory === cate && 'font-bold text-[#0284C7]'
              }`}
              onClick={() => handleSearchCategories({ target: { value: cate } })}
              value={cate}
            >
              {cate}
            </button>
          </div>
        ))}
    </div>

            {/*----- filter by Brand start ------- */}
            <div className="bg-white p-5 py-9 rounded-sm  md:mr-4 ">
              <p className="font-semibold text-2xl mb-4 2xl:text-2xl lg:text-xl md:text-[16px] text-[21px]">
                Product Brands
              </p>
              <hr className="mb-2" />
              <div className="flex gap-x-2">
                <Image
                  className="w-3"
                  alt="loading"
                  src={right}
                  height={16}
                  width={16}
                />
                <p
                  className="text-[#645D64]  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline 2xl:text-[18px] text-[14px]"
                  onClick={getAllProducts}
                >
                  All
                </p>
              </div>
              {productBrands?.length > 0 &&
                productBrands.map((bnd, index) => (
                  <div className="flex  gap-x-2 my-2" key={index}>
                    <Image
                      className="w-3"
                      alt="loading"
                      src={right}
                      height={16}
                      width={16}
                    />
                    <p
                      className="text-[#645D64] uppercase  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline 2xl:text-[18px] text-[14px]"
                      onClick={() => handleSearchBrand(bnd)}
                      value={bnd}
                    >
                      {bnd}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className=" w-full md:w-[80%] mx-auto mt-7 md:mt-0">
            <div className="flex md:flex-row flex-col gap-y-5 md:justify-between justify-center items-center py-4 xl:py-3 2xl:py-4  px-10 rounded-lg bg-lightBlue-50 border border-gray-300 2xl:h-[100px] h-auto">
              <h2 className="2xl:text-[30px] xl:text-[22px] lg:text-[28px] md:text-[16px] text-[21px] font-semibold">
                All Product
              </h2>

              <div className="2xl:w-[40%] md:w-[30%]">
                <input
                  type="search"
                  className=" border border-gray-300  font-medium text-[19px] 2xl:py-3 py-1 rounded-md  focus-visible:border-none w-full text-black  placeholder:text-[#3a3636] px-4 placeholder:text-[14px]"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon1"
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="grid 2xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 2xl:gap-5 md:gap-5 my-5 md:space-y-0 space-y-8 pt-[20px] ">
              {allProduct?.length > 0 &&
                allProduct?.map((items, ix) => (
                  <div
                    className=" bg-white  border-[2px] border-gray  hover:rounded-[10px] hover:border-lightBlue-600"
                    key={ix}
                  >
                    {items?.images?.length > 0 && (
                      <div className="h-[276px] 2xl:h-[300px] p-2 overflow-hidden relative">
                        <Link href={`/product-details/${items?._id}`}>
                          <Image
                            src={items?.images[0]?.url[0]}
                            alt="product"
                              className=" mx-auto rounded-[5px] overflow-hidden  "
                            width={200}
                            height={300}
                          />
                        </Link>

                        <p
                          className={`absolute right-1 top-3 py-1 lg:py-1  2xl:py-1 px-4 md:px-3 lg:px-2 2xl:px-3 text-center md:text-[13px] lg:text-[10px] xl:text-[13px] font-medium rounded-xl 
                            ${
                              items.quantity < 1
                                ? "text-red-600 bg-red-100 "
                                : "text-green-600  bg-green-100"
                            } 
                            `}
                        >
                          {items.quantity < 1 ? " Out of stock" : "In stock"}
                        </p>
                      </div>
                    )}
                    <div className="bg-white px-5  xl:px-3 2xl:px-10 pb-6 rounded-[20px] mt-3">
                      <div className="flex justify-between items-center my-4">
                        <p className="2xl:text-[25px] xl:text-[16px] text-[18px] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden">
                          {items.title}
                        </p>
                        {!token || token === undefined ? (
                          <div
                            className="cursor-pointer"
                            onClick={openLoginModal}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1}
                              stroke="currentColor"
                              className="w-6 h-6 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                              />
                            </svg>
                          </div>
                        ) : (
                          <button onClick={() => toggleWishlist(items._id)}>
                            {isWished[items._id] ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="w-6 h-6 fill-[#f16e6e] "
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="w-6 h-6 b"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="2xl:text-[18px] xl:text-[14px] text-[15px]  flex justify-between capitalize  ">
                        Brand :
                        <p className="font-semibold px-2"> {items.brand} </p>
                      </div>

                      <div className="2xl:text-[18px]  xl:text-[14px] text-[15px] flex justify-between capitalize my-2 ">
                        Category :
                        <p className="font-semibold px-2">{items.category}</p>
                      </div>

                      <div className="2xl:text-[18px]  xl:text-[14px] text-[15px] flex justify-between font-semibold capitalize my-2 text-lightBlue-700">
                        Offer price :
                        <p className="text-lightBlue-800 px-2 font-bold">
                          {items?.offerPriceCurr} {items.discountedPrice}
                        </p>
                      </div>

                      <p className="2xl:text-[18px]  xl:text-[14px] text-[15px] capitalize my-2 flex justify-between">
                        Regular Price :
                        <del className="text-lightBlue-600">
                          {items?.regPriceCurr} {items.price}
                        </del>
                      </p>

                      <Link href={`/product-details/${items?._id}`}>
                        <button className=" 2xl:text-[16px] md:text-[14px] w-full border p-3 rounded-lg text-white bg-lightBlue-600 hover:bg-lightBlue-500 my-2 font-semibold mt-4 items-end">
                          View Details
                        </button>
                      </Link>

                      {/* <div className="2xl:text-[18px] text-[15px] flex justify-between capitalize my-2 ">
                        Stock :
                        <p className="px-2 font-semibold">{items.quantity}</p>
                      </div> */}
                      {/* <div className="flex justify-between mt-3">
                      <h1 className="mt-1  mr-1 2xl:text-[18px] text-[15px]">Status : </h1>
                      <p className=" bg-lightBlue-100 p-1 text-center font-semibold rounded-xl text-lightBlue-700 w-20">
                        selling
                      </p>
                    </div> */}
                    </div>
                  </div>
                ))}
            </div>
    {/* ----------pagination----------- */}
   {totalPages >1 && (
    <Pagination
    totalPages={totalPages} 
    currentPage={currentPage}
    onPageChange={handlePageChange}/>
   )}


          </div>
        </div>
      </section>

      {/* --------------   Login modal    --------------------- */}
      <Transition appear show={isOpenLogin} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeLoginModal}>
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
                    as="h4"
                    className="lg:text-[25px] text-[16px] font-semibold leading-6 text-gray-900 mb-4 "
                  >
                    Please login to add into wishlist
                  </Dialog.Title>

                  <div className="flex justify-between gap-x-5 pt-4">
                    <button
                      className="w-full border border-1 rounded-md border-lightBlue-400 text-lightBlue-700 hover:bg-lightBlue-200 text-sm  px-2 py-3 hover:border-none focus-visible:outline-none"
                      onClick={closeLoginModal}
                    >
                      No
                    </button>
                    <Link href="/login" className="w-full">
                      <button className="w-full border border-1 rounded-md  text-sm  border-red-400 text-red-700 hover:bg-red-200  px-2 py-3 hover:border-none">
                        Ok
                      </button>
                    </Link>
                  </div>
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
