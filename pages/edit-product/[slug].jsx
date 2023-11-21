import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProduct() {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState({});
  const [getCurrency, setGetCurrency] = useState([]);
  const [getallCategory, setGetallCategory] = useState([]);
  const [getallBrand, setGetallBrand] = useState([]);

  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    regPriceCurr: "",
    offerPriceCurr: "",
    category: "",
    brand: "",
    quantity: "",
    color: "",
  });

  console.log(productDetails?.offerPriceCurr);

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setProductDetails({
        ...productDetails,
        [name]: value.split(","),
      });
    } else if (name === "brand") {
      setProductDetails({
        ...productDetails,
        [name]: value.toUpperCase(),
      });
    } else {
      setProductDetails({
        ...productDetails,
        [name]: value,
      });
    }
  };
  useEffect(() => {
    defaultCategory();
  }, []);

  const defaultCategory = () => {
    const option = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/category/getallCategory",
    };
    axios
      .request(option)
      .then((response) => {
        setGetallCategory(response?.data);
        console.log("herry", response?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    defaultBrand();
  }, []);

  const defaultBrand = () => {
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/brand/getallBrand",
    };
    axios
      .request(options)
      .then((response) => {
        setGetallBrand(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [isRefresh]);

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
        setEditData(response);
      })
      .catch((err) => console.error(err));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "PUT",
      url: `https://e-commerce-backend-brown.vercel.app/api/product/updateProduct/${slug}`,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
      },
      data: productDetails,
      data: {
        title: productDetails?.title ? productDetails?.title : editData?.title,
        description: productDetails?.description
          ? productDetails?.description
          : editData?.description,
        price: productDetails?.price ? productDetails?.price : editData?.price,
        discountedPrice: productDetails?.discountedPrice
          ? productDetails?.discountedPrice
          : editData?.discountedPrice,
        category: productDetails?.category
          ? productDetails?.category
          : editData?.category,
        brand: productDetails?.brand ? productDetails?.brand : editData?.brand,
        quantity: productDetails?.quantity
          ? productDetails?.quantity
          : editData?.quantity,
        color: productDetails?.color ? productDetails?.color : editData?.color,
        regPriceCurr: productDetails?.regPriceCurr
          ? productDetails?.regPriceCurr
          : editData?.regPriceCurr,
        offerPriceCurr: productDetails?.offerPriceCurr
          ? productDetails?.offerPriceCurr
          : editData?.offerPriceCurr,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.status === 200) {
          setLoading(false);
          toast.success("Product updated successfully !");
          refreshData();
          router.push("/admin-product");
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed. something went wrong!");
      });
  };

  //---currency---

  useEffect(() => {
    defaultCurrency();
  }, []);

  const defaultCurrency = () => {
    const curr = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/currency/getAllCurrencies",
    };
    axios
      .request(curr)
      .then((response) => {
        if (response?.status === 200) {
          setGetCurrency(response?.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <ToastContainer />
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <div className="">
            <h2 className="text-2xl font-semibold">Edit Product </h2>
            <p className="xl:text-[18px] lg:text-[16px] pt-1 font-normal">
              Add your product and necessary information from here
            </p>
          </div>
          <h2 className="xl:text-[18px] lg:text-[16px] font-normal mt-8">
            Welcome Back, Admin
          </h2>
        </div>

        <div className=" mt-[44px] bg-white py-10 ">
          <div className="h-[100px] ">
            <h2 className="text-[25px] font-semibold text-green-600 leading-[30px] px-6">
              Edit Basic Info
            </h2>
            <div className="border-b border-[#f3f3f3] mt-6 w-full">
              <div className="border-b border-green-600 w-[160px]"></div>
            </div>
          </div>

          {/*---- form start here ----*/}
          <form action="" onSubmit={handleFormSubmit}>
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
              {/*------ title -----*/}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label htmlFor="" className="custom-input-label">
                  Product Title/Name
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Product Title/Name"
                    className="custom-input"
                    defaultValue={
                      editData?.title ? editData?.title : productDetails.title
                    }
                    // value={productDetails.title}
                    onChange={inputHandler}
                    required
                    minLength={3}
                    max={84}
                  />
                </div>
              </div>

              {/*------ Description -----*/}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label htmlFor="" className="custom-input-label">
                  Product Description
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <textarea
                    rows="6"
                    className="custom-input h-[100px]"
                    name="description"
                    placeholder="Product Description"
                    spellCheck="false"
                    defaultValue={
                      editData?.description
                        ? editData?.description
                        : productDetails.description
                    }
                    // value={productDetails.description}
                    onChange={inputHandler}
                    required
                    minLength={10}
                    max={500}
                  ></textarea>
                </div>
              </div>

              {/*----- Regular price -----*/}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="custom-input-label">Product Price</label>
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex flex-row">
                    <span className="inline-flex items-center px-1 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                      <select
                        className="bg-white list-none outline-none "
                        name="regPriceCurr"
                        defaultValue={
                          editData?.regPriceCurr
                            ? editData?.regPriceCurr
                            : productDetails?.regPriceCurr
                        }
                        onChange={inputHandler}
                      >
                        {getCurrency?.map((item) => (
                          <option key={item?.id} value={item?.currencySign}>
                            {item?.currencySign}
                          </option>
                        ))}
                      </select>
                    </span>
                    <input
                      type="number"
                      name="price"
                      placeholder="OriginalPrice"
                      className="custom-input"
                      defaultValue={
                        editData?.price ? editData?.price : productDetails.price
                      }
                      onChange={inputHandler}
                      required
                      minLength={1}
                    />
                  </div>
                </div>
              </div>

              {/*------offer price -----*/}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label className="custom-input-label">Offer Price</label>
                <div className="col-span-8 sm:col-span-4">
                  <div className="flex flex-row">
                    <span className="inline-flex items-center px-1 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                      <select
                        className="bg-white list-none outline-none "
                        name="offerPriceCurr"
                        defaultValue={
                          editData?.regPriceCurr
                            ? editData?.regPriceCurr
                            : productDetails?.regPriceCurr
                        }
                        onChange={inputHandler}
                      >
                        {getCurrency?.map((item) => (
                          <option key={item?.id} value={item?.currencySign}>
                            {item?.currencySign}
                          </option>
                        ))}
                      </select>
                    </span>
                    <input
                      type="number"
                      name="discountedPrice"
                      placeholder="OfferPrice"
                      className="custom-input"
                      defaultValue={
                        editData?.discountedPrice
                          ? editData?.discountedPrice
                          : productDetails.discountedPrice
                      }
                      onChange={inputHandler}
                      required
                      minLength={1}
                    />
                  </div>
                </div>
              </div>

              {/*------ category -----*/}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label htmlFor="" className="custom-input-label">
                  Product Category
                </label>

                <div className="col-span-8 sm:col-span-4">
                  <select
                    name="category"
                    className="custom-input"
                    defaultValue={
                      editData?.category
                        ? editData.category
                        : productDetails.category
                    }
                    onChange={inputHandler}
                    required
                    minLength={3}
                    maxLength={32}
                  >
                    <option value="" disabled>
                      {editData?.category
                        ? editData.category
                        : productDetails.category}
                    </option>
                    {getallCategory.map((item) => (
                      <option
                        key={item.id}
                        value={item.title}
                        selected={
                          item.title ===
                          (editData?.category || productDetails.category)
                        }
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/*------ quantity -----*/}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label htmlFor="" className="custom-input-label">
                  Product Quantity
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Add quantity"
                    className="custom-input"
                    defaultValue={
                      editData?.quantity
                        ? editData?.quantity
                        : productDetails.quantity
                    }
                    onChange={inputHandler}
                    required
                    minLength={10}
                  />
                </div>
              </div>

              {/*------ brand -----*/}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label htmlFor="" className="custom-input-label">
                  Product Brand
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <div className="col-span-8 sm:col-span-4">
                    <select
                      type="text"
                      name="brand"
                      placeholder="Add Brand Name"
                      className="custom-input uppercase"
                      defaultValue={
                        editData?.brand ? editData.brand : productDetails.brand
                      }
                      onChange={inputHandler}
                      required
                      minLength={3}
                      maxLength={32}
                    >
                      <option value="" disabled>
                        Select Brands
                      </option>
                      {getallBrand.map((items) => (
                        <option
                          key={items.id}
                          value={items.brand}
                          selected={
                            items.brand ===
                            (editData?.brand || productDetails.brand)
                          }
                        >
                          {items.brand}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/*------ color -----*/}
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <label htmlFor="" className="custom-input-label">
                  Product Color
                </label>
                <div className="col-span-8 sm:col-span-4">
                  <input
                    type="text"
                    name="color"
                    placeholder="Enter colors separated by commas"
                    className="custom-input"
                    defaultValue={
                      editData?.color ? editData?.color : productDetails.color
                    }
                    // value={productDetails.color}
                    onChange={inputHandler}
                    required
                    minLength={3}
                    max={60}
                  />
                </div>
              </div>
              {/*------ submit button -----*/}
              <div className="mt-8">
                {isLoading ? (
                  <button
                    type="button"
                    className="w-full  text-cyan-600 py-3 text-center bg-white mb-2 border border-cyan-600 font-semibold text-[18px]"
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    // onClick={handlesubmit}
                    className="w-full bg-cyan-600 py-3 text-center text-white mb-2 font-semibold text-[18px]"
                  >
                    Update Product
                  </button>
                )}
              </div>
            </div>
          </form>

          {/*---- form end here ----*/}
        </div>
      </section>
    </>
  );
}
