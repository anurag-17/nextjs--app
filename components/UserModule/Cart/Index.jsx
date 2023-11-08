import dynamic from "next/dynamic";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../userNavbar";
import { toast } from "react-toastify";
import Image from "next/image";

const Usercart = ({ getCartProduct, sessionCartProduct, token, refreshData }) => {


  const [customerID, setCustomerID] = useState(
    JSON.parse(localStorage.getItem("userID")) || null
  );


  let subtotal = 0;
  const [grandTotal, setGrandTotal] = useState(0);


  useEffect(()=> { updateGrandTotal()},[getCartProduct])

  console.log(grandTotal);

  
    // Function to calculate the subtotal for each product
    const calculateSubtotal = (item) => {
      return item?.price * item?.count;
    };
  
    // Function to update the grand total
    const updateGrandTotal = () => {
      const subtotalArray = getCartProduct?.map((item) => calculateSubtotal(item));
      console.log(subtotalArray);
      
      const total = subtotalArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setGrandTotal(total);
    };

  const removeWishlist = async () => {
    if (!token || token === undefined) {
      sessionStorage.removeItem("addToCart");
      refreshData()
    } else {
      try {
        await axios
          .delete(
            "https://e-commerce-backend-brown.vercel.app/api/auth/empty-cart",
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                "authorization": token,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              toast.success("Successfully clear cart !")
              refreshData()
            } else {
              throw new Error("Failed to delete");
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromCart = async (id) => {
      console.log(token);

    if (!token || token === undefined) {
      const sessionCart = JSON.parse(sessionStorage.getItem("addToCart")) || [];
      const filterCart = sessionCart?.filter((item)=>(item?._id !== id) )
      sessionStorage.setItem("addToCart", JSON.stringify(filterCart));
      refreshData()
    }
    else{
      try {
        
        const options = {
          method: "POST",
          url: "https://e-commerce-backend-brown.vercel.app/api/auth/remove-cart",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "insomnia/2023.5.8",
            "authorization": token,
          },
          data: { productId: id },
        };

        await axios(options)
          .then((response) => {
            if (response.status === 200) {
              toast.success("Remove product from cart !")
              refreshData()
            } else {
              throw new Error("Failed to delete");
            }
          });
      } catch (error) {
        console.error(error);
      }
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
                className=" border   rounded-lg hover:bg-lightBlue-100 mr-4 cursor-pointer"
              >
                <p className="text-[20px] mx-1 flex font-medium px-4">
                  Clear Cart
                  {/* <img src="cross.svg" className="w-7   mx-1" /> */}
                </p>
              </button>
            </div>
            <hr className="my-5" />
            <div>
              {sessionCartProduct?.length > 0 &&
                sessionCartProduct?.map((item, inx) => (
                 <>
                  <div
                    key={inx}
                    className="flex bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 my-7 py-3 px-4 hover:border-lightBlue-600 cursor-pointer "
                  >
                    {item?.product?.images?.length > 0 ? (
                      item?.product?.images?.map((img, inx) => (
                        <div className="w-[30%]">
                          <Image
                            key={inx}
                            src={img?.url}
                            alt=""
                            className="rounded-[20px] "
                            width={400}
                            height={400}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="w-[30%]">
                        <Image
                          src="/img1.jpeg"
                          alt=""
                          className=" rounded-[20px] "
                          width={400}
                          height={400}
                        />
                      </div>
                    )}
                      
                        <div className="grid grid-cols-3 items-center justify-center w-[70%] ">
                          
                          <div className="">
                            <p className="text-[18px]  flex capitalize ">
                            <p className="font-semibold text-[24px]">
                              {item?.product?.title}
                            </p>
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
                              <p className="font-semibold px-2">{item?.count}  </p>
                            </p>
                          </div>

                          <div className="">
                            <p className="text-md font-semibold capitalize mt-2">
                              Price : ₹ {item?.price}
                            </p>

                            <p className="text-md font-semibold capitalize mt-2 text-sky-600">
                              Total Price : ₹ {Number(item?.price * item?.count)}
                            </p>

                          </div>

                      </div>
                      <div onClick={() => removeFromCart(item?._id)} className="">
                        <img
                          src="cross.svg"
                          className="w-10 border p-1 rounded-xl hover:bg-[#F3F4F9] mt-4 mr-4 cursor-pointer"
                        />
                      </div>
                  </div>
                 </>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {getCartProduct?.length > 0 ? (
            <div className=" px-20">
              <div className="border rounded-lg bg-white p-5">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-[35px] font-semibold">
                      {" "}
                      Your Cart ( {getCartProduct?.length} items){" "}
                    </h1>
                  </div>

                  <button
                    onClick={removeWishlist}
                    className=" border p-1  rounded-lg hover:bg-[#F3F4F9]  mr-4 cursor-pointer"
                  >
                    <p className="text-[16px] mx-1 flex font-semibold">
                      Clear Cart
                      {/* <img src="cross.svg" className="w-7   mx-1" /> */}
                    </p>
                  </button>
                </div>
                <hr className="my-5" />
                <div>
                  {getCartProduct?.length > 0 &&
                    getCartProduct?.map((item, inx) => {
                      // const itemTotalPrice = item?.price * item?.count;
                      // subtotal += itemTotalPrice;
                      return(
                      <div
                      key={inx}
                      className="flex bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 my-7 hover:border-lightBlue-600 cursor-pointer "
                    >
                        
                        {item?.product?.images?.length > 0 ? (
                      item?.product?.images?.map((img, inx) => (
                        <div className="w-[30%]">
                          <Image
                            key={inx}
                            src={img?.url}
                            alt=""
                            className="rounded-[20px] "
                            width={400}
                            height={400}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="w-[30%]">
                        <Image
                          src="/img1.jpeg"
                          alt=""
                          className=" rounded-[20px] "
                          width={400}
                          height={400}
                        />
                      </div>
                    )}
                          <div className="grid grid-cols-3 items-center justify-center w-[70%] ">
                            
                            <div className="">
                              <p className="text-[18px]  flex capitalize ">
                              <p className="font-semibold text-[24px]">
                                {item?.product?.title}
                              </p>
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
                                <p className="font-semibold px-2">{item?.count}  </p>
                              </p>
                            </div>
  
                            <div className="">
                              <p className="text-md font-semibold capitalize mt-2">
                                Price : ₹ {item?.price}
                              </p>
  
                              <p className="text-md font-semibold capitalize mt-2 text-sky-600">
                                Total Price : ₹ {item?.price * item?.count}
                              </p>
  
                            </div>
  
                        </div>
                        <div onClick={() => removeFromCart(item?.product?._id)} className="">
                          <img
                            src="cross.svg"
                            className="w-10 border p-1 rounded-xl hover:bg-[#F3F4F9] mt-4 mr-4 cursor-pointer"
                          />
                        </div>
                    </div>
                    )}
                    )}
                </div>
                <div className="grid grid-cols-2 py-4">
                  <div className=""></div>
                  <div className="grid grid-cols-2">
                    <div className=""></div>
                    <div className="text-[18px] font-normal">
                      <div className="flex">
                        <p className="">Subtotal : ₹ {grandTotal} </p>
                        <p className="px-2"> {subtotal} </p>
                      </div>
                      <div className="flex mt-2 gap-x-10">
                        <p className=""> Sales Tax : </p>
                        <p className=""> </p>
                      </div>
                      <div className="flex mt-2 gap-x-10">
                        <p className=""> Shipping Charge : </p>
                        <p className=""> ₹ 75 </p>
                      </div>
                      <div className="flex mt-2 gap-x-10">
                        <p className=""> Grand Total : </p>
                        <p className=""> ₹ {grandTotal + 75} </p>
                      </div>
                      <div className="mt-5">
                        <button className="px-5 py-2 rounded bg-lightBlue-500 text-white font-semibold hover:bg-lightBlue-700 w-[50%]">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-5">
              <div className="flex flex-col justify-center items-center">
                <p className="text-[30px] font-semibold mt-5">Your cart is empty</p>
                <div className="mt-2">
                   <Image src="/images/empty.svg" alt="Empty cart" width={500} height={400}/>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default dynamic(() => Promise.resolve(Usercart), { ssr: false });
