import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { toast } from "react-toastify";
import DeleteModal from "../AdminModule/Product/Modal/deleteModal";
import right from "/public/right-arrows.svg";
import UserNavbar from "./userNavbar";
import Slider from "./sliderrange";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const ProductGrid = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [getallCategory, setGetallCategory] = useState([]);
  const [getallBrand, setGetallBrand] = useState([]);
  const [addInWishlist, setAddInWishlist] = useState();
  let [productID, setProductID] = useState("");
  let [isOpenDelete, setOpenDelete] = useState(false);
  let [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [customerID, setCustomerID] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const _id = productID;
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userToken"))
  );
  const [wishListItems, setWishListItems] = useState();
  const [isWished, setIsWished] = useState({});

  const [productQuantitiesArray, setProductQuantitiesArray] = useState([]);
  const [productColorsArray, setProductColorsArray] = useState([]);
  const [isAddedCart, setAdedCart] = useState(false);
  const [isAddIntoCartID, setAddIntoCartID] = useState(false);

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
        if (response.status === 200) {
          setAllProduct(response?.data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const addToWishlist = (id) => {
    console.log(id);
    setWished(!isWished);
    const prodId = id;
    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/product/addToWishlist",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
      },
      data: {
        prodId: id,
        _id: customerID,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          toast.success("Success. Product added successfully!");
          setLoading(false);
          refreshData();
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed. Can not repeat product name!");
      });
  };

  const toggleWishlist = (productId) => {
    setIsWished((prevIsWished) => ({
      ...prevIsWished,
      [productId]: !prevIsWished[productId], // Toggle the state for the specified product
    }));
  };

  const handleCounter = (productId) => {
    const productIndex = productQuantitiesArray.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex !== -1) {
      // If the product is already in the array, update its quantity
      const updatedArray = [...productQuantitiesArray];
      updatedArray[productIndex].quantity += 1;
      setProductQuantitiesArray(updatedArray);
    } else {
      // If the product is not in the array, add it with a quantity of 1
      const updatedArray = [
        ...productQuantitiesArray,
        { productId, quantity: 1 },
      ];
      setProductQuantitiesArray(updatedArray);
    }
  };

  const handleColorChange = (productId, selectedColor) => {
    const productIndex = productColorsArray.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex !== -1) {
      // If the product is already in the array, update its color
      const updatedArray = [...productColorsArray];
      updatedArray[productIndex].color = selectedColor;
      setProductColorsArray(updatedArray);
    } else {
      // If the product is not in the array, add it with the selected color
      const updatedArray = [
        ...productColorsArray,
        { productId, color: selectedColor },
      ];
      setProductColorsArray(updatedArray);
    }
  };

  const handleAddToCart = async (e, prodId) => {
    // console.log(prodId);

    e.preventDefault();
    setLoading(true);

    const filterArry = productQuantitiesArray?.filter((item) => {
      if (item?.productId === prodId) return item?.quantity;
    });

    const filterColor = productColorsArray?.filter((item) => {
      if (item?.productId === prodId) return item?.color;
    });

    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/auth/cart",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
      },
      data: {
        cart: [
          {
            _id: prodId,
            count: filterArry?.quantity || 1,
            color: filterColor?.color,
          },
        ],
        _id: customerID,
      },
    };
    try {
      axios
        .request(options)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            toast.success("Success. Product added into cart !");
            setAdedCart(true);
            setAddIntoCartID(response?.data?.product[0]?.product);
            refreshData();
          } else {
            setLoading(false);
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
          toast.error("Failed !");
        });
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <UserNavbar />

      <section className="bg-gray-00 min-h-screen px-20 flex">
        <div className="space-y-9 w-[25%]">
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
        </div>

        <div className=" w-full md:w-[85%] mx-auto">
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
            {allProduct?.map((items, ix) => (
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
                    <button onClick={() => toggleWishlist(items._id)}>
                      {isWished[items._id] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-6 h-6 fill-[#ed8080]"
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
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <p className="text-[18px]  flex capitalize  ">
                    Brand :{" "}
                    <p className="font-semibold px-2"> {items.brand} </p>
                  </p>
                  <p className="text-[20px] flex font-semibold capitalize my-2 text-sky-600">
                    Offer price :{" "}
                    <p className="text-sky-800 px-2 font-bold">
                      ₹{items.discountedPrice}{" "}
                    </p>
                    <br />
                  </p>
                  <del className="text-md font-semibold capitalize my-2 text-sky-600">
                    {" "}
                    Regular Price : ₹{items.price}
                  </del>

                  <p className="text-[18px] flex capitalize my-2 ">
                    Stock :{" "}
                    <p className="px-2 font-semibold">{items.quantity}</p>
                  </p>
                  <p className="text-[18px] flex capitalize my-2 ">
                    Category :{" "}
                    <p className="font-semibold px-2">{items.category}</p>
                  </p>
                  <div className="flex mt-3">
                    {" "}
                    <h1 className="mt-1  mr-1 text-[18px]">Status : </h1>
                    <p className=" bg-sky-200 p-1 text-center font-semibold rounded-xl text-sky-600 w-20">
                      selling
                    </p>
                  </div>
                  <p className="text-[18px] flex capitalize my-4">
                    Quantity :
                    <p className="font-semibold px-2">
                      {productQuantitiesArray.find(
                        (item) => item.productId === items._id
                      )?.quantity || 1}
                    </p>
                    <button
                      onClick={() => handleCounter(items._id)}
                      className="border px-3 ml-3"
                    >
                      +
                    </button>
                  </p>
                  <div className="flex gap-x-5 mt-3">
                    <label for="color" className="text-[18px] capitalize my-2">
                      Colors :
                    </label>
                    <div className="w-[250px]">
                      <select
                        onChange={(e) =>
                          handleColorChange(items._id, e.target.value)
                        }
                        // value={selectedColor}
                        className="w-full cursor-default rounded bg-white py-3 pl-3 pr-4 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 border sm:text-sm"
                      >
                        <option
                          value=""
                          className="cursor-default py-2 pl-10 pr-4 text-sm capitalize"
                        >
                          Select Color
                        </option>
                        {items?.color?.map((options, inx) => (
                          <option
                            key={inx}
                            value={options}
                            className="cursor-default py-2 pl-10 pr-4 text-sm capitalize"
                          >
                            {options}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {isAddIntoCartID === items?._id ? (
                    <button
                      className="w-full border p-3 rounded-lg hover:text-white border-sky-600 text-sky-900   hover:bg-sky-600 my-2 mt-4 items-end"
                      onClick={(e) => handleAddToCart(e, items?._id)}
                    >
                      Go To Cart
                    </button>
                  ) : (
                    <button
                      className="w-full border p-3 rounded-lg text-white bg-sky-600 hover:bg-sky-900 my-2 mt-4 items-end"
                      onClick={(e) => handleAddToCart(e, items?._id)}
                    >
                      Add To Cart
                    </button>
                  )}
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
