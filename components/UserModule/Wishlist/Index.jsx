import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const UserWishlist = ({ getWishProduct, refreshData }) => {
  const { token } = useSelector((state) => state.auth.userDetails || null);

  const [isLoading, setLoading] = useState(false);
  const [productColor, setProductColor] = useState("");
  const [isShowErr, setShowErr] = useState(false);
  let [productQuantity, setProductQuantity] = useState(1);
  const [isAddIntoCart, setAddIntoCart] = useState(false);

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
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("Request error:", error);
      });
  };

  const handleCounter = () => {
    if (productQuantity !== -1) {
      setProductQuantity((productQuantity += 1));
    }
  };
  const handleMinusCounter = () => {
    if (productQuantity > 1) {
      setProductQuantity((productQuantity -= 1));
    }
  };

  const handleColorChange = (e) => {
    setProductColor(e.target.value);
  };

  const addToCart = (data) => {
    if (!productColor) {
      setShowErr(true);
      setLoading(false);
    } else{
      const options = {
        method: "POST",
        url: "https://e-commerce-backend-brown.vercel.app/api/auth/cart",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/2023.5.8",
          "authorization": token,
        },
        data: {
          cart: [
            {
              _id: data?._id,
              count: productQuantity || 1,
              color: productColor,
            },
          ],
        },
      };
  
      axios
        .request(options)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            setAddIntoCart(true);
            refreshData();
          } else {
            toast.error("Failed, Token is expired")
            return;
          }
        })
        .catch(function (error) {
          console.error(error);
          toast.error("Failed, Token is expired")
        });
    }
 
  };


  const removeFromWishlist =(id) => {
    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/product/addToWishlist",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        "authorization": token,
      },
      data: {
        prodId: id,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          refreshData();
        } else {
          return;
        }
      })
      .catch(function (error) {
        toast.error("Failed. try again!");
      });
  }

  return (
    <>
      <div className="px-20 ">
          {
            getWishProduct?.length>0 ?
        <div className="border rounded-lg bg-white p-5">
          <div className="flex justify-between">
            <div>
              <h1 className="text-[35px] font-semibold px-2"> Your Wishlist</h1>
            </div>

            <button
              onClick={handleDelete}
              className=" border p-1  rounded-lg hover:bg-[#F3F4F9]  mr-4 cursor-pointer"
            >
              <p className="text-[22px] mx-1 flex">
                Clear Wishlist
                <img src="cross.svg" className="w-7   mx-1" />
              </p>
            </button>
          </div>
          <hr className="my-5" />
          <div className="flex flex-col-reverse">
          { getWishProduct?.map((item, inx) => (
              <div
                className=" flex bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 my-7 hover:border-lightBlue-600 cursor-pointer "
                key={inx}
              >
                <div>
                  {item?.images?.length > 0 ? (
                    item?.images?.map((img, inxx) => (
                      <div className=" p-5" key={inxx}>
                        <Link href={`/product-details/${item?._id}`}>
                          <Image
                            src={img?.url}
                            alt=""
                            className=" mx-auto rounded-[20px]"
                            width={300}
                            height={300}
                          />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="h-[400px]">
                      <Image
                        src="/img1.jpeg"
                        alt=""
                        className=" mx-auto rounded-[20px] h-[400px] "
                        width={400}
                        height={400}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-around items-center w-full">
                  <div className="bg-white px-10 pb-6 rounded-[20px] ">
                    <div className="flex justify-between items-center my-4">
                      <h6 className="text-[25px] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden"></h6>
                    </div>

                    <p className="text-[18px]  flex capitalize  ">
                      <p className="font-semibold text-[26px]">
                        {" "}
                        {item?.title}{" "}
                      </p>
                    </p>

                    <p className="text-md font-semibold capitalize my-2 text-sky-600">
                      Price : ₹ {item?.price}
                    </p>
                    <p className="text-[18px]  flex capitalize  ">
                      Regular Price :
                      <p className="font-semibold px-2">
                        <del>₹{item?.discountedPrice}</del>
                      </p>
                    </p>

                    <div className="flex text-left mt-4">
                      <div className="w-[160px] text-[20px] font-normal leadinng-[28px]">
                        Quantity :
                      </div>
                      <div className="text-[18px] xl:text-[20px] font-semibold leadinng-[28px] capitalize flex">
                        <p className="font-semibold px-2">{productQuantity}</p>
                        <button
                          onClick={handleMinusCounter}
                          className="border border-black px-3 ml-3"
                        >
                          -
                        </button>
                        <button
                          onClick={handleCounter}
                          className="border border-black px-3 ml-3"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <h1 className="mt-1  mr-1 text-[18px]">Status : </h1>
                      <p className=" bg-green-200 p-1 px-2 text-center font-semibold rounded-md text-green-600 ">
                        Available
                      </p>
                    </div>
                    <div className="flex text-left mt-4">
                      <div className="text-[18px] font-normal leadinng-[28px]">
                        Colors :
                      </div>
                      <div className="ml-4">
                        <div className="w-[250px]">
                          <select
                            onChange={handleColorChange }
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
                        {isShowErr && (
                          <p className="text-sm font-medium py-1 bg-red-100 text-red-600 px-4 rounded mt-2 w-[250px]">
                            Please choose color
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="">
                    {
                      isAddIntoCart ? 
                     <Link href="/cart">
                      <button
                        className="px-4 lg:py-3 py-2 rounded-md flex justify-center items-center text-[16px] font-semibold hover:bg-lightBlue-700 hover:text-white border bg-white text-lightBlue-700 border-lightBlue-700 lg:w-[300px] w-full"
                    >
                      Go to Cart
                    </button>
                     </Link> :
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 lg:py-3 py-2 rounded-md flex justify-center items-center text-[16px] font-semibold bg-lightBlue-700 text-white border hover:bg-white hover:text-lightBlue-700 border-lightBlue-700 lg:w-[300px] w-full"
                  >
                    Add to Cart
                  </button>
                    }
                    
                    <button
                    onClick={()=>removeFromWishlist(item?._id)}
                        className="px-4 lg:py-3 py-2 rounded-md flex justify-center items-center text-[16px] font-semibold hover:bg-lightBlue-700 hover:text-white border bg-white text-lightBlue-700 border-lightBlue-700 lg:w-[300px] w-full mt-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        :
            <div className="py-5">
              <div className="flex flex-col justify-center items-center">
                <p className="text-[30px] font-semibold mt-5">Your wishlist is empty</p>
                <div className="mt-5">
                   <Image src="/images/empty-cart.jpg" alt="Empty cart" width={500} height={400}/>
                </div>
                <Link href="all-product">
                <div className="mt-5 text-[18px] font-medium  cursor-pointer px-6 py-2 bg-black rounded-md text-white">Continue watching products</div>
                </Link>
              </div>
            </div>
          }
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(UserWishlist), { ssr: false });
