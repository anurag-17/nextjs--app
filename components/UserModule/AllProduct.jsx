import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import UserNavbar from "./userNavbar";
import { fetchApi } from "../../utlis/api";
import right from "/public/right-arrows.svg";

import WebsiteLoader from "../websiteLoader";

const ProductGrid = () => {

  const { token } = useSelector((state) => state.auth.userDetails || null);
  const [productCategory, setProductCategory] = useState("");
  const [productBrands, setProductBrands] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  const [getallCategory, setGetallCategory] = useState([]);
  const [getallBrand, setGetallBrand] = useState([]);
  let [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingBtn, setLoadingBtn] = useState(false);
  // JSON.parse(localStorage.getItem("userID"))

  const [isWished, setIsWished] = useState({});

  const [productColorsArray, setProductColorsArray] = useState([]);
  const [isOpenLogin, setOpenLogin] = useState(false);

  const openLoginModal = () => {
    setOpenLogin(true);
  };

  const closeLoginModal = () => {
    setOpenLogin(false);
  };

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
        // console.log(response.data);
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const pageLimit = "15";


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
      [productId]: !prevIsWished[productId], // Toggle the state for the specified product
    }));

    try {
      const response = await addToWishlist(productId);

      if (response.status === 200) {
        toast.success(response.data.message);
        setLoading(false);
        refreshData();
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

  const getAllProducts = async (page) => {
    setLoadingBtn(true)
    const options = {
      method: "GET",
      url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?page=${page}&limit=${pageLimit}`,
    }

    axios
      .request(options)
      .then(function (response) {
        if (response.status === 200) {
          setAllProduct(response?.data);
setLoadingBtn(false)
          const categories = response?.data?.map((product) => product.category);
          const uniqueCategories = [...new Set(categories)];
          setProductCategory([...uniqueCategories]);

          const brands = response?.data?.map((product) => product.brand);
          const uniqueBrands = [...new Set(brands)];
          setProductBrands([...uniqueBrands]);

          const fields = response?.data?.map((product) => product.title);
          const uniqueFields = [...new Set(fields)];
          ["All", ...uniqueFields];
        }
        else{
          setLoadingBtn(false)
          return
        }
      })
      .catch(function (error) {
        setLoadingBtn(false)
        console.error(error);
      });
  };

  // ------ search products ------ //
  const handleSearch = (e) => {
    const title = e.target.value;
    if (title.trim() === "") {
    } else {
      const options = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?search=${title}`,
      };
      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            setAllProduct(response?.data);
      refreshData();

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

  // ------ filter products by category ------ //
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
        console.log(response);
        if (response.status === 200) {
          sessionStorage.removeItem("addToCart");
          setTimeout(() => {
          }, 500);

          refreshData();
        } else {
          return;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };


  useEffect(() => {
    if (token) {
      defaultCustomer();
    }
  }, []);

  const defaultCustomer = async () => {
    try {
      const response = await fetchApi("/auth/getUserCart", token);
      if (response?.status === 200) {
        const data = await response.json();

        if (typeof window !== "undefined") {
          localStorage.setItem("productsLength", data?.cart?.products?.length);
          refreshData()
        }
      } else if (response.status === 202) {
        refreshData()
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshData  = () => {
    setRefresh(!isRefresh)
  }

  return (
    <>
       {
        isLoadingBtn &&
        <WebsiteLoader />
      }
      <ToastContainer />
      <UserNavbar />

      <section className="bg-gray-00 min-h-screen px-20 flex">
        <div className="space-y-9 w-[25%]">
          {/*----- filter by category start ------- */}
          <div className="bg-white p-5 py-9 rounded-sm w-96 mr-4 ">
            <p className="font-semibold text-2xl mb-4">Product Categories</p>
            <hr className="mb-2" />
            <div className="space-y-4 ">
              <div className=" gap-1 ">
                {/* <Link href={`/product-filter/${cate}`}></Link> */}
                <div className="flex">
                  <Image className="w-3" alt="loading" src={right} height={20} width={20} />
                  <button
                    name="category"
                    placeholder="Category"
                    className="text-[#645D64]  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline"
                    onClick={getAllProducts}
                  >
                    All
                  </button>
                </div>
                {productCategory?.length > 0 &&
                  productCategory.map((cate,index) => (
                    <div className="flex flex-col-reverse" key={index}>
                      <div className="flex my-2">
                        <Image className="w-3" alt="loading" src={right} height={20} width={20} />
                        <button
                          name="category"
                          placeholder="Category"
                          className="text-[#645D64]  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline"
                          onClick={handleSearchCategories}
                          value={cate}
                        >
                          {cate}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/*----- filter by Brand start ------- */}
          <div className="bg-white p-5 py-9 rounded-sm w-96 mr-4">
            <p className="font-semibold text-2xl mb-4">Product Brands</p>
            <hr className="mb-2" />
            <div className=" ">
              <div className=" justify-between text-[#645D64] space-y-4 ">
                <div className="w-auto flex flex-col  gap-1">
                  <div className="flex">
                    <Image className="w-3" alt="loading" src={right} height={20} width={20}/>
                    <button
                      name="category"
                      placeholder="Category"
                      className="text-[#645D64]  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline"
                      onClick={getAllProducts}
                    >
                      All
                    </button>
                  </div>
                  {productBrands?.length > 0 &&
                    productBrands.map((bnd,index) => (
                      <div className="flex flex-col-reverse" key={index}>
                        <div className="flex my-2">
                          <Image className="w-3" alt="loading" src={right} height={20} width={20} />
                          <button
                            name="brand"
                            id="brand"
                            placeholder="Brand"
                            className="text-[#645D64]  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline"
                            onClick={handleSearchBrand}
                            value={bnd}
                          >
                            {bnd}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full md:w-[85%] mx-auto">
          <div className="flex justify-between items-center py-4 px-10 rounded-lg bg-lightBlue-50 border border-gray-300 h-[100px]">
            <h2 className="text-[30px] font-semibold">All Product </h2>

            <div className="w-[40%]">
              <input
                type="search"
                className=" border border-gray-300  font-medium text-[19px] py-3 rounded-md  focus-visible:border-none w-full text-black  placeholder:text-[#3a3636] px-4 "
                placeholder="Search"
                aria-label="Search" 
                aria-describedby="button-addon1"
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-7 my-5 h-[80vh] overflow-y-scroll ">
            {allProduct?.length>0 && allProduct?.map((items, ix) => (
              <div
                className=" bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 hover:border-lightBlue-600"
                key={ix}
              >
                {items?.images?.length > 0 && (
                  <div className="h-[400px] p-2 overflow-hidden">
                    <Link href={`/product-details/${items?._id}`}>
                      <Image
                        src={items?.images[0]?.url[0]}
                        alt="product"
                        className=" mx-auto rounded-[20px] overflow-hidden  "
                        width={300}
                        height={300}
                      />
                    </Link>
                  </div>
                )}
                <div className="bg-white px-10 pb-6 rounded-[20px] mt-3">
                  <div className="flex justify-between items-center my-4">
                    <p className="text-[25px] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden">
                      {items.title}
                    </p>
                    {!token || token === undefined ? (
                      <div className="cursor-pointer" onClick={openLoginModal}>
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

                  <div className="text-[18px]  flex capitalize  ">
                    Brand :<p className="font-semibold px-2"> {items.brand} </p>
                  </div>
                  <div className="text-[18px] flex font-semibold capitalize my-2 text-lightBlue-700">
                    Offer price :
                    <p className="text-lightBlue-800 px-2 font-bold">
                      {items?.offerPriceCurr} {items.discountedPrice}
                    </p>
                  </div>
                  <del className="text-md font-semibold capitalize my-2 text-lightBlue-600">
                    Regular Price : {items?.regPriceCurr} {items.price}
                  </del>

                  <div className="text-[18px] flex capitalize my-2 ">
                    Stock :
                    <p className="px-2 font-semibold">{items.quantity}</p>
                  </div>
                  <div className="text-[18px] flex capitalize my-2 ">
                    Category :
                    <p className="font-semibold px-2">{items.category}</p>
                  </div>
                  <div className="flex mt-3">
                    <h1 className="mt-1  mr-1 text-[18px]">Status : </h1>
                    <p className=" bg-lightBlue-100 p-1 text-center font-semibold rounded-xl text-lightBlue-700 w-20">
                      selling
                    </p>
                  </div>
                  <Link href={`/product-details/${items?._id}`}>
                    <button className="w-full border p-3 rounded-lg text-white bg-lightBlue-600 hover:bg-lightBlue-500 my-2 font-semibold mt-4 items-end">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
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
                    className="lg:text-[25px] text-[16px] font-semibold leading-6 text-gray-900 mb-4"
                  >
                    Please login to add into wishlist
                  </Dialog.Title>

                  <div className="flex justify-between gap-x-5 pt-4">
                    <button
                      className="w-full border border-1 rounded-md border-lightBlue-400 text-lightBlue-700 hover:bg-lightBlue-200 text-sm  px-2 py-3 hover:border-none"
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
