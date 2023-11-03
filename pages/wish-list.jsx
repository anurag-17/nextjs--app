import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import TopBarCustomer from "./topBar-customer";
import UserNavbar from "../components/UserModule/userNavbar";

const WishList = () => {
  const [wishListItems, setWishListItems] = useState([]);
  const [addInWishlist, setAddInWishlist] = useState();
  let [productID, setProductID] = useState("");


  useEffect(() => {
    getAllWishList();
  }, []);

  const getAllWishList = async () => {
    const options = {
      method: "get",
      url: "https://e-commerce-backend-brown.vercel.app/api/auth/wishlist",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "User-Agent": "insomnia/2023.5.8",
      },
      // data: {
      //   _id: customerID,
      // },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setWishListItems(response?.data?.wishlist || []);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(productId, quantity);
      console.log("Product added to cart:", response);
      // Handle the response as needed, e.g., update the UI.
    } catch (error) {
      console.error("Failed to add the product to the cart:", error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  const handleWIshList = (id) => {
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
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          toast.success("Success. Product added successfully!");
          refreshData();
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Failed. Can not repeat product name!");
      });
  };

  return (
    <>
      <UserNavbar />
      <div className="px-20 ">
        <h2 className="text-[30px] font-medium my-5 ">Wish List </h2>

        <div className="w-[80%] mx-auto">
          <div className="grid lg:grid-cols-3  gap-7 mx-auto ">
            {wishListItems?.map((items, ix) => (
              <div
                className=" bg-white  border-[2px] border-gray rounded-[10px] m-4 hover:border-lightBlue-600"
                key={ix}
              >
                {/* <Link href={`/view-product/${items?._id}`}> */}
                <Image
                  src="/img1.jpeg"
                  alt=""
                  className=" mx-auto rounded-[20px] "
                  width={400}
                  height={400}
                />
                {/* </Link> */}
                <div className="bg-white px-4 pb-6 rounded-[20px]">
                  <div className="flex justify-between items-center my-4">
                    <h6 className="text-25px[] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden">
                      {items.title}
                    </h6>
                    <button onClick={() => handleWIshList(items?.id)}>
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
                    </button>
                  </div>

                  <p className="text-[16px]  capitalize  ">
                    Brand : {items.brand}
                  </p>
                  <p className="text-sm font-semibold capitalize my-2 text-sky-600">
                    Offer price : {items.discountedPrice} <br />
                  </p>
                  <del className="text-sm font-semibold capitalize my-2 text-sky-600">
                    {" "}
                    Regular Price : ₹{items.price}
                  </del>

                  <p className="text-[18px]  capitalize my-2 ">
                    Stock : {items.quantity}
                  </p>
                  <p className="text-[18px]  capitalize my-2 ">
                    Category : {items.category}
                  </p>
                  <div className="flex">
                    {" "}
                    <h1 className="mt-1  mr-1">Status : </h1>
                    <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                      selling
                    </p>
                  </div>
                  <p className="text-[18px]  capitalize my-2  flex gap-x-5">
                    Colors :
                    <div className="flex gap-x-2">
                      {items.color?.map((opt, inx) => (
                        <p className="">{opt}</p>
                      ))}
                    </div>
                  </p>
                  <div className="flex justify-between ">
                    <button
                      type="button"
                      className=""
                      data-te-toggle="tooltip"
                      data-te-html="true"
                      data-te-ripple-init=""
                      data-te-ripple-color="light"
                      title="View product"
                    >
                      {/* <Link href={`/view-product/${items?._id}`}>
                      <MagnifyingGlassPlusIcon className="cursor-pointer h-10 w-10 text-gray-800" />
                    </Link> */}
                    </button>
                    {/* <button
                    type="button"
                    className=""
                    data-te-toggle="tooltip"
                    data-te-html="true"
                    data-te-ripple-init=""
                    data-te-ripple-color="black"
                    title="Edit"
                  >
                    <Link href={`/edit-product/${items?._id}`}>
                      <PencilSquareIcon className="cursor-pointer h-10 w-10 text-gray-800" />
                    </Link>
                  </button>

                  <button
                    data-te-toggle="tooltip"
                    data-te-html="true"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                    title="Delete "
                    type="button"
                    onClick={() => openModal(items?._id)}
                    className="rounded-md bg-gray-300 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <TrashIcon className="cursor-pointer h-10 w-10 text-red-800   " />
                  </button> */}
                  </div>
                  <button className="w-full border p-3 rounded-lg text-white bg-sky-600 my-2">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* </section> */}
      </div>
    </>
  );
};

export default WishList;
