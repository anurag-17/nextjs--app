import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductGrid = () => {
  const [allProduct, setAllProduct] = useState([]);

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
        console.log(response.data);
        if (response.status === 200) {
          setAllProduct(response?.data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <section className="bg-gray-00 min-h-screen">
      <div className="flex justify-between  items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold">Products Grid </h2>
        <h2>Welcome Back, Clint</h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 my-16">
        {allProduct.map((items, ix) => (
          <div
            className="max-w-[80%] bg-white  border-2 border-gray rounded-lg  mx-auto hover:border-lightBlue-600"
            key={ix}
          >
            <Image
              src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
              alt=""
              className=" mx-auto rounded-lg "
              width={400}
              height={400}
            />
            <div className="bg-white px-4 pb-3">
              <div className="flex justify-between items-center my-4">
                <h6 className="text-25px[] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden">
                  {items.title}
                </h6>
                <HeartIcon
                  id="icon-like"
                  className="h-6 w-6  text-gray-500 cursor-pointer"
                />
                <p className="hidden text-red-800 text-[18px] ">
                  Add To Favorites
                </p>
              </div>

              <div className=" flex justify-between items-center">
                <p className="text-[18px]  capitalize my-2 ">
                  Available : {items.quantity}
                </p>
                <p className="text-sm font-semibold capitalize my-2 text-sky-600">
                  Price : ₹{items.price}
                </p>
              </div>
              <p className="text-[18px]  capitalize my-2 ">
                Category : {items.category}
              </p>
              <p className="text-[18px]  capitalize my-2  flex gap-x-5">
                Colors :
                <div className="flex gap-x-2">
                  {items.color?.map((opt, inx) => (
                    <p className="">{opt}</p>
                  ))}
                </div>
              </p>

              {/* <p className="text-[18px]  text-gray-700 font-normal text-justify mt-4 max-h-[100px] h-[100px] overflow-y-hidden hover:overflow-y-scroll">
              {items.description}
            </p> */}
              <button
                type="type"
                className="border text-[18px] font-semibold border-sky-400 text-sky-600 p-1 mt-2 hover:border-none rounded-lg mt-5  hover:bg-sky-700 hover:text-white w-full"
              >
                View Details
              </button>
              <button
                type="submit"
                className="border text-[18px] font-semibold hover:border-sky-400 hover:text-sky-600 p-1 my-2  rounded-lg mt-5  hover:bg-white bg-sky-700 text-white w-full"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(ProductGrid), { ssr: false });
