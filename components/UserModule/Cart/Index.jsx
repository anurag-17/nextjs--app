import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import UserNavbar from "../userNavbar";
import AddressModal from "../Address/addressPopup";
import { useDispatch, useSelector } from "react-redux";
import BuyProduct from "../../razorpay/BuyProduct";
import ShippingAddress from "../Address/shippingAddress";
import { setShippingDetails } from "../../../redux/slices/orderSlice";
import PaymentOption from "./paymentOption";
import TextLoader from "../../../utlis/textLoader";

const Usercart = ({ getCartProduct, sessionCartProduct, refreshData }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.userDetails || {});
  const [isOpenAdd, setOpenAdd] = useState(false);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [userAddress, setUserAddress] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userMail, setUserMail] = useState("");

  const [orderShippingDetails, setOrderShippingDetails] = useState({});

  const [isCartUpdated, setCartUpdated] = useState(false);
  const [isShowPaymentOtn, setShowPaymentOtn] = useState(false);
  const [isOpenLogin, setOpenLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [activeIndex, setActiveIndex] = useState(1);


  useEffect(() => {
    setOrderShippingDetails(JSON.parse(localStorage.getItem("shippingDet")));
    setUserAddress(JSON.parse(localStorage.getItem("userAdd")));
    setUserNumber(JSON.parse(localStorage.getItem("userNum")));
    setUserMail(JSON.parse(localStorage.getItem("userMail")));

    if (getCartProduct?.cartTotal < 500) setShippingCharge(75);
  }, []);

  const openAddModal = () => {
    setOpenAdd(true);
  };

  const closeModal = () => {
    setOpenAdd(false);
  };

  const removeWishlist = async () => {
    if (!token || token === undefined) {
      sessionStorage.removeItem("addToCart");
      refreshData();
    } else {
      try {
        await axios
          .delete(
            "https://e-commerce-backend-brown.vercel.app/api/auth/empty-cart",
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                authorization: token,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              refreshData();
            } else {
              toast.error("Failed to delete");
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromCart = async (id) => {
    if (!token || token === 200) {
      const sessionCart = JSON.parse(sessionStorage.getItem("addToCart")) || [];
      const filterCart = sessionCart?.filter((item) => item?._id !== id);
      sessionStorage.setItem("addToCart", JSON.stringify(filterCart));
      refreshData();
    } else {
      try {
        const options = {
          method: "POST",
          url: "https://e-commerce-backend-brown.vercel.app/api/auth/remove-cart",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "insomnia/2023.5.8",
            authorization: token,
          },

          data: { productId: id },
        };
        await axios(options).then((response) => {
          if (response.status === 200) {
            toast.success("Remove product from cart !");
            refreshData();
          } else {
            throw new Error("Failed to delete");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateCart = async ({ shippingDetails }) => {
    const options = {
      method: "PUT",
      url: "https://e-commerce-backend-brown.vercel.app/api/auth/update-cart",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        authorization: token,
      },
      data: {
        shippingDetails: shippingDetails,
      },
    };

    dispatch(setShippingDetails(shippingDetails));
    // closeDrawer();
    setCartUpdated(true);
    axios
      .request()
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Address updated successfully!");
          // closeDrawer();
          setCartUpdated(true);
        } else {
          return;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handlePaymentOption = async () => {
    setShowPaymentOtn(true);
  };

  const handleOptionChange = ({ value }) => {
    setPaymentOption(value);
  };

  const handlePlaceOrder = () => {
    setLoading(true)
    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/auth/cart/cash-order",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        authorization: token,
      },
      data: {
        COD: true,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Order created successfully!");
          setLoading(false)
          refreshData();
        } else {
          setLoading(false)
          return;
        }
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error);
      });
  };


  const handleClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));

    // Disable previous accordions based on the clicked index
    if (index === 2) {
      setActiveIndex(2); // Disable accordion 1 when opening accordion 2
    } else if (index === 3) {
      setActiveIndex(3); // Disable accordions 1 and 2 when opening accordion 3
    } else if (index === 4) {
      setActiveIndex(4); // Disable accordions 1, 2, and 3 when opening accordion 4
    }
  };
  const handleCartOrder = () => {
    setActiveIndex(2);
  };

  return (
    <>
      {/* <TextLoader text="ctrlF5..."/>; */}
      <ToastContainer />
      <UserNavbar />

      {!token || token == undefined ? (
        <div className=" px-20">
          <div className="border rounded-lg bg-white p-5">
            <div>
              {sessionCartProduct?.length > 0 ? (
                sessionCartProduct?.map((item, inx) => (
                  <>
                    <div className="flex justify-between">
                      <div>
                        <h1 className="text-[35px] font-semibold">
                          {" "}
                          Your Cart{" "}
                        </h1>
                      </div>

                      <button
                        onClick={removeWishlist}
                        className="  mr-4 cursor-pointer"
                      >
                        <p className="text-[20px] mx-1 flex font-medium px-5 border py-2  rounded-lg hover:bg-lightBlue-100">
                          Clear Cart
                        </p>
                      </button>
                    </div>
                    <div
                      key={inx}
                      className="flex bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 my-7 py-3 px-4 hover:border-lightBlue-600 cursor-pointer "
                    >
                      {item?.product?.images?.length > 0 &&
                        item?.product?.images?.map((img, inx) => (
                          <>
                            {item?.color == img?.color && (
                              <div className="w-[30%] py-2 px-4">
                                <Link
                                  href={`/product-details/${item?.product?._id}`}
                                >
                                  <Image
                                    key={inx}
                                    src={img?.url[0]}
                                    alt=""
                                    className="rounded-[20px] "
                                    width={250}
                                    height={300}
                                  />
                                </Link>
                              </div>
                            )}
                          </>
                        ))}

                      <div className="grid grid-cols-3 items-center justify-center w-[70%] ">
                        <div className="">
                          <p className="text-[18px]  flex capitalize ">
                            <p className="font-semibold text-[24px]">
                              {item?.product?.title}
                            </p>
                          </p>
                          <p className=" text-[18px]">
                            Brand : {item?.product?.brand}
                          </p>

                          <div className="flex mt-2">
                            <h1 className=" mr-1 text-[18px]">Status : </h1>
                            <p className=" bg-green-200 p-1 px-2 text-center font-semibold rounded-md text-green-600 ">
                              Available
                            </p>
                          </div>
                          <p className="text-[18px]  capitalize mt-2  flex gap-x-5 ">
                            Colors :
                            <p className="font-medium"> {item?.color} </p>
                          </p>
                        </div>

                        <div className="">
                          <p className="text-[18px]  flex capitalize  mt-2">
                            Qty:
                            <p className="font-semibold px-2">{item?.count} </p>
                          </p>
                        </div>

                        <div className="">
                          <del className="text-md font-semibold capitalize mt-2">
                            Price : ₹ {item?.product?.price}
                          </del>

                          <p className="text-md font-semibold capitalize mt-2 text-sky-600">
                            Offer Price : ₹{" "}
                            {Number(
                              item?.product?.discountedPrice * item?.count
                            )}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => removeFromCart(item?._id)}
                        className=""
                      >
                        <img
                          src="cross.svg"
                          className="w-10 border p-1 rounded-xl hover:bg-[#F3F4F9] mt-4 mr-4 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 py-4">
                      <div className=""></div>

                      <div className="grid grid-cols-2">
                        <div className=""></div>
                        <div className="my-6">
                          <div className="flex">
                            <p className="w-[200px]">Subtotal : </p>
                            <p className="text-right w-[150px]  bg-lightBlue-50 px-2  py-1 rounded">
                              ₹ {getCartProduct?.cartTotal}
                            </p>
                          </div>
                        </div>
                        <div className=""></div>
                        <div className="">
                          <button
                            className={`px-5 py-2 rounded bg-lightBlue-700 text-white font-semibold hover:bg-lightBlue-600 w-[100%] ${
                              isCartUpdated ? "bg-lightBlue-200" : ""
                            }`}
                            onClick={() => setOpenLogin(true)}
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <div className="py-5">
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-[30px] font-semibold mt-5">
                      Your cart is empty
                    </p>
                    <div className="mt-2">
                      <Image
                        src="/images/empty.svg"
                        alt="Empty cart"
                        width={500}
                        height={400}
                      />
                    </div>
                  </div>
                  <Link href="/user-product">
                    <div className="mb-6 mt-14">
                      <button className="px-6 py-3 flex justify-center items-center rounded-md bg-black text-white font-medium mx-auto ">
                        Continue Shopping
                      </button>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {getCartProduct?.products?.length > 0 ? (
            <>
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 justify-center gap-x-10 mt-[20px]">
                  <div className="md:col-span-3 ">
                    {/*----------- Accordian 1---------*/}

                    {activeIndex === 1 && (
                      <div className="mb-4">
                        <div
                          className="flex justify-between items-center bg-white cursor-pointer rounded p-5"
                          onClick={() => handleClick(1)}
                        >
                          <div>
                            <h1 className="text-[28px] font-semibold">
                              Your Cart ( {getCartProduct?.products?.length}{" "}
                              items )
                            </h1>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <button
                              onClick={removeWishlist}
                              className=" border p-1 rounded-lg hover:bg-[#F3F4F9] mr-4 cursor-pointer h-[48px] px-6"
                            >
                              <p className="text-[16px] mx-1 flex font-semibold">
                                Clear Cart
                              </p>
                            </button>
                          </div>
                          {/* <div>{activeIndex === 1 ? "▲" : "▼"}</div>   */}
                        </div>

                        {/*----------- user cart ---------*/}
                        {activeIndex === 1 && (
                          <>
                            <div className="flex flex-col gap-3 mt-[20px]">
                              {getCartProduct?.products?.length > 0 &&
                                getCartProduct?.products?.map((item, inx) => {
                                  return (
                                    <div
                                      key={inx}
                                      className="flex bg-white  border-[2px] border-gray  hover:rounded-[10px] gap-20  hover:border-lightBlue-600 "
                                    >
                                      {item?.product?.images?.length > 0 &&
                                        item?.product?.images?.map(
                                          (img, inx) => (
                                            <>
                                              {item?.color == img?.color && (
                                                <div className=" p-4 cursor-pointer ">
                                                  <Link
                                                    href={`/product-details/${item?.product?._id}`}
                                                  >
                                                    <Image
                                                      key={inx}
                                                      src={img?.url[0]}
                                                      alt=""
                                                      className="rounded-[20px] "
                                                      width={120}
                                                      height={200}
                                                    />
                                                  </Link>
                                                </div>
                                              )}
                                            </>
                                          )
                                        )}

                                      <div className="grid grid-cols-3 items-center justify-center w-[70%] ">
                                        <div className="">
                                          <Link
                                            href={`/product-details/${item?.product?._id}`}
                                          >
                                            <p className="flex capitalize cursor-pointer font-semibold text-[24px] ">
                                              {item?.product?.title}
                                            </p>
                                          </Link>

                                          <p className=" text-[18px]">
                                            Brand : {item?.product?.brand}
                                          </p>

                                          <div className="flex mt-2">
                                            <h1 className=" mr-1 text-[18px]">
                                              Status :{" "}
                                            </h1>
                                            <p className=" bg-green-200 p-1 px-2 text-center font-semibold rounded-md text-green-600 ">
                                              Available
                                            </p>
                                          </div>

                                          <p className="text-[18px]  capitalize mt-2  flex gap-x-5 ">
                                            Colors : {item?.color}
                                            <p className="font-medium"> </p>
                                          </p>
                                        </div>

                                        <div className="">
                                          <p className="text-[18px]  flex capitalize  mt-2">
                                            Qty:
                                            <p className="font-semibold px-2">
                                              {item?.count}
                                            </p>
                                          </p>
                                        </div>

                                        <div className="">
                                          <p className="text-md font-semibold capitalize mt-2">
                                            Price : ₹ {item?.price}
                                          </p>

                                          <p className="text-md font-semibold capitalize mt-2 text-sky-600">
                                            Total Price : ₹{" "}
                                            {item?.price * item?.count}
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        onClick={() =>
                                          removeFromCart(item?.product?._id)
                                        }
                                        className=""
                                      >
                                        <img
                                          src="cross.svg"
                                          className="w-10 border p-1 rounded-xl hover:bg-[#F3F4F9] mt-4 mr-4 cursor-pointer"
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            <div className="text-right">
                              <button
                                className={`px-[40px] py-2 mt-5 rounded bg-lightBlue-700 text-white font-semibold hover:bg-lightBlue-600`}
                                onClick={handleCartOrder}
                              >
                                Place order
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                      {/*----------- Accordian 2---------*/}
                      {activeIndex === 2 && (
                        <div className="mb-4">
                          <div
                            className="flex justify-between items-center bg-white rounded p-5 cursor-pointer"
                            onClick={() => handleClick(2)}
                          >
                            <div className="text-[22px] font-medium">
                              Shipping Address
                            </div>
                            <div>{activeIndex === 2 ? "▲" : "▼"}</div>
                          </div>

                          {/*----------- Shipping Address ---------*/}
                          {activeIndex === 2 && (
                            <>
                              <div className="flex justify-between pr-[50px] py-[20px]">
                                <div className="flex flex-col px-[20px]">
                                  <p className=" text-[18px] font-normal">
                                    {orderShippingDetails?.address}
                                  </p>
                                  <p className="text-[18px] font-normal">
                                    {orderShippingDetails?.number}
                                  </p>
                                  <p className="text-[18px] font-normal">
                                    {orderShippingDetails?.email}
                                  </p>

                                  <button
                                    type="button"
                                    className={`px-[40px] py-2 mt-5 rounded bg-lightBlue-700 text-white font-semibold  hover:bg-lightBlue-600 flex flex-col w-full md:w-[300px] justify-center items-center text-center`}
                                    onClick={() => handleClick(3)}
                                  >
                                    Deliver Here
                                  </button>
                                </div>
                                <div className="">
                                  <p
                                    className="underline text-[18px] font-medium cursor-pointer"
                                    onClick={openAddModal}
                                  >
                                    Edit
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/*----------- Accordian 3---------*/}
                      {activeIndex === 3 && (
                        <div className="mb-4">
                          <div
                            className="flex justify-between items-center bg-white rounded p-5 cursor-pointer"
                            onClick={() => handleClick(3)}
                          >
                            <div className="text-[22px] font-medium">
                              Order Summary
                            </div>
                            <div>{activeIndex === 3 ? "▲" : "▼"}</div>
                          </div>

                          {/*----------- Shipping Address ---------*/}
                          {activeIndex === 3 && (
                            <>
                              <div className="flex flex-col gap-5 mt-[20px]">
                                {getCartProduct?.products?.length > 0 &&
                                  getCartProduct?.products?.map((item, inx) => {
                                    return (
                                      <div
                                        key={inx}
                                        className="flex bg-white  border-[2px] border-gray  hover:rounded-[10px] gap-3  hover:border-lightBlue-600 "
                                      >
                                        {item?.product?.images?.length > 0 &&
                                          item?.product?.images?.map(
                                            (img, inx) => (
                                              <>
                                                {item?.color == img?.color && (
                                                  <div className="w-[30%] p-4 cursor-pointer ">
                                                    <Image
                                                      key={inx}
                                                      src={img?.url[0]}
                                                      alt=""
                                                      className="rounded-[20px] "
                                                      width={180}
                                                      height={250}
                                                    />
                                                  </div>
                                                )}
                                              </>
                                            )
                                          )}

                                        <div className="grid grid-cols-3 items-center justify-center w-[70%] ">
                                          <div className="">
                                            <p className="flex capitalize cursor-pointer font-semibold text-[24px] ">
                                              {item?.product?.title}
                                            </p>

                                            <p className=" text-[18px]">
                                              Brand : {item?.product?.brand}
                                            </p>

                                            <div className="flex mt-2">
                                              <h1 className=" mr-1 text-[18px]">
                                                Status :{" "}
                                              </h1>
                                              <p className=" bg-green-200 p-1 px-2 text-center font-semibold rounded-md text-green-600 ">
                                                Available
                                              </p>
                                            </div>

                                            <p className="text-[18px]  capitalize mt-2  flex gap-x-5 ">
                                              Colors : {item?.color}
                                              <p className="font-medium"> </p>
                                            </p>
                                          </div>

                                          <div className="">
                                            <p className="text-[18px]  flex capitalize  mt-2">
                                              Qty:
                                              <p className="font-semibold px-2">
                                                {item?.count}
                                              </p>
                                            </p>
                                            <p className="text-md font-semibold capitalize mt-2">
                                              Price : ₹ {item?.product?.price}
                                            </p>

                                            <p className="text-md font-semibold capitalize mt-2 text-sky-600">
                                              Total Price : ₹{" "}
                                              {item?.price * item?.count}
                                            </p>
                                          </div>

                                          <div className="">
                                            Delivered by Fri Dec 1 |
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>

                              <div className="flex flex-col md:flex-row justify-between bg-white p-3 rounded mt-4">
                                <div className=""></div>
                                <button
                                  type="button"
                                  className={`px-[40px] py-2 rounded bg-lightBlue-700 text-white font-semibold  hover:bg-lightBlue-600 flex flex-col w-full md:w-[300px] justify-center items-center text-center`}
                                  onClick={() => handleClick(4)}
                                >
                                  Continue
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/*----------- Accordian 4---------*/}
                      {activeIndex === 4 && (
                        <div className="mb-4">
                          <div
                            className="flex justify-between items-center bg-white rounded p-5 cursor-pointer"
                            onClick={() => handleClick(4)}
                          >
                            <div className="text-[22px] font-medium">
                              Payment Options
                            </div>
                            <div>{activeIndex === 4 ? "▲" : "▼"}</div>
                          </div>

                          {/*----------- Accordian 4 content ---------*/}
                          {activeIndex === 4 && (
                            <>
                              <div className="px-4">
                                <>
                                  {/*---------- Payment Option ---------*/}

                                  <PaymentOption
                                    handleOptionChange={handleOptionChange}
                                    paymentOption={paymentOption}
                                  />

                                  {/*---------- if choose COD ---------*/}
                                  {paymentOption === "COD" && (
                                    <div className="my-8 text-right">
                                      <button
                                        className={`px-5 py-2  rounded bg-lightBlue-700 text-white font-semibold hover:bg-lightBlue-600 w-full md:w-[300px] ${
                                          isCartUpdated
                                            ? "bg-lightBlue-200"
                                            : ""
                                        }`}
                                        disabled={isLoading}
                                        onClick={handlePlaceOrder}
                                      >
                                       {isLoading ? "Loading .." : "Place Order"} 
                                      </button>
                                    </div>
                                  )}

                                  {/*---------- if choose another ---------*/}
                                  {paymentOption ===
                                    "Payment using razorpay" && (
                                    <div className="my-8 text-right">
                                      <BuyProduct
                                        buyItem={getCartProduct || []}
                                        grandTotal={
                                          getCartProduct?.cartTotal +
                                            shippingCharge || ""
                                        }
                                        orderShipDetails={
                                          orderShippingDetails || {}
                                        }
                                      />
                                    </div>
                                  )}
                                </>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                  </div>

                  {/*--------------------- right section ---------------------*/}

                  <div className="md:col-span-1  ">
                    <div className="pt-2 rounded-lg bg-white px-5 pb-[40px] ">
                      <h6 className="py-4 text-[20px] font-semibold border-b mb-8 ">
                        PRICE DETAILS
                      </h6>
                      <div className="text-[16px] font-normal flex flex-col gap-5 ">
                        <div className="flex justify-between">
                          <p className="">Subtotal : </p>
                          <p className="text-right w-[150px]  bg-lightBlue-50 px-2  py-1 rounded">
                            ₹ {getCartProduct?.cartTotal}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className=""> Shipping Charge : </p>
                          <p className="text-right w-[150px] px-2 py-1">
                            ₹ {shippingCharge}
                          </p>
                        </div>
                        <div className="h-[1px] bg-[#f3f3f3] my-4"></div>
                        <div className="flex justify-between text-[18px]  font-semibold">
                          <p className=""> Grand Total : </p>
                          <p className="text-right w-[150px] bg-lightBlue-50 px-2  py-1 rounded overflow-x">
                            ₹ {getCartProduct?.cartTotal + shippingCharge}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-5">
              <div className="flex flex-col justify-center items-center">
                <p className="text-[30px] font-semibold mt-5">
                  Your cart is empty
                </p>
                <div className="mt-2">
                  <Image
                    src="/images/empty.svg"
                    alt="Empty cart"
                    width={500}
                    height={400}
                  />
                </div>
                <Link href="/user-product">
                  <div className="mb-6 mt-14">
                    <button className="px-6 py-3 flex justify-center items-center rounded-md bg-black text-white font-medium mx-auto ">
                      Continue Shopping
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* --------------   Login modal    --------------------- */}
      <Transition appear show={isOpenLogin} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenLogin(false)}
        >
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
                    className="lg:text-[25px] text-[16px] font-semibold leading-6 text-gray-900 my-6"
                  >
                    Please login first to place your order
                  </Dialog.Title>

                  <div className="flex justify-between gap-x-5 pt-4">
                    <button
                      className="w-full border border-1 rounded-md border-lightBlue-400 text-lightBlue-700 hover:bg-lightBlue-200 text-sm  px-2 py-3 hover:border-none"
                      onClick={() => setOpenLogin(false)}
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

      {/* --------------   Address modal    --------------------- */}
      <Transition appear show={isOpenAdd} as={Fragment}>
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
                    className="lg:text-[25px] text-[16px] font-semibold leading-6 text-gray-900 "
                  >
                    Update your address
                  </Dialog.Title>
                  <AddressModal closeModal={closeModal} userAdd={userAddress} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default dynamic(() => Promise.resolve(Usercart), { ssr: false });
