import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNavbar from "../userNavbar";
import Image from "next/image";
import Link from "next/link";

const userOrder = () => {

  const [allOrders, setAllOrders] = useState([]);
  const { token } = useSelector((state) => state.auth.userDetails || {});
  useEffect(() => {
    defaultOrder();
  }, []);

  const defaultOrder = () => {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };

    console.log(allOrders)

  return (
    <div>
      <UserNavbar />
      <div className="px-20">
        <h1 className="text-[30px] font-medium my-5">Order History</h1>
        <div className="p-5 bg-white border rounded-md">
        <div className="">
            {allOrders.products?.length > 0 && allOrders.products?.map((item, inx) => {
              return(
                <div
                key={inx}
                className="flex bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 my-7 hover:border-lightBlue-600 "
              >
               
                {item?.product?.images?.length > 0 &&
                  item?.product?.images?.map((img, inx) => (
                    <>
                      {item?.color == img?.color && (
                        <div className="w-[30%] py-2 px-4 cursor-pointer ">
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
   
                    <p className="text-[18px]  capitalize mt-2  flex gap-x-5 ">
                      Colors : {item?.color}
                      <p className="font-medium"> </p>
                    </p>
                  </div>
   
                  <div className="">
                    <p className="text-[18px]  flex capitalize  mt-2">
                      Qty:
                      <p className="px-2">
                        {item?.product?.quantity}
                      </p>
                    </p>
                    <p className="text-md capitalize mt-2">
                      Price : ₹ {item?.product?.price}
                    </p>
                  </div>
   
                  <div className="">
                    <p className="text-md  mt-2">
                      Payment Method :  {allOrders?.paymentIntent?.status}
                    </p>
   
                    <p className="text-md  mt-2 text-sky-600">
                      Delivered by: 
                    </p>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(userOrder), { ssr: false });
