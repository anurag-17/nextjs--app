import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import UserNavbar from "../../components/UserModule/userNavbar";
import Slider from "../../components/UserModule/sliderrange";
import Image from "next/image";

const ProductFilter = () => {
  const router = useRouter();
  const { slug } = router.query;
  let [isRefresh, setRefresh] = useState(false);
  const [productDetail, setProductDetail] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [productBrands, setProductBrands] = useState(["All"]);


  const pageLimit = "15";
  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async (page) => {
    const options = {
      method: "GET",
      url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?page=${page}&limit=${pageLimit}`,
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "User-Agent": "insomnia/2023.5.8",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.status === 200) {
          setAllProduct(response?.data);

          const categories = response?.data?.map((product) => product.category);
          const uniqueCategories = [...new Set(categories)];
          setProductCategory([...uniqueCategories]);

          const brands = response?.data?.map((product) => product.brand);
          const uniqueBrands = [...new Set(brands)];
          setProductBrands([...uniqueBrands]);

          const fields = response?.data?.map((product) => product.title);
          const uniqueFields = [...new Set(fields)];
          ["All", ...uniqueFields];
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSearchCategories = () => {
    if (router?.query?.slug) {
      refreshData();
    } else {
      const cate = "your-category";
      const options = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?category=${cate}`,
      };
      const fetchData = async () => {
        try {
          const response = await axios(options);
          if (response.status === 200) {
            setProductDetail(response.data);
            console.log("hello", productDetail);
          } else {
            console.error(
              "Request failed with status code: " + response.status
            );
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };

      fetchData();
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="px-20 flex">
        <div className="space-y-9 w-[25%]">
          {/*----- filter by category start ------- */}
          <div className="bg-white p-5 py-9 rounded-sm w-96 mr-4 ">
            <p className="font-semibold text-2xl mb-4">Product Categories</p>
            <hr className="mb-2" />
            <div className="space-y-4 ">
              <div className=" gap-1 ">
                {productCategory?.length > 0 &&
                  productCategory.map((cate) => (
                    <div className="flex justify-start">
                      <div className="flex my-2">
                        <Image className="w-3  " src="/right-arrows.svg" width={400} height={400} />
                        <button
                          name="category"
                          placeholder="Category"
                          className="text-[#645D64]  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline"
                          onClick={handleSearchCategories}
                          value={cate}
                        >
                          {cate}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 py-12 rounded-sm w-96 mr-4 ">
            <p className="font-semibold text-2xl mb-4">Price Range</p>
            <hr className="mb-2" />
            <div className=" ">
              <div className="flex justify-between text-[#645D64]  ">
                <div className=" ">
                  {/* <Image className="w-3 " src={right} /> */}
                  <p className="text-[#645D64]  no-underline hover:underline mb-3">
                    Range:{" "}
                    <span className="font-semibold text-black"> $0- $1000</span>
                  </p>
                  <Slider min={0} max={1000} />
                </div>
                {/* <p>15</p> */}
              </div>
            </div>
          </div>
          {/*----- filter by Brand start ------- */}
          <div className="bg-white p-5 py-9 rounded-sm w-96 mr-4">
            <p className="font-semibold text-2xl mb-4">Product Brands</p>
            <hr className="mb-2" />
            <div className=" ">
              <div className=" justify-between text-[#645D64] space-y-4 ">
                <div className="w-auto flex flex-col  gap-1">
                  {productBrands?.length > 0 &&
                    productBrands.map((bnd) => (
                      <div className="flex justify-start">
                        <div className="flex my-2">
                          <img className="w-3  " src="/right-arrows.svg" />
                          <button
                            name="brand"
                            id="brand"
                            placeholder="Brand"
                            className="text-[#645D64]  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline"
                            // onClick={handleSearchBrand}
                            value={bnd}
                          >
                            {bnd}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
            {productCategory?.length > 0 &&
              productCategory.map((cate) => (
                <h2 className="text-2xl font-semibold pb-4">{cate} </h2>
              ))}
            <div className="mb-3 w-[40%]">
              <input
                type="search"
                className=" border border-gray-500  p-3 rounded-xl focus:border-none w-11/12 "
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon1"
              />
            </div>
            <div className=" flex  gap-x-3"></div>
          </div>
          <div>
            {/* {allProduct.map((item) => (
            <td>{item?.brand}</td>
          ))} */}
            <div className="grid lg:grid-cols-3 gap-7 my-5 h-[80vh] overflow-y-scroll ">
              {allProduct.map((items, ix) => (
                <div
                  className=" bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 hover:border-lightBlue-600"
                  key={ix}
                >
                  <img
                    src="/img1.jpeg"
                    alt=""
                    className=" mx-auto rounded-[20px] "
                    width={400}
                    height={400}
                  />
                  <div className="bg-white px-10 pb-6 rounded-[20px] ">
                    <div className="flex justify-between items-center my-4">
                      <h6 className="text-[25px] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden">
                        {items.title}
                      </h6>
                      {/* <button onClick={() => toggleWishlist(items._id)}>
                      {isWished[items._id] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-6 h-6 fill-[#c61f1f]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-6 h-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      )}
                    </button> */}
                    </div>

                    <p className="text-[18px]  flex capitalize  ">
                      Brand :{" "}
                      <p className="font-semibold px-2"> {items.brand} </p>
                    </p>
                    <p className="text-[20px] flex font-semibold capitalize my-2 text-lightBlue-600">
                      Offer price :{" "}
                      <p className="text-lightBlue-800 px-2 font-bold">
                        ₹{items.discountedPrice}{" "}
                      </p>
                      <br />
                    </p>
                    <del className="text-md font-semibold capitalize my-2 text-lightBlue-600">
                      {" "}
                      Regular Price : ₹{items.price}
                    </del>

                    <p className="text-[18px] flex capitalize my-2 ">
                      Stock :{" "}
                      <p className="px-2 font-semibold">{items.quantity}</p>
                    </p>
                    <p className="text-[18px] flex capitalize my-2 ">
                      Category :{" "}
                      <p className="font-semibold px-2">{items.category}</p>
                    </p>
                    <div className="flex mt-3">
                      {" "}
                      <h1 className="mt-1  mr-1 text-[18px]">Status : </h1>
                      <p className=" bg-ligthtBlue-100 p-1 text-center font-semibold rounded-xl text-ligthtBlue-700 w-20">
                        selling
                      </p>
                    </div>
                    <div className="flex gap-x-5 mt-3">
                      <label
                        for="color"
                        className="text-[18px] capitalize my-2"
                      >
                        Colors :
                      </label>
                      <div className="w-[250px]">
                        <select
                          onChange={(e) =>
                            handleColorChange(items._id, e.target.value)
                          }
                          className="w-full cursor-default rounded bg-white py-3 pl-3 pr-4 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 border sm:text-sm"
                        >
                          <option
                            value=""
                            className="cursor-default py-2 pl-10 pr-4 text-sm capitalize"
                          >
                            Select Color
                          </option>
                          {/* {items?.color?.map((options, inx) => (
                          <option
                            key={inx}
                            value={options}
                            className="cursor-default py-2 pl-10 pr-4 text-sm capitalize"
                          >
                            {options}
                          </option>
                        ))} */}
                        </select>
                      </div>
                    </div>
                    {/* <Link href={`/product-details/${items?._id}`}>
                  </Link> */}
                    <button className="w-full border p-3 rounded-lg text-white bg-lightBlue-600 hover:bg-lightBlue-900 my-2 mt-4 items-end">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductFilter), { ssr: false });
