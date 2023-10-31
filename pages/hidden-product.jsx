import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const HiddenProduct = () => {
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
    <>
      <div>
        <div className="grid lg:grid-cols-3 gap-7 my-16  ">
          {allProduct.map((items) => (
            <div className=" bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 hover:border-lightBlue-600">
              <img
                src="/hidden-icon.svg"
                className="w-52 absolute mx-40 my-20 z-50 "
              />
              {/* <Link href={`/user-productdetail/${items?._id}`}></Link> */}
              <img
                src="/img1.jpeg"
                alt=""
                className=" mx-auto rounded-[20px] blur-lg"
                width={400}
                height={400}
              />

              <div className="bg-white px-10 pb-6 rounded-[20px] ">
                <div className="flex justify-between items-center my-4">
                  <h6 className="text-[25px] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden">
                    {items.title}
                  </h6>
                </div>

                <p className="text-[18px]  flex capitalize  ">
                  Brand : <p className="font-semibold px-2"> {items?.brand} </p>
                </p>

                <p className="text-md font-semibold capitalize my-2 text-sky-600">
                  {" "}
                  Price : ₹{items?.price}
                </p>

                <p className="text-[18px] flex capitalize my-2 ">
                  Category :{" "}
                  <p className="font-semibold px-2">{items?.category}</p>
                </p>
                <div className="flex">
                  {" "}
                  <h1 className="mt-1  mr-1 text-[18px]">Status : </h1>
                  <p className=" bg-red-200 p-1 px-2 text-center font-semibold rounded-md text-red-600 ">
                    Not Available
                  </p>
                </div>
                <p className="text-[18px]  capitalize my-2  flex gap-x-5 ">
                  Colors :
                  <div className="flex font-semibold gap-x-2 whitespace-nowrap overflow-hidden text-ellipsis ">
                    {items.color?.map((opt, inx) => (
                      <p className="">{opt}</p>
                    ))}
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HiddenProduct;
