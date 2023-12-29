import axios from "axios";
import Select from "react-select";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const [getallSubCategory, setGetallSubCategory] = useState([]);
  const [getallBrand, setGetallBrand] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const { auth_token } = useSelector((state) => state.adminAuth || null);
  const [imgFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState("");
  const [allColors, setColors] = useState([]);
  const [getallColor, setGetallColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectColor, setSelectColor] = useState([]);
  const [imgByColor, setImgBycolor] = useState({
    public_id: "",
    url: [],
    color: "",
  });
  const [isUploadingImg, setUploadingImg] = useState(false);

  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    images: "",
    price: "",
    discountedPrice: "",
    regPriceCurr: "",
    offerPriceCurr: "",
    category: "",
    subCategory: "",
    brand: "",
    quantity: "",
    color: "",
    sizeChart: ["xs", "s", "m", "l", "xl"],
  });

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const handleMultiSelect = async (e) => {
    let newColor = e.map((item) => item?.value);
    setProductDetails({ ...productDetails, ["color"]: newColor });
    // productDetails.color.push(newColor)
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
    defaultSubCategory();
  }, []);

  const defaultSubCategory = () => {
    const option = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/subCategory/getallSubCategory",
    };
    axios
      .request(option)
      .then((response) => {
        setGetallSubCategory(response?.data);
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
        console.log(response, "jjj");
        // setImageFiles(response.images)
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
        authorization: auth_token,
      },
      data: productDetails,
      data: {
        title: productDetails?.title ? productDetails?.title : editData?.title,
        description: productDetails?.description
          ? productDetails?.description
          : editData?.description,
        images: productDetails?.images
          ? productDetails?.images
          : editData?.images,
        price: productDetails?.price ? productDetails?.price : editData?.price,
        discountedPrice: productDetails?.discountedPrice
          ? productDetails?.discountedPrice
          : editData?.discountedPrice,
        category: productDetails?.category
          ? productDetails?.category
          : editData?.category,
        subCategory: productDetails?.subCategory
          ? productDetails?.subCategory
          : editData?.subCategory,
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

  useEffect(() => {
    getAllSizes();
  }, []);

  const getAllSizes = () => {
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/chart/getAllSizeCharts",
    };

    axios
      .request(options)
      .then((response) => {
        setAllSizes(response?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    const sizeInputHandlers = (size) => {
      const updatedSizes = productDetails.sizeChart.includes(size)
        ? productDetails.sizeChart.filter((s) => s !== size)
        : [...productDetails.sizeChart, size];

      setProductDetails({
        ...productDetails,
        sizeChart: updatedSizes,
      });
    };
  };

  // const handleImageDelete = (indexToDelete) => {
  //   const updatedImgFiles = imgFiles.filter(
  //     (_, index) => index !== indexToDelete
  //   );
  //   console.log(updatedImgFiles, "image");

  //   setImageFiles(updatedImgFiles);
  // };

  const MAX_IMAGES = 5;
  const handleImageUpload = (event) => {
    const files = event.target.files;

    if (imgFiles.length + files.length > MAX_IMAGES) {
      alert(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }
    setImageFiles([...imgFiles, event.target.files[0]]);
    setUploadingImg(true);
    setUploadingImg(false);
  };

  // ----------image upload---------

  const imageUploader = async () => {
    const formData = new FormData();

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append("images", imgFiles[i]);
    }
    try {
      const res = await uploadImage(formData);
      console.log(res);

      if (res?.status === 200) {
        editData.images.push({
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
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Image upload error", error);
      throw error;
    }
  };

  // ----------color----------

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/color/getColors",
  };
  useEffect(() => {
    defaultColor();
  }, [isRefresh]);

  const defaultColor = () => {
    axios
      .request(options)
      .then((response) => {
        setGetallColor(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleWarnaChange = async (e) => {
    setSelectedColor(e);
    setSelectColor(e?.value);
    setImgBycolor({ ...imgByColor, ["color"]: e?.value });
  };

  const handleImageDelete = (ind) => {
    const newData = editData.images.filter((item, index) => index !== ind);
    editData.images = newData;
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <ToastContainer />
        <div className="flex justify-between items-center border border-[#f3f3f3] rounded-lg bg-white 2xl:h-[100px] 2xl:px-10 xl:h-[80px] xl:px-5 lg:h-[60px] lg:px-4 lg:mt-0 md:h-[60px] md:px-4  md:mt-5 sm:h-[60px] sm:px-4  sm:mt-5  edit-p-nav">
          <div className="">
            <h2 className="2xl:text-[30px] xl:text-[18px] lg:text-[17px] md:text-[16px] sm:text-[16px] text-[8px] font-semibold edit-product">
              Edit Product{" "}
            </h2>
            <p className="xl:text-[18px] lg:text-[16px] font-normal"></p>
          </div>
          <h2 className="2xl:text-[22px] xl:text-[14px] lg:text-[13px] md:text-[12px] sm:text-[12px] font-normal edit-welcome">
            Welcome Back, Admin
          </h2>
        </div>
        <div className="bg-white 2xl:py-10 2xl:mt-[44px] xl:py-5 xl:mt-[24px] lg:mt-[20px] md:mt-[20px] mt-[20px]  lg:py-4 md:py-3 py-2 ">
          <div className="2xl:h-[100px] xl:h-[80px] lg:h-[60px] md:h-[50px] sm:h-[50px] ">
            <h2 className=" font-semibold text-green-600 2xl:text-[30px] 2xl:leading-[30px] 2xl:px-6 xl:text-[20px] xl:leading-[25px] xl:px-5 lg:text-[20px] lg:leading-[25px] lg:px-5 md:px-3  px-2">
              Edit Basic Info
            </h2>
            <div className="border-b border-[#f3f3f3] 2xl:mt-6 w-full">
              <div className="border-b border-green-600 2xl:w-[250px] xl:w-[170px] lg:w-[170px] md:w-[130px] w-[130px]"></div>
            </div>
          </div>
          {/*---- form start here ----*/}
          <form action="" onSubmit={handleFormSubmit}>
            <div className=" flex-grow w-full h-full max-h-full 2xl:px-6 2xl:pt-8 2xl:pb-40  md:pb-32 lg:pb-32 xl:pb-32">
              {/*------ title -----*/}
              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6  mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6 ">
                <label
                  htmlFor=""
                  className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0"
                >
                  Product Title/Name
                </label>
                <div className="col-span-8 sm:col-span-4 ml-2 sm:ml-0 ">
                  <input
                    type="text"
                    name="title"
                    placeholder="Product Title/Name"
                    className="custom-input 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
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
              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6">
                <label
                  htmlFor=""
                  className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0"
                >
                  Product Description
                </label>
                <div className="col-span-8 sm:col-span-4 ml-2 sm:ml-0">
                  <textarea
                    rows="6"
                    className="custom-input 2xl:text-[20px] 2xl:leading-[30px]  xl:text-[14px] xl:leading-[22px] lg:text-[12px] lg:leading-[20px] md:text-[10px] md:leading-[16px] text-[8px] leading-[14px]"
                    name="description"
                    placeholder="Product Description"
                    spellCheck="false"
                    defaultValue={
                      editData?.description
                        ? editData?.description
                        : productDetails.description
                    }
                    onChange={inputHandler}
                    required
                    minLength={10}
                    max={500}
                  ></textarea>
                </div>
              </div>

              {/*------ images -----*/}
              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6">
                <label
                  htmlFor=""
                  className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0"
                >
                  Product Images
                </label>
                <div className="col-span-8 sm:col-span-4 ml-2 sm:ml-0">
                  <div className=" gap-x-2 justify-center items-center">
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden"></p>
                    {imageUrls === "" ? (
                      <>
                        {isUploadingImg ? (
                          <button className="text-white w-full text-[16px] font-semibold px-4 py-4 bg-gray-300 rounded">
                            Uploading ...
                          </button>
                        ) : (
                          <label
                            className=" custom-input flex justify-center items-center  2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] "
                            htmlFor="fileUpload"
                          >
                            <input
                              type="file"
                              className="hidden my-auto  md:text-[12px] text-[10px]"
                              multiple
                              id="fileUpload"
                              onChange={handleImageUpload}
                              accept="image/png,image/jpg, image/jpeg"
                              defaultValue={
                                editData?.images
                                  ? editData?.images
                                  : productDetails.images
                              }
                            />
                            Upload product image
                          </label>
                        )}
                      </>
                    ) : (
                      <button
                        className="text-black w-full text-[16px] font-semibold px-4 py-4 bg-gray-200 rounded"
                        onClick={imageUploader}
                      >
                        Image Uploaded
                      </button>
                    )}
                    <div className="flex flex-wrap gap-5"></div>

                    <div className="my-2">
                      <label className="custom-input-label font-semibol 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px] my-1 ml-2">
                        Uploaded Images :
                      </label>

                      {editData?.images && (
                        <div className="flex gap-5">
                          {editData.images.map((image, ind) => (
                            <div key={ind} className="flex items-center">
                              <div className="xl:w-20 2xl:w-40 mx-auto text-center ">
                                <img
                                  src={image?.url[0]}
                                  alt={`Image ${ind}`}
                                  className="h-auto my-1 cursor-pointer w-20 sm:w-12 md:w-14 lg:w-16 xl:w-20 2xl:w-40 ml-2"
                                />
                                <button
                                  onClick={() => handleImageDelete(ind)}
                                  className="my-1 xl:text-[20px] lg:text-[16px] 2xl:text-[25px]"
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {imgFiles.length > 0 && (
                        <div className="mt-5 font-semibold">
                          <label className="custom-input-label font-semibold 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] my-1">
                            New Images :
                          </label>
                          <div className="text-center bg-gray-300 text-black font-medium mt-1 rounded grid grid-cols-3 px-2 py-4 gap-x-3">
                            {imgFiles.map((file, index) => (
                              <div
                                className="flex gap-x-2 justify-center items-center"
                                key={index}
                              >
                                <p className="whitespace-nowrap text-ellipsis overflow-hidden">
                                  {file?.name}
                                </p>
                                <p
                                  className="font-bold cursor-pointer"
                                  onClick={() => handleImageDelete(index)}
                                >
                                  x
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className=" flex gap-5 col-span-1 sm:col-span-1">
                        {/* <div className="custom-input"></div> */}
                        <Select
                          id="selectWarna"
                          instanceId="selectWarna"
                          // isMulti
                          isSearchable
                          name="colors"
                          className="basic-multi-select capitalize my-3 h-[20px] 2xl:text-[20px] xl:text-[16px] lg:text-[14px]  md:text-[12px] text-[10px]"
                          classNamePrefix="select"
                          options={getallColor.map((item) => ({
                            value: item.color,
                            label: item.color,
                          }))}
                          onChange={handleWarnaChange}
                          placeholder="Select color"
                          value={selectedColor}
                        />

                        <div className="col-span-1 sm:col-span-1 my-3 ">
                          <button
                            type="button"
                            className="xl:px-4 xl:py-1 xl:text-[15px] md:px-3 md:py-1 md:text-[12px] px-3 py-1 text-[10px] rounded-lg font-medium  bg-black text-white flex justify-center items-center "
                            onClick={imageUploader}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*----- Regular price -----*/}
              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6 w-11/12 sm:w-full">
                <label className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0">
                  Product Price
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <div className="flex flex-row ml-2 sm:ml-0">
                    <span className="inline-flex items-center  pl-1 rounded rounded-r-none border border-r-0 border-gray-300 text-sm focus:bg-white dark:border dark:border-gray-600 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px]">
                      <select
                        className="bg-white list-none outline-none 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
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
                      className="custom-input rounded rounded-l-none 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
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
              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6 w-11/12 sm:w-full">
                <label className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0">
                  Offer Price
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <div className="flex flex-row ml-2 sm:ml-0">
                    <span className="inline-flex items-center  px-1 rounded rounded-r-none border border-r-0 border-gray-300 text-sm focus:bg-white dark:border dark:border-gray-600 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] ">
                      <select
                        className="bg-white list-none outline-none 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
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
                      name="discountedPrice"
                      placeholder="OfferPrice"
                      className="custom-input rounded rounded-l-none 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px] "
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
              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6">
                <label
                  htmlFor=""
                  className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0"
                >
                  Product Category
                </label>

                <div className="col-span-8 sm:col-span-4 ml-2 sm:ml-0">
                  <select
                    name="category"
                    className="custom-input 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
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
                        className="2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
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

              {/*------ sub category -----*/}

              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6">
                <label
                  htmlFor=""
                  className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0"
                >
                  Product Sub Category
                </label>

                <div className="col-span-8 sm:col-span-4 ml-2 sm:ml-0">
                  <select
                    name="subCategory"
                    className="custom-input 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
                    defaultValue={
                      editData?.subCategory
                        ? editData.subCategory
                        : productDetails.subCategory
                    }
                    onChange={inputHandler}
                    required
                    minLength={3}
                    maxLength={32}
                  >
                    <option value="" disabled>
                      {editData?.subCategory
                        ? editData.subCategory
                        : productDetails.subCategory}
                    </option>
                    {getallSubCategory
                      .filter((item, indr) => {
                        return (
                          item?.category?.title === productDetails.category
                        );
                      })
                      .map((item) => (
                        <option
                          className="2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
                          key={item.id}
                          value={item.title}
                          selected={
                            item.title ===
                            (editData?.title || productDetails.subCategory)
                          }
                        >
                          {item?.subCategory}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/*------ quantity -----*/}
              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6">
                <label
                  htmlFor=""
                  className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0"
                >
                  Product Quantity
                </label>
                <div className="col-span-8 sm:col-span-4 ml-2 sm:ml-0">
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Add quantity"
                    className="custom-input 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
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
              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6">
                <label
                  htmlFor=""
                  className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0"
                >
                  Product Brand
                </label>
                <div className="col-span-8 sm:col-span-4 ">
                  <div className="col-span-8 sm:col-span-4 ml-2 sm:ml-0">
                    <select
                      type="text"
                      name="brand"
                      placeholder="Add Brand Name"
                      className="custom-input uppercase 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
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
              <div className="grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6"> 
                <label
                  htmlFor=""
                  className="custom-input-label 2xl:text-[20px] xl:text-[16px] lg:text-[14px] md:text-[12px] sm:text-[10px] text-[12px] px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-0"
                >
                  Product Color
                </label>
                <div className="col-span-8 sm:col-span-4 ml-2 sm:ml-0 w-11/12 sm:w-full h-[20px]">
                  <Select
                    id="selectWarna"
                    instanceId="selectWarna"
                    isMulti
                    isSearchable
                    defaultValue={
                      editData?.color ? editData.color : productDetails.color
                    }
                    name="color"
                    className="basic-multi-select capitalize 2xl:text-[20px] xl:text-[14px] lg:text-[12px] md:text-[10px] text-[8px]"
                    classNamePrefix="select"
                    options={getallColor.map((item) => ({
                      value: item.color,
                      label: item.color,
                    }))}
                    onChange={handleMultiSelect}
                    placeholder="Select color"
                    required
                  >
                    {editData &&
                      Array.isArray(editData) &&
                      editData.map((item) => <p key={item.id}>{item.images.color}</p>)}
                  </Select>
                </div>
              </div>

              <div className="">
                {(productDetails.category === "Clothing" ||
                  productDetails.category === "Women's Clothing" ||
                  productDetails.category === "Men's Clothing") && (
                  <>
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <div className="w-full grid grid-cols-6 gap-1 sm:gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 sm:mt-0  sm:mb-2 md:mb-3 lg:mb-4  xl:mb-6 ">
                        <label htmlFor="" className="custom-input-label w-full">
                          Product Sizes
                        </label>

                        <div className="col-span-8 sm:col-span-4 ml-2 sm:ml-0 flex">
                          {allSizes?.map((size) => (
                            <div className="" key={size?._id}>
                              {size?.sizeChart?.map((items) => (
                                <div
                                  key={items?._id}
                                  className="flex gap-x-1 mx-3"
                                >
                                  <input
                                    type="checkbox"
                                    id={items?._id}
                                    checked={productDetails?.sizeChart.includes(
                                      items?.size
                                    )}
                                    onChange={() =>
                                      sizeInputHandlers(items?.size)
                                    }
                                    className="text-[20px] gap-5"
                                  />
                                  <label
                                    htmlFor={items._id}
                                    className="text-[20px]"
                                  >
                                    {items?.size}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              {/*------ submit button -----*/}
              <div className="xl:mt-14 lg:mt-10 md:mt-8 sm:mt-6 mt-5">
                {isLoading ? (
                  <button
                    type="button"
                    className="w-full  text-cyan-600 xl:py-3  md:py-2  py-1 text-center bg-white mb-2 border border-cyan-600 font-semibold xl:text-[16px] lg:text-[14px]"
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    // onClick={handlesubmit}
                    className="w-full bg-cyan-600 xl:py-3  md:py-2  py-[6px] text-center text-white mb-2 font-semibold xl:text-[16px] lg:text-[14px] sm:text-[12px] text-[10px]"
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
