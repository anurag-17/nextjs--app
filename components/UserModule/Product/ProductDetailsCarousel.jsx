import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const ProductDetailsCarousel = ({ images, productColor, detailId }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.url[0] || "");


  const handleClick = (url) => {
    setSelectedImage(url);
  };

  useEffect(() => {
    const firstImageUrl = images.find((image) => image.color === productColor)
      ?.url[0];

    setSelectedImage(firstImageUrl || "");
  }, [productColor, images]);

  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center h-auto px-1 sm:px-0 py-[8px] gap-5">
        <div className="flex flex-row sm:flex-col h-[100px] sm:h-[300px]  sm:overflow-y-scroll">
          {productColor === "" ? (
            <>
              {images?.length > 0 &&
                images?.map((image, inx) => (
                  <div className="flex flex-col gap-5 mx-1" key={inx}>
                    {image?.url?.length > 0 && (
                      <div
                        className={`cursor-pointer border rounded active:border-lightBlue-800 p-1 my-1 
                ${selectedImage === image.url[0] ? " border-black " : "border-gray-300"}`}
                        onClick={() => handleClick(image.url[0])}
                      >
                        <Image
                          src={image.url[0]}
                          alt="product image"
                          className="rounded h-auto"
                          width={70}
                          height={70}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </>
          ) : (
            <>
              {images?.length > 0 &&
                images?.map((image, inx) => (
                  <div className="flex flex-col gap-5" key={inx}>
                    {image?.url?.map((urls, idx) => (
                      <div  key={idx}>
                        {image?.color === productColor && (
                          <div
                            className={`cursor-pointer border  border-gray-300 rounded p-2 w-[100px] 
                    ${selectedImage == urls ? " border-black" : ""}`}
                            onClick={() => handleClick(urls)}
                          >
                            <Image
                              key={idx}
                              src={urls}
                              alt=""
                              className="rounded h-auto "
                              width={70}
                              height={70}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </>
          )}
        </div>
        <div className="w-[75%] flex flex-col justify-center items-center">
          <div className="">
          <Link href={`${detailId ? `/product-details/${detailId}` : "#" }`}>
            {selectedImage === "" ? (
              <Image
                src={images[0]?.url[0] ? images[0]?.url[0] : ""}
                alt="product image"
                className="rounded-xl h-auto cursor-pointer "
                width={250}
                height={250}
              />
            ) : (
              <Image
                src={selectedImage ? selectedImage : "" }
                alt="selected image"
                className="rounded-xl h-auto cursor-pointer"
                width={250}
                height={250}
              />
            )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCarousel;
