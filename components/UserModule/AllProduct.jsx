import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import DeleteModal from "../AdminModule/Product/Modal/deleteModal";
import UserNavbar from "./userNavbar";
import Slider from "./sliderrange";
import { cartProducts } from "../../redux/slices/authSlice";
import { fetchApi } from "../../utlis/api";
import right from "/public/right-arrows.svg";
import { useRouter } from "next/router";

const ProductGrid = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartStore = useSelector((state) => state || []);
  const { token } = useSelector((state) => state.auth.userDetails || null);

  const [productCategory, setProductCategory] = useState("");
  const [productBrands, setProductBrands] = useState(["All"]);
  const [allProduct, setAllProduct] = useState([]);
  const [getallCategory, setGetallCategory] = useState([]);
  const [getallBrand, setGetallBrand] = useState([]);
  let [productID, setProductID] = useState("");
  let [isOpenDelete, setOpenDelete] = useState(false);
  let [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [customerID, setCustomerID] = useState();
  // JSON.parse(localStorage.getItem("userID"))
  const _id = productID;

  const [wishListItems, setWishListItems] = useState();
  const [isWished, setIsWished] = useState({});

  const [productColorsArray, setProductColorsArray] = useState([]);

  const option = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/brand/getallBrand",
  };

  useEffect(() => {
    defaultBrand();
  }, []);

  const defaultBrand = () => {
    axios
      .request(option)
      .then((response) => {
        setGetallBrand(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/category/getallCategory",
  };

  useEffect(() => {
    defaultCategory();
  }, []);

  const defaultCategory = () => {
    axios
      .request(options)
      .then((response) => {
        setGetallCategory(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const pageLimit = "15";
  function closeModal() {
    setOpenDelete(false);
  }

  function openModal(id) {
    setProductID(id);
    setOpenDelete(true);
  }

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToWishlist = (id) => {
    console.log("prodID", id);
    setIsWished(!isWished);
    const prodId = id;
    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/product/addToWishlist",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        authorization: token,
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
          toast.success("Success. Product added successfully!");
          setLoading(false);
          refreshData();
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed. Can not repeat product name!");
      });
  };

  const toggleWishlist = (productId) => {
    setIsWished((prevIsWished) => ({
      ...prevIsWished,
      [productId]: !prevIsWished[productId], // Toggle the state for the specified product
    }));
    addToWishlist(productId);
  };
  const handleColorChange = (productId, selectedColor) => {
    const productIndex = productColorsArray.findIndex(
      (item) => item.productId === productId
    );
    if (productIndex !== -1) {
      const updatedArray = [...productColorsArray];
      updatedArray[productIndex].color = selectedColor;
      setProductColorsArray(updatedArray);
    } else {
      const updatedArray = [
        ...productColorsArray,
        { productId, color: selectedColor },
      ];
      setProductColorsArray(updatedArray);
    }
  };
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
  // ------ search products ------ //
  const handleSearch = (e) => {
    const title = e.target.value;
    if (title.trim() === "") {
      refreshData();
    } else {
      const options = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?search=${title}`,
      };
      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            setAllProduct(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  // ------ filter products by brand ------ //
  const handleSearchBrand = (e) => {
    const bnd = e.target.value;
    if (bnd === "All") {
      refreshData();
    } else {
      const options = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?brand=${bnd}`,
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          if (response.status === 200) {
            setAllProduct(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  // ------ filter products by category ------ //
  const handleSearchCategories = (e) => {
    const cate = e.target.value;
    if (cate === "All") {
      refreshData();
    } else {
      const options = {
        method: "GET",
        url: `https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct?category=${cate}`,
      };
      axios
        .request(options)
        .then(function (response) {
          console.log("hell", response.data);
          if (response.status === 200) {
            setAllProduct(response.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    addtoCartBySession();
  }, []);

  const addtoCartBySession = () => {
    const sessionCart = JSON.parse(sessionStorage.getItem("addToCart")) || [];

    if (sessionCart?.length > 0 && token) {
      console.log("");
      addToCart(sessionCart);
      // router.push("/cart");
    } else {
    }
  };

  const addToCart = (data) => {
    console.log(data);

    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/auth/cart",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
        authorization: token,
      },
      data: {
        cart: [
          {
            _id: data[0]?._id,
            count: data[0]?.count,
            color: data[0]?.color,
          },
        ],
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          // toast.success("Product added into cart !!");
          sessionStorage.removeItem("addToCart");
          setTimeout(() => {
            // router.push("/cart");
          }, 500);

          refreshData();
        } else {
          return;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <UserNavbar />

      <section className="bg-gray-00 min-h-screen px-20 flex">
        <div className="space-y-9 w-[25%]">
          {/*----- filter by category start ------- */}
          <div className="bg-white p-5 py-9 rounded-sm w-96 mr-4 ">
            <p className="font-semibold text-2xl mb-4">Product Categories</p>
            <hr className="mb-2" />
            <div className="space-y-4 ">
              <div className=" gap-1 ">
                {productCategory?.length > 0 &&
                  productCategory.map((cate) => (
                   <Link href={`/product-filter/${cate}`}>
                   <div className="flex justify-start">
                      <div className="flex my-2">
                        <Image className="w-3  " src={right} />
                        <button
                          name="category"
                          id="category"
                          placeholder="Category"
                          className="text-[#645D64]  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline"
                          onClick={handleSearchCategories}
                          value={cate}
                        >
                          {cate}
                        </button>
                      </div>
                    </div>
                   </Link>
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
                          <Image className="w-3  " src={right} />
                          <button
                            name="brand"
                            id="brand"
                            placeholder="Brand"
                            className="text-[#645D64]  flex hover:text-[#0284C7] text-start cursor-pointer no-underline hover:underline"
                            onClick={handleSearchBrand}
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

        <div className=" w-full md:w-[85%] mx-auto">
          <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
            <h2 className="text-2xl font-semibold pb-4">All Product </h2>

            <div className="mb-3 w-[40%]">
              <input
                type="search"
                className=" border border-gray-500  p-3 rounded-xl focus:border-none w-11/12 "
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon1"
                onChange={handleSearch}
              />
            </div>
            <div className=" flex  gap-x-3"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-7 my-5 h-[80vh] overflow-y-scroll ">
            {allProduct?.map((items, ix) => (
              <div
                className=" bg-white  border-[2px] border-gray  hover:rounded-[10px] m-4 hover:border-lightBlue-600"
                key={ix}
              >
                {
                  items?.images?.length>0 ? items?.images?.map((img,inx)=>(
                    <div className="h-[400px] p-2">
                    <Image
                    key={inx}
                      src={img?.url}
                      alt=""
                      className=" mx-auto rounded-[20px]"
                      width={300}
                      height={300}
                    />
                    </div>
                  ))
                  :
                  <div className="h-[400px]">
                    <Image
                      src="/img1.jpeg"
                      alt=""
                      className=" mx-auto rounded-[20px] h-[400px] "
                      width={400}
                      height={400}
                    />
                  </div>
                }
                <div className="bg-white px-10 pb-6 rounded-[20px] mt-3">
                  <div className="flex justify-between items-center my-4">
                    <h6 className="text-[25px] font-semibold capitalize mb-0 whitespace-nowrap w-[90%] text-ellipsis overflow-hidden">
                      {items.title}
                    </h6>
                    <button onClick={() => toggleWishlist(items._id)}>
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
                    </button>
                  </div>

                  <p className="text-[18px]  flex capitalize  ">
                    Brand :{" "}
                    <p className="font-semibold px-2"> {items.brand} </p>
                  </p>
                  <p className="text-[18px] flex font-semibold capitalize my-2 text-sky-600">
                    Offer price :{" "}
                    <p className="text-sky-800 px-2 font-bold">
                      ₹{items.discountedPrice}{" "}
                    </p>
                    <br />
                  </p>
                  <del className="text-md font-semibold capitalize my-2 text-sky-600">
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
                    <p className=" bg-sky-200 p-1 text-center font-semibold rounded-xl text-sky-600 w-20">
                      selling
                    </p>
                  </div>
                  <div className="flex gap-x-5 mt-3">
                    <label for="color" className="text-[18px] capitalize my-2 whitespace-nowrap">
                      Colors :
                    </label>
                    <div className="w-[240px]">
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
                        {items?.color?.map((options, inx) => (
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
                  </div>
                  <Link href={`/product-details/${items?._id}`}>
                    <button className="w-full border p-3 rounded-lg text-white bg-sky-600 hover:bg-sky-900 my-2 mt-4 items-end">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Transition appear show={isOpenDelete} as={Fragment}>
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
                  <Dialog.Title
                    as="h3"
                    className="lg:text-[25px] text-[16px] font-semibold leading-6 text-gray-900"
                  >
                    Are You Sure! Want to Delete?
                  </Dialog.Title>
                  <DeleteModal
                    productID={productID}
                    closeModal={closeModal}
                    refreshData={refreshData}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductGrid), { ssr: false });
