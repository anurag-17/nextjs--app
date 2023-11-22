import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/AdminModule/Header";
import ProductDetailsCarousel from "../../components/UserModule/Product/ProductDetailsCarousel";

const EditProduct = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setLoading] = useState(false);
 
  const [productDetail, setProductDetail] = useState({});
  const [productColor, setProductColor] = useState("");
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
        if (Array.isArray(response.color) && response.color.length > 0) {
          setProductColor(response?.color[0]);
        }
      })
      .catch((err) => console.error(err));
  };
  const handleColorChange = (productId, selectedColor) => {
    setProductColor(selectedColor);
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen">
        <ToastContainer />
        <Header
          headTitle="Product Details"
          subTitle="Add your product and necessary information from here"
        />
        <main className="h-full overflow-y-auto pt-[40px]">
          <div className="container grid px-6 mx-auto">
           
            <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
              <div className="flex flex-col lg:flex-row md:flex-row w-full overflow-hidden gap-20">
                <div className="flex-shrink-0 flex items-center justify-center h-auto">
                 <ProductDetailsCarousel
                 images={productDetail?.images || []}
                 productColor={productColor}/>
                </div>
                <div className="w-full flex flex-col p-5 md:p-8 text-left">
                  <div className="mb-5 block ">
                    <div className="font-serif font-semibold py-1 lg:text-[18px] text-sm ">
                      <p className="lg:text-[30px]  text-gray-500  flex gap-5 leading-8 ">
                        <span className="text-lightBlue-600 leading-8 text-[30px]">
                          {productDetail?.title} Showing
                        </span>
                      </p>
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
                      QUANTITY:
                      </div>
                      <div className="text-[18px] xl:text-[20px] font-semibold leadinng-[28px] capitalize">
                      {productDetail?.quantity}
                      </div>
                    </div>
                  <div className="flex text-left mt-4">
                      <div className="w-[160px] text-[20px] font-normal leadinng-[28px]">
                      Offer price :
                      </div>
                      <div className="text-[18px] xl:text-[20px] font-semibold leadinng-[28px] capitalize">
                      {productDetail.discountedPrice}
                      </div>
                    </div> 
                    <div className="flex text-left mt-4">
                      <del className="w-[160px] text-[20px] font-normal leadinng-[28px]">
                      Regular Price :
                      </del>
                      <del className="inline-block text-[18px] xl:text-[20px] font-semibold leadinng-[28px] capitalize">
                      ₹{productDetail.price}
                      </del>
                    </div> 
                    <div className="flex text-left mt-4">
                      <div className="w-[160px] text-[20px] font-normal leadinng-[28px]">
                      Color :
                      </div>
                      <div className="text-[18px] flex gap-5 items-center xl:text-[20px]  font-semibold leadinng-[28px] capitalize">
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
                       
                      </div>
                      </div>
                    </div>
                    <div className="text-[18px] xl:text-[20px] font-medium leadinng-[28px] capitalize mt-9 ">
                        {productDetail?.description}
                      </div>
                   
                  </div>
                  <div className="font-serif product-price font-bold dark:text-gray-400">

                    
                 
                    
                  </div>
                  
                  
                 
                 
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default dynamic(() => Promise.resolve(EditProduct), { ssr: false });