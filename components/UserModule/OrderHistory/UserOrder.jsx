import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import UserNavbar from "../userNavbar";
import Star from "../../../public/svg/star.svg";
import ReviewPopup from "./ReviewModal";
import { ToastContainer } from "react-toastify";
import WebsiteLoader from "../../websiteLoader";

const userOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isOpenReview, setOpenReview] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [ratingProd, setRatingProd] = useState("");
  const { token } = useSelector((state) => state.auth.userDetails || {});

  console.log(allOrders)
  useEffect(() => {
    defaultOrder();
  }, []);

  const defaultOrder = () => {
    setLoading(true)
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/auth/get-orders",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setAllOrders(response?.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false)
      });
  };

  const handleOpen = (prod) => {
    setOpenReview(true);
    setRatingProd(prod);
  };

  const closeModal = () => {
    setOpenReview(false);
  };

  return (
    <>
      {isLoading && <WebsiteLoader />}
      <div>
        <ToastContainer />
        <UserNavbar />
        <div className="container mx-auto">

          <div className="">
            {
              allOrders?.products?.length > 0 &&
              <>
                <div className="p-5 bg-white border rounded-md w-full">
                  <h1 className="text-[22px] xl:text-[25px] 2xl:text-[30px] font-medium my-5 w-full mx-4">Order History</h1>
                  {allOrders?.products?.map((item, inx) => {
                    return (
                      <div
                        key={inx}
                        className="flex gap-x-10   lg:gap-x-20 justify-between xl:justify-center bg-white  border-[2px] border-gray  hover:rounded-[10px] m-0 lg:m-4 my-7 hover:border-lightBlue-600 "
                      >
                        {item?.product?.images?.length > 0 &&
                          item?.product?.images?.map((img, inx) => (
                            <>
                              {item?.color == img?.color && (
                                <div className=" py-2 px-4 cursor-pointer ">
                                  <Link
                                    href={`/product-details/${item?.product?._id}`}
                                  >
                                    <Image
                                      key={inx}
                                      src={img?.url[0]}
                                      alt=""
                                      className="rounded-[20px] w-20 xl:w-20 2xl:w-28 "
                                      width={150}
                                      height={300}
                                    />
                                  </Link>
                                </div>
                              )}
                            </>
                          ))}

                        <div className="grid grid-cols-3 items-center justify-center w-[85%] xl:w-[70%] ">
                          <div className="">
                            <Link href={`/product-details/${item?.product?._id}`}>
                              <p className="flex capitalize cursor-pointer font-semibold text-[16px]  lg:text-[20px] xl:text-[22px] 2xl:text-[24px] ">
                                {item?.product?.title}
                              </p>
                            </Link>

                            <p className="text-[14px] xl:text-[14px] 2xl:text-[16px] font-normal  capitalize mt-2  flex gap-x-5 ">
                              Colors : {item?.color}
                              <p className="font-medium"> </p>
                            </p>
                          </div>

                          <div className="">
                            <p className="text-[14px] xl:text-[14px] 2xl:text-[16px] font-normal  flex capitalize  mt-2">
                              Qty:
                              <p className="px-2">{item?.count}</p>
                            </p>
                            <p className="text-[14px] xl:text-[14px] 2xl:text-[16px] capitalize mt-2">
                              Price : ₹ {item?.product?.price}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3">
                            <p className="text-[14px] xl:text-[14px] 2xl:text-[16px] font-normal">Delivered by:</p>
                            <p className="text-[14px] xl:text-[14px] 2xl:text-[16px]">
                              Payment Method : {allOrders?.paymentIntent?.status}
                            </p>

                            <div
                              className="text-[14px] xl:text-[14px] 2xl:text-[16px] flex font-semibold gap-x-3 text-[#2874f0] cursor-pointer"
                              onClick={() => handleOpen(item)}
                            >
                              <Image
                                src="/svg/star.svg"
                                alt="star"

                                height={20}
                                width={20}
                              />
                              Rate and Review Product
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  )}
                </div>
              </>
            }
            {

              !(allOrders) &&
              <div className="py-[80px] flex flex-col justify-center items-center">
                <p className="text-[28px] font-medium mb-8">No order has been created yet</p>
                <Link href="/user-product">
                  <button
                    className={`px-5 py-3 rounded bg-lightBlue-700 text-white font-semibold hover:bg-lightBlue-600 w-full md:w-[300px] `}
                  >
                    View our products
                  </button>
                </Link>
              </div>
            }

          </div>
        </div>

        {/* --------------  Review modal    --------------------- */}
        <Transition appear show={isOpenReview} as={Fragment}>
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
                    <ReviewPopup closeModal={closeModal} ratingProd={ratingProd} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(userOrder), { ssr: false });
