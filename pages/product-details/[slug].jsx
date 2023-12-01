import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import UserNavbar from "../../components/UserModule/userNavbar";
import { cartProducts } from "../../redux/slices/authSlice";
import { fetchApi } from "../../utlis/api";
import ProductDetailsCarousel from "../../components/UserModule/Product/ProductDetailsCarousel";
import { getDiscountedPricePercentage } from "../../components/UserModule/Discount";

const Userdetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [isLoading, setLoading] = useState(false);
  const [isAddIntoCart, setAddIntoCart] = useState(false);
  const [isShowErr, setShowErr] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [productColor, setProductColor] = useState("");
  let [productQuantity, setProductQuantity] = useState(1);
  const [isSessionAdded, setSessionAdded] = useState(false);
  const [sessionCartProduct, setsessionCartProduct] = useState([]);
  const { token } = useSelector((state) => state.auth.userDetails || null);

  const updateCart = () => {
    setsessionCartProduct(
      JSON.parse(sessionStorage.getItem("addToCart")) || []
    );
  };
  // console.log(sessionCartProduct);

  useEffect(() => {
    updateCart();
    if (!token || token == undefined) {
      const sessionCart = JSON.parse(sessionStorage.getItem("addToCart")) || [];

      const productInCart = sessionCart.find((item) => item?._id === slug);

      if (productInCart) {
        console.log("Product is already in the cart");
        setSessionAdded(true);
      } else {
        setSessionAdded(false);
      }
    }
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [router?.query?.slug]);

  const getAllProducts = async () => {
    const options = {
      method: "GET",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "User-Agent": "insomnia/2023.5.8",
      },
    };
    try {
      if (router?.query?.slug) {
        fetch(
          `https://e-commerce-backend-brown.vercel.app/api/product/getaProduct/${router?.query?.slug}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            setProductDetail(response);
          })
          .catch((err) => console.error(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorChange = (productId, selectedColor) => {
    setProductColor(selectedColor);
    setAddIntoCart(false);
  };

  const handleAddToCart = async (e, produc) => {
    e.preventDefault();
    setLoading(true);
    if (!token || token == undefined) {
      if (!productColor) {
        setShowErr(true);
        setLoading(false);
      } else {
        const cartProduct = {
          _id: produc?._id,
          count: productQuantity || 1,
          color: productColor,
          product: produc,
        };

        const updatedCart = [...sessionCartProduct, cartProduct];

        sessionStorage.setItem("addToCart", JSON.stringify(updatedCart));
        setSessionAdded(true);
        updateCart();
      }
    } else {
      const use_ID = JSON.parse(localStorage.getItem("userID"));

      if (!productColor) {
        setShowErr(true);
        setLoading(false);
      } else {
        setShowErr(false);
        const options = {
          method: "POST",
          url: "https://e-commerce-backend-brown.vercel.app/api/auth/cart",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "insomnia/2023.5.8",
            authorization: token,
          },
          data: {
            cart: [
              {
                _id: produc?._id,
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
              toast.success("Product added into cart !!");
              setAddIntoCart(true);
              refreshData();
            } else {
              return;
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }
  };

  const handleCounter = (productId) => {
    if (productQuantity !== -1) {
      setProductQuantity((productQuantity += 1));
    }
  };
  const handleMinusCounter = (productId) => {
    if (productQuantity > 1) {
      setProductQuantity((productQuantity -= 1));
    }
  };

  const handleGoToCart = () => {
    router.push("/user-cart");
  };

  const getCartProducts = async () => {
    try {
      const response = await fetchApi("/auth/getUserCart");

      if (response?.status === 200) {
        dispatch(cartProducts(response?.data?.products));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <UserNavbar />
      <section className="bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center px-20 border border-[#f3f3f3] rounded-lg bg-white h-[100px]">
          <div className="">
            <h2 className="text-2xl font-semibold"> Product Details </h2>
            <p className="xl:text-[18px] lg:text-[16px] pt-1 font-normal">
              Add your product and necessary information from here
            </p>
          </div>
          <h2 className="xl:text-[18px] lg:text-[16px] font-normal">
            Welcome Back
          </h2>
        </div>
        <div className="container mx-auto">
          <main className="h-full overflow-y-auto pt-[40px]">
            <div className="grid px-6 mx-auto">
              <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px] mt-4">
                  {/* left column start */}
                  <div className="w-full md:w-auto  max-w-[600px] lg:max-w-full mx-auto lg:mx-0">
                    <ProductDetailsCarousel
                      images={productDetail?.images || []}
                      productColor={productColor}
                    />
                  </div>

                  {/* right column start */}
                  <div className="flex-[1] py-3 text-left">
                    <div className="flex text-left mb-4">
                      <div className="lg:text-[40px] flex gap-5 leading-8 text-lightBlue-600 font-bold  py-2  w-full  rounded">
                        {" "}
                        {productDetail?.title}
                      </div>
                    </div>

                    <div className="flex text-left mt-4">
                      <div className="w-[160px] text-[20px] font-normal leadinng-[28px]">
                        Brand :
                      </div>
                      <div className="text-[18px] xl:text-[20px] font-semibold leadinng-[28px] uppercase">
                        {productDetail?.brand}
                      </div>
                    </div>

                    <div className="flex text-left mt-4">
                      <div className="w-[160px] text-[20px] font-normal leadinng-[28px]">
                        Category :
                      </div>
                      <div className="text-[18px] xl:text-[20px] font-semibold leadinng-[28px] capitalize">
                        {productDetail?.category}
                      </div>
                    </div>

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

                    <div className="flex items-center text-left mt-3">
                      <div className="w-[160px] text-[20px] font-normal leadinng-[28px]">
                        Price :
                      </div>
                      <div className="flex gap-x-5">
                        <del className="text-[18px] xl:text-[20px] font-semibold leadinng-[28px] uppercase">
                          ₹{productDetail?.price}
                        </del>
                        <div className="text-[18px] xl:text-[20px] font-semibold leadinng-[28px] uppercase">
                          ₹{productDetail?.discountedPrice}
                        </div>
                        <div className="text-[18px] xl:text-[20px] font-semibold leadinng-[28px] uppercase">
                          <p className="ml-auto  font-medium text-green-500 whitespace-nowrap">
                            {getDiscountedPricePercentage(
                              productDetail?.price,
                              productDetail?.discountedPrice
                            )}
                            % off
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex text-left mt-4">
                      <div className="w-[160px] text-[20px] font-normal leadinng-[28px]">
                        Colors :
                      </div>
                      <div className="">
                        <div className="w-[250px]">
                          <select
                            onChange={(e) =>
                              handleColorChange(
                                productDetail._id,
                                e.target.value
                              )
                            }
                            value={productColor}
                            className="w-full cursor-default rounded bg-white py-3 pl-3 pr-4 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 border sm:text-sm"
                          >
                            <option
                              value=""
                              className="cursor-default py-2 pl-10 pr-4 text-sm capitalize"
                            >
                              Select Color
                            </option>
                            {productDetail?.color?.length > 0 &&
                              productDetail?.color?.map((options, inx) => (
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

                    <div className=" text-left mt-4 mb-4">
                      <div className="w-[170px] text-[20px] font-normal leadinng-[28px]">
                        Summary :
                      </div>
                      <div className="text-[18px] xl:text-[20px] font-medium leadinng-[28px] capitalize mt-2 pl-6">
                        {productDetail?.description}
                      </div>
                    </div>

                    {isAddIntoCart || isSessionAdded ? (
                      <button
                        className="w-full border p-3 rounded-lg hover:text-white border-sky-600 text-sky-900   hover:bg-sky-600 my-2 mt-4 items-end"
                        onClick={handleGoToCart}
                      >
                        Go To Cart
                      </button>
                    ) : (
                      <button
                        className="w-full border p-3 rounded-lg text-white bg-sky-600 hover:bg-sky-900 my-2 mt-4 items-end"
                        onClick={(e) => handleAddToCart(e, productDetail)}
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(Userdetail), { ssr: false });
