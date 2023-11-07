import dynamic from "next/dynamic";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../userNavbar";

const Usercart = ({ getCartProduct, sessionCartProduct, token }) => {

  console.log(sessionCartProduct);
  
  // const allProduct = sessionCartProduct?.produc;
  const [customerID, setCustomerID] = useState(
    JSON.parse(localStorage.getItem("userID"))
  );

  const removeWishlist = async () => {
    const _id = customerID;
    try {
      const response = await axios
        .delete(
          "https://e-commerce-backend-brown.vercel.app/api/auth/empty-cart",
          {
            data: { _id: customerID },
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            defaultCustomer();
          } else {
            throw new Error("Failed to delete");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UserNavbar />

      {!token || token == undefined ? (
        <div className=" px-20">
          <div className="border rounded-lg bg-white p-5">
            <div className="flex justify-between">
              <div>
                <h1 className="text-[35px] font-semibold"> Your Cart</h1>
              </div>

              <button
                onClick={removeWishlist}
                className=" border p-1  rounded-lg hover:bg-[#F3F4F9]  mr-4 cursor-pointer"
              >
                <p className="text-[22px] mx-1 flex">
                  Clear Cart
                  <img src="cross.svg" className="w-7   mx-1" />
                </p>
              </button>
            </div>
            <hr className="my-5" />
            <div>
              {sessionCartProduct?.length>0  && sessionCartProduct?.map((item, inx) => (
                <div key={inx} className=" flex bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 my-7 hover:border-lightBlue-600 cursor-pointer ">
                {console.log(item)  }
                  <div>
                    <img
                      src="/img1.jpeg"
                      alt=""
                      className="rounded-[20px] "
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="bg-white px-10 pb-6 rounded-[20px] ">
                      <div className="flex justify-between items-center my-4">
                        <h6 className="text-[25px] font-semibold capi talize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden"></h6>
                      </div>

                      <p className="text-[18px]  flex capitalize  ">
                        {" "}
                        <p className="font-semibold px-2">
                          {" "}
                          {item?.product?.title}{" "}
                        </p>
                      </p>

                      <p className="text-[18px]  flex capitalize  ">
                        {" "}
                        <p className="font-semibold px-2">
                          {" "}
                          {item?.product?.description}{" "}
                        </p>
                      </p>
                      <p className="text-[18px]  flex capitalize  ">
                        Qty:{" "}
                        <p className="font-semibold px-2"> {item?.count} </p>
                      </p>
                      <p className="text-md font-semibold capitalize my-2 text-sky-600">
                        {" "}
                        Price : ₹ {item?.price}{" "}
                      </p>
                      <p className="text-[18px]  flex capitalize  ">
                        Regular Price :{" "}
                        <p className="font-semibold px-2">
                          {" "}
                          <del>₹{item?.product?.discountedPrice}</del>
                        </p>
                      </p>

                      <p className="text-[18px] flex capitalize my-2 ">
                        Category :{" "}
                        <p className="font-semibold px-2">
                          {" "}
                          {item?.product?.category}{" "}
                        </p>
                      </p>
                      <div className="flex">
                        {" "}
                        <h1 className="mt-1  mr-1 text-[18px]">Status : </h1>
                        <p className=" bg-green-200 p-1 px-2 text-center font-semibold rounded-md text-green-600 ">
                          Available
                        </p>
                      </div>
                      <p className="text-[18px]  capitalize my-2  flex gap-x-5 ">
                        Colors : {item?.color}
                      </p>
                    </div>
                    <div>
                      <img
                        src="cross.svg"
                        className="w-10 border p-1 rounded-xl hover:bg-[#F3F4F9] mt-4 mr-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className=" px-20">
          <div className="border rounded-lg bg-white p-5">
            <div className="flex justify-between">
              <div>
                <h1 className="text-[35px] font-semibold"> Your Cart</h1>
              </div>

              <button
                onClick={removeWishlist}
                className=" border p-1  rounded-lg hover:bg-[#F3F4F9]  mr-4 cursor-pointer"
              >
                <p className="text-[22px] mx-1 flex">
                  Clear Cart
                  <img src="cross.svg" className="w-7   mx-1" />
                </p>
              </button>
            </div>
            <hr className="my-5" />
            <div>
              {getCartProduct.map((item) => (
                <div className=" flex bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 my-7 hover:border-lightBlue-600 cursor-pointer ">
                  <div>
                    <img
                      src="/img1.jpeg"
                      alt=""
                      className="rounded-[20px] "
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="bg-white px-10 pb-6 rounded-[20px] ">
                      <div className="flex justify-between items-center my-4">
                        <h6 className="text-[25px] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden"></h6>
                      </div>

                      <p className="text-[18px]  flex capitalize  ">
                        {" "}
                        <p className="font-semibold px-2">
                          {" "}
                          {item?.product?.title}{" "}
                        </p>
                      </p>

                      <p className="text-[18px]  flex capitalize  ">
                        {" "}
                        <p className="font-semibold px-2">
                          {" "}
                          {item?.product?.description}{" "}
                        </p>
                      </p>
                      <p className="text-[18px]  flex capitalize  ">
                        Qty:{" "}
                        <p className="font-semibold px-2"> {item?.count} </p>
                      </p>
                      <p className="text-md font-semibold capitalize my-2 text-sky-600">
                        {" "}
                        Price : ₹ {item?.price}{" "}
                      </p>
                      <p className="text-[18px]  flex capitalize  ">
                        Regular Price :{" "}
                        <p className="font-semibold px-2">
                          {" "}
                          <del>₹{item?.product?.discountedPrice}</del>
                        </p>
                      </p>

                      <p className="text-[18px] flex capitalize my-2 ">
                        Category :{" "}
                        <p className="font-semibold px-2">
                          {" "}
                          {item?.product?.category}{" "}
                        </p>
                      </p>
                      <div className="flex">
                        {" "}
                        <h1 className="mt-1  mr-1 text-[18px]">Status : </h1>
                        <p className=" bg-green-200 p-1 px-2 text-center font-semibold rounded-md text-green-600 ">
                          Available
                        </p>
                      </div>
                      <p className="text-[18px]  capitalize my-2  flex gap-x-5 ">
                        Colors : {item?.color}
                      </p>
                    </div>
                    <div>
                      <img
                        src="cross.svg"
                        className="w-10 border p-1 rounded-xl hover:bg-[#F3F4F9] mt-4 mr-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default dynamic(() => Promise.resolve(Usercart), { ssr: false });