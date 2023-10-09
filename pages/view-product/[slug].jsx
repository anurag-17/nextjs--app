import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProduct() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  console.log("productDetail", productDetail);
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const options = {
      method: "GET",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "User-Agent": "insomnia/2023.5.8",
      },
    };

    fetch(
      `https://e-commerce-backend-brown.vercel.app/api/product/getaProduct/${slug}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setProductDetail(response);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <ToastContainer />
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <div className="">
            <h2 className="text-2xl font-semibold"> Product Details </h2>
            <p className="xl:text-[18px] lg:text-[16px] pt-1 font-normal">
              Add your product and necessary information from here
            </p>
          </div>
          <h2 className="xl:text-[18px] lg:text-[16px] font-normal">
            Welcome Back, Admin
          </h2>
        </div>

        <main className="h-full overflow-y-auto pt-[40px]">
          <div className="container grid px-6 mx-auto">
            {/* <h1 className="my-6 text-[40px] font-bold text-gray-700 dark:text-gray-300">
              Product Details
            </h1> */}
            <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
              <div className="flex flex-col lg:flex-row md:flex-row w-full overflow-hidden gap-20">
                <div className="flex-shrink-0 flex items-center justify-center h-auto">
                  <img
                    src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                    alt="product"
                  />
                </div>
                <div className="w-full flex flex-col p-5 md:p-8 text-left">
                  <div className="mb-5 block ">
                    <div className="font-serif font-semibold py-1 lg:text-[18px] text-sm">
                      <p className="lg:text-[18px] text-sm text-gray-500 pr-4 flex gap-5">
                        Status :
                        <span className="text-lightBlue-600 text-[30px]">
                          {productDetail?.title} Showing
                        </span>
                      </p>
                    </div>
                    <h2 className="text-heading text-[18px] uppercase font-semibold font-serif dark:text-gray-400 mt-4">
                      {productDetail?.brand}
                    </h2>
                  </div>
                  <div className="font-serif product-price font-bold dark:text-gray-400">
                    <span className="inline-block text-2xl">
                      $ {productDetail?.price}
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-800">
                      <span className="font-bold">Stock Out</span>
                    </span>
                    <span className=" text-sm text-gray-500 dark:text-gray-400 font-medium pl-4">
                      QUANTITY: {productDetail?.quantity}
                    </span>
                  </div>
                  <p className="font-serif font-semibold py-1 text-gray-500 lg:text-[18px] text-sm flex gap-5 items-center7 mt-2">
                    <span className="text-gray-700 dark:text-gray-400 ">
                      Categpry :
                    </span>
                    <p className=" capitalize text-[16px] font-normal leading-[30px]">
                      {productDetail?.category}
                    </p>
                  </p>
                  <div className="flex flex-col ">
                    <p className="font-serif font-semibold  text-gray-500 lg:text-[18px] text-sm flex gap-5 items-center">
                      <span className="text-gray-700 dark:text-gray-400 ">
                        Color :
                      </span>
                      {productDetail?.color
                        ? productDetail?.color?.map((optn, inx) => (
                            <p
                              className=" capitalize text-[16px] font-normal leading-[30px]"
                              key={inx}
                            >
                              {optn}
                            </p>
                          ))
                        : "-"}
                    </p>
                    <p className="uppercase font-serif font-normal text-gray-500 dark:text-gray-400 lg:text-[18px] text-sm mt-3">
                      {productDetail?.description}
                      <span className="font-bold text-gray-500 dark:text-gray-500"></span>
                    </p>
                    <div className="flex flex-row"></div>
                  </div>
                  <div className="mt-8">
                    {/* <button
                      className="cursor-pointer leading-5 transition-colors duration-150 font-medium lg:text-[18px] text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-lightBlue-600 border border-transparent active:bg-lightBlue-600 hover:bg-lightBlue-600 focus:ring focus:ring-purple-300"
                      onClick={() => {
                        router.replace(`/edit-product/${productDetail?.id}`);
                      }}
                    >
                      Edit Product
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
