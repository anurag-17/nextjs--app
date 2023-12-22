import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import ProductDetailsCarousel from "../Product/ProductDetailsCarousel";
import {
  getCartProducts,
  getUserWishList,
} from "../../../redux/slices/authSlice";

const UserWishlist = ({ getWishProduct, refreshData }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.userDetails || null);
  const [itemStates, setItemStates] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [productColor, setProductColor] = useState("");
  const [isShowErr, setShowErr] = useState(false);
  let [productQuantity, setProductQuantity] = useState(1);
  const [isAddIntoCart, setAddIntoCart] = useState(false);
  const [itemQuantities, setItemQuantities] = useState({});

  const handleDelete = () => {
    axios
      .delete(
        "https://e-commerce-backend-brown.vercel.app/api/product/deleteAllWishlistItems",
        {
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Wishlist items deleted successfully !");
          refreshData();
          dispatch(getUserWishList([]));
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("Request error:", error);
      });
  };

  const handleCounter = (itemId) => {
    if (productQuantity !== -1) {
      setProductQuantity((productQuantity += 1));
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 0) + 1,
      }));
    }
  };
  const handleMinusCounter = (itemId) => {
    if (productQuantity > 1) {
      setProductQuantity((productQuantity -= 1));
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    }
  };

  const handleColorChange = (itemId, e) => {
    const color = e.target.value;
    setItemStates((prevItemStates) => ({
      ...prevItemStates,
      [itemId]: { ...prevItemStates[itemId], color, isShowErr: false },
    }));
    setProductColor(color);
  };

  const addToCart = (data) => {
    const itemId = data?._id;
    const { color } = itemStates[itemId] || {};
    if (!color) {
      setItemStates((prevItemStates) => ({
        ...prevItemStates,
        [itemId]: { ...prevItemStates[itemId], isShowErr: true },
      }));

      setLoading(false);
    } else {
      const options = {
        method: "POST",
        url: "https://e-commerce-backend-brown.vercel.app/api/auth/cart",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/2023.5.8",
          authorization: token,
        },
        data: {
          cart: [
            {
              _id: data?._id,
              count: productQuantity || 1,
              color: color,
            },
          ],
        },
      };

      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response);
            setAddIntoCart(true);
            removeFromWishlist(data?._id);
            dispatch(getCartProducts(response?.data?.cart));
            setProductColor("");
          } else {
            toast.error("Failed, Token is expired");
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
          toast.error("Failed, Token is expired");
        });
      setItemStates((prevItemStates) => ({
        ...prevItemStates,
        [itemId]: { ...prevItemStates[itemId], color: "", showErr: false },
      }));
    }
  };

  const removeFromWishlist = (id) => {
    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/product/addToWishlist",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        authorization: token,
      },
      data: {
        prodId: id,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        if (response.status === 200) {
          dispatch(getUserWishList(response?.data?.wishlist));
          refreshData();
        } else {
          return;
        }
      })
      .catch(function (error) {
        toast.error("Failed. try again!");
      });
  };

  return (
    <>
      <div className="px-5 sm:px-20 ">
        {getWishProduct?.length > 0 ? (
          <div className="border rounded-lg bg-white p-1 sm:p-5">
            <div className="flex justify-between">
              <div>
                <h1 className="2xl:text-[35px] lg:text-[28px] text-[22px] font-semibold px-2">
                  Your Wishlist
                </h1>
              </div>

              <button
                onClick={handleDelete}
                className=" border p-1  rounded-lg hover:bg-[#F3F4F9] px-1 sm:px-6 cursor-pointer"
              >
                <p className=" text-[16px] mx-1 flex gap-x-2">
                  Clear
                  <Image src="/cross.svg" alt="close" height={16} width={16} />
                </p>
              </button>
            </div>
            <hr className="my-5" />
            <div className="flex flex-col-reverse">
              {getWishProduct?.map((item, inx) => (
                <div className=" lg:pb-0 border-[2px] border-gray  hover:rounded-[10px] m-4 my-7 hover:border-lightBlue-600 cursor-pointer">
                  <div className=" flex flex-col justify-center md:flex-row  bg-white " key={inx}>
                    <div>
                      <ProductDetailsCarousel
                        images={item?.images || []}
                        productColor={productColor}
                        detailId={item?._id}
                      />
                    </div>
                    <div className="flex lg:flex-row flex-col justify-around items-center md:w-[60%] lg:w-full lg:pb-0 ">
                      <div className="bg-white px-0 sm:px-10 pb-6 rounded-[20px] ">
                        <div className="flex justify-between items-center my-4">
                          <h6 className="text-[25px] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden"></h6>
                        </div>

                        <Link href={`/product-details/${item?._id}`}>
                          <p className="text-[18px]  flex capitalize  ">
                            <p className=" font-semibold text-[18px] sm:text-[26px]">
                              {item?.title}{" "}
                            </p>
                          </p>
                        </Link>

                        <div className="flex text-[14px] sm:text-[16px] font-semibold capitalize my-2 text-lightBlue-600">
                          Price : <p className="pl-[73px]">₹{item?.price}</p>
                        </div>
                        <p className="text-[14px] sm:text-[16px]  flex capitalize  ">
                          Regular Price :
                          <p className="font-semibold px-2">
                            <del>₹{item?.discountedPrice}</del>
                          </p>
                        </p>

                        <div className="flex text-left my-4">
                          <div className=" sm:w-[100px] text-[14px] sm:text-[16px] font-normal leading-[28px]">
                            Quantity :
                          </div>
                          <div className=" sm:pl-5 text-md xl:text-[20px] font-semibold leading-[28px] capitalize flex">
                            <p className="font-semibold px-2">
                              {itemQuantities[item?._id] || 1}
                            </p>
                            <button
                              onClick={() => handleMinusCounter(item?._id)}
                              className="border border-black px-3 ml-3 text-[12px]"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleCounter(item?._id)}
                              className="border border-black px-3 ml-3 text-[12px]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex text-[14px] sm:text-[16px]">
                          <h1 className="mt-1  mr-1 text-md">Status : </h1>
                          <p className="ml-16 bg-green-200 p-1 px-2 text-center font-semibold rounded-md text-green-600 ">
                            Available
                          </p>
                        </div>
                        <div className="flex text-left mt-4 text-[14px] sm:text-[16px]">
                          <div className="text-md font-normal leading-[28px]">
                            Colors :
                          </div>
                          <div className="ml-4">
                            <div className=" lg:w-[180px] xl:w-[250px]">
                              <select
                                onChange={(e) =>
                                  handleColorChange(item?._id, e)
                                }
                                value={itemStates[item?._id]?.color || ""}
                                // value={selectedColor}
                                className="w-full cursor-default rounded bg-white py-3 pl-3 pr-4 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 border sm:text-sm capitalize"
                              >
                                <option
                                  value=""
                                  className="cursor-default py-2 pl-10 pr-4 text-sm capitalize"
                                >
                                  Select Color
                                </option>
                                {item?.color?.length > 0 &&
                                  item?.color?.map((options, inx) => (
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
                            {itemStates[item?._id]?.isShowErr && (
                              <p className="text-sm font-medium py-1 bg-red-100 text-red-600 px-4 rounded mt-2 w-[250px]">
                                Please choose color
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="xl:pr-0 lg:pr-5 md:pr-0 lg:block hidden">
                        <button
                          onClick={() => addToCart(item)}
                          className="px-4 lg:py-3 py-2 rounded-md flex justify-center items-center text-[16px] font-semibold bg-lightBlue-700 text-white border hover:bg-white hover:text-lightBlue-700 border-lightBlue-700 md:w-[250px] xl:w-[300px] lg:w-[200px] w-full"
                        >
                          Move to Cart
                        </button>
                        {/* } */}

                        <button
                          onClick={() => removeFromWishlist(item?._id)}
                          className="px-4 lg:py-3 py-2 rounded-md flex justify-center items-center text-[16px] font-semibold hover:bg-lightBlue-700 hover:text-white border bg-white text-lightBlue-700 border-lightBlue-700 md:w-[250px] xl:w-[300px] lg:w-[200px] w-full mt-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className=" flex flex-col  sm:flex-row  lg:hidden justify-center gap-4 px-4 sm:px-24 my-4">
                    
                      <button
                        onClick={() => addToCart(item)}
                        className="px-4 lg:py-3 py-2 rounded-md flex justify-center items-center text-[16px] font-semibold bg-lightBlue-700 text-white border hover:bg-white hover:text-lightBlue-700 border-lightBlue-700  xl:w-[300px] lg:w-[200px] w-full"
                      >
                        Move to Cart
                      </button>
                    
                      <button
                        onClick={() => removeFromWishlist(item?._id)}
                        className="px-4 lg:py-3 py-2 rounded-md flex justify-center items-center text-[16px] font-semibold hover:bg-lightBlue-700 hover:text-white border bg-white text-lightBlue-700 border-lightBlue-700  xl:w-[300px] lg:w-[200px] w-full "
                      >
                        Remove
                      </button>
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-5">
            <div className="flex flex-col justify-center items-center">
              <p className="text-[30px] font-semibold mt-5">
                Your wishlist is empty
              </p>
              <div className="mt-5">
                <Image
                  src="/images/empty-cart.jpg"
                  alt="Empty cart"
                  width={500}
                  height={400}
                />
              </div>
              <Link href="/ ">
                <div className="mt-5 text-[18px] font-medium  cursor-pointer px-6 py-2 bg-black rounded-md text-white">
                  Continue watching products
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(UserWishlist), { ssr: false });
