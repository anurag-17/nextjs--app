import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import axios from "axios";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [getallBrand, setGetallBrand] = useState([]);
  const [getallCategory, setGetallCategory] = useState([]);
  const [getCurrency, setGetCurrency] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isUploadingImg, setUploadingImg] = useState(false);
  const [isPriceError, setPriceError] = useState(false);
  const [isCurrError, setCurrError] = useState(false);
  const [imageUrls, setImageUrls] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
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
    color: [],
    images: [],
  });

  const [selectColor, setSelectColor] = useState([]);
  const [allColors, setColors] = useState([]);
  const [imgFiles, setImageFiles] = useState([]);
  const [imgByColor, setImgBycolor] = useState({
    public_id: "",
    url: [],
    color: "",
  });

  const { token } = useSelector((state) => state?.auth?.userDetails || null);

  const refreshData = () => {
    setProductDetails({
      title: "",
      description: "",
      price: "",
      currencyName: "",
      discountedPrice: "",
      category: "",
      brand: "",
      quantity: "",
      color: [],
      images: [],
      regPriceCurr: "",
      offerPriceCurr: "",
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

  const notify = () => {
    toast.success("Success. Product added successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      setProductDetails({
        ...productDetails,
        [name]: value.split(","),
      });
    } else {
      setProductDetails({
        ...productDetails,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (productDetails?.regPriceCurr !== productDetails?.offerPriceCurr) {
      setCurrError(true);
    } else if (productDetails?.discountedPrice >= productDetails?.price) {
      setPriceError(true);
    } else {
      setLoading(true);
      setPriceError(false);
      setCurrError(false);
      const options = {
        method: "POST",
        url: "https://e-commerce-backend-brown.vercel.app/api/product/createProduct",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/2023.5.8",
        },
        data: productDetails,
      };

      axios
        .request(options)
        .then(function (response) {
          if (response.status === 200) {
            notify();
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
    }
  };

  //----- color -------

  const handleImageUpload = async (event) => {
    setImageFiles([...imgFiles,event.target.files[0]]);
  };

  const imageUploader = async () => {
    const formData = new FormData();

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append("images", imgFiles[i]);
    }
    try {
      const res = await uploadImage(formData);
      console.log(res);

      if (res?.status === 200) {
        productDetails.images.push({
          public_id: "",
          url: res?.data?.imageUrls,
          color: selectColor,
        });
        setSelectedColor("");
        setImageFiles([]);
      } else {
        toast.error("Failed !!");
        setUploadingImg(false);
      }
    } catch (error) {
      console.log(error);
      setUploadingImg(false);
    }
  };

  const uploadImage = async (formData) => {
    try {
      const response = await axios.post(
        "https://e-commerce-backend-brown.vercel.app/api/auth/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: token,
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Image upload error", error);
      throw error;
    }
  };

  const getAllColors = () => {
    const option = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/color/getColors",
    };
    axios
      .request(option)
      .then((response) => {
        if (response.status === 200) {
          setColors(response?.data);
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAllColors();
  }, []);

  const handleWarnaChange = async (e) => {
    setSelectedColor(e);
    setSelectColor(e?.value);
    setImgBycolor({ ...imgByColor, ["color"]: e?.value });
  };

  const handleMultiSelect = async (e) => {
    let newColor = e.map((item) => item?.value);
    setProductDetails({ ...productDetails, ["color"]: newColor });
    // productDetails.color.push(newColor)
  };

  return (
    <section className="bg-gray-100 min-h-screen">
      <ToastContainer />

      <div className="h-[100px] ">
        <h2 className="text-[25px] font-semibold text-green-600 leading-[25px] px-6">
          Basic Info
        </h2>
        <div className="border-b border-[#f3f3f3] mt-6 w-full">
          <div className="border-b border-green-600   w-[160px]"></div>
        </div>
      </div>

      {/*---- form start here ----*/}
      <form action="" onSubmit={handleFormSubmit} className="">
        <div className="px-6 pt-1 flex-grow w-full max-h-screen pb-40 md:pb-32 lg:pb-32 xl:pb-32 ">
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
                value={productDetails.title}
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
                value={productDetails.description}
                onChange={inputHandler}
                required
                minLength={10}
                max={500}
              ></textarea>
            </div>
          </div>

          {/*------ Image -----*/}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 justify-center items-center">
            <label className="custom-input-label">Product Images</label>
            <div className="col-span-1 sm:col-span-2">
           
                <div className="w-full text-center custom-input flex justify-center items-center px-0 h-[50px]">
                  {imageUrls === "" ? (
                    <>
                      {isUploadingImg ? (
                        <button className="text-white w-full text-[16px] font-semibold px-4 py-4 bg-gray-300 rounded">
                          Uploading ...
                        </button>
                      ) : (
                        <label
                          className="text-[16px] font-semibold bg-slate-100 py-2 rounded cursor-pointer"
                          htmlFor="fileUpload"
                        >
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            id="fileUpload"
                            onChange={handleImageUpload}
                            accept="image/png,image/jpg, image/jpeg"
                          />
                          Upload product image
                        </label>
                      )}
                    </>
                  ) : (
                    <button className="text-black w-full text-[16px] font-semibold px-4 py-4 bg-gray-200 rounded">
                      Image Uploaded
                    </button>
                  )}
                </div>

                {
                  imgFiles.length > 0 && (
                    <div className="text-center bg-gray-300 text-black font-medium mt-4 rounded grid grid-cols-3 px-2 py-4 gap-x-3">
                      {imgFiles?.map((urls,inx)=>(
                        <div className="flex gap-x-2 justify-center items-center">
                            <p className=" whitespace-nowrap text-ellipsis overflow-hidden" key={inx}>{urls?.name}</p>
                            <p
                              className="font-bold cursor-pointer"
                              onClick={() => setImageFiles([])}
                            >
                              x
                            </p>
                        </div>
                      ))}
                    </div>
                )}  

            </div>
            <div className="col-span-1 sm:col-span-1">
              {/* <div className="custom-input"></div> */}
              <Select
                id="selectWarna"
                instanceId="selectWarna"
                // isMulti
                isSearchable
                name="colors"
                className="basic-multi-select capitalize "
                classNamePrefix="select"
                options={allColors.map((item) => ({
                  value: item.color,
                  label: item.color,
                }))}
                onChange={handleWarnaChange}
                placeholder="Select color"
                value={selectedColor}
              />
            </div>
            <div className="col-span-1 sm:col-span-1">
              {imgFiles.length > 0 && selectedColor !== "" && (
                <button
                  type="button"
                  className="px-4 py-2 rounded-sm font-medium text-[15px] bg-black text-white flex justify-center items-center"
                  onClick={imageUploader}
                >
                  Upload
                </button>
              )}
            </div>
          </div>

          {/*------ regiular price -----*/}
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="custom-input-label">Regular Price</label>
            <div className="col-span-8 sm:col-span-4">
              <div className="flex flex-row">
                <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  ">
                  <select
                    className="bg-white list-none outline-none"
                    name="regPriceCurr"
                    value={productDetails?.regPriceCurr}
                    onChange={inputHandler}
                  >
                    <option value=""> curr </option>
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
                  value={productDetails.price}
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
                <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                  <select
                    className="bg-white list-none outline-none "
                    name="offerPriceCurr"
                    value={productDetails.offerPriceCurr}
                    onChange={inputHandler}
                  >
                    <option value=""> curr </option>
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
                  value={productDetails.discountedPrice}
                  onChange={inputHandler}
                  required
                  minLength={1}
                  maxLength={productDetails?.price}
                />
              </div>
              {isPriceError && (
                <span className="pt-2 px-4  text-red-600 text-[13px] font-medium mt-2">
                  Offer price should be less than regular price
                </span>
              )}
              <br />
              {isCurrError && (
                <span className="pt-2 px-4  text-red-600 text-[13px] font-medium mt-2">
                  Offer price currency should be same as regular price
                </span>
              )}
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
                placeholder="Add Category"
                className="custom-input"
                value={productDetails.category}
                onChange={inputHandler}
                required
                minLength={3}
                max={32}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {getallCategory.map((item) => (
                  <option
                    key={item.id}
                    value={item.title}
                    selected={item.title === productDetails.category}
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
                value={productDetails.quantity}
                onChange={inputHandler}
                required
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
                  className="custom-input "
                  value={productDetails.brand}
                  onChange={inputHandler}
                  required
                  minLength={3}
                  max={32}
                >
                  <option value="" disabled>
                    Select Brands
                  </option>
                  {getallBrand.map((items) => (
                    <option
                      key={items.id}
                      value={items.brand}
                      selected={items.brand === productDetails.brand}
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
              Product Colour
            </label>
            <div className="col-span-8 sm:col-span-4">
              <Select
                id="selectWarna"
                instanceId="selectWarna"
                isMulti
                isSearchable
                name="colors"
                className="basic-multi-select capitalize "
                classNamePrefix="select"
                options={allColors.map((item) => ({
                  value: item.color,
                  label: item.color,
                }))}
                onChange={handleMultiSelect}
                placeholder="Select color"
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
                className="w-full bg-cyan-600 py-3 text-center text-white mb-2 font-semibold text-[18px]"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default dynamic(() => Promise.resolve(AddProduct), { ssr: false });
