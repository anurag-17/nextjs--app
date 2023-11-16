import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useState } from "react";

const ProductDetailsCarousel = ({ images, productColor }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.url[0] || "");
  const [selectedColor, setselectedColor] = useState("");
  

  const handleClick = (url) => {
    setSelectedImage(url);
    
  };

  useEffect(() => {
    const firstImageUrl = images.find((image) => image.color === productColor)?.url[0];
    
    setSelectedImage(firstImageUrl || "");
  }, [productColor, images]);


  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <div className="flex justify-center h-auto">
        <div className="w-[25%]">
          {images?.length > 0 &&
            images?.map((image, inx) => (
              <>
                <div className="flex flex-col gap-5">
                  {image?.url?.map((urls, idx) => (
                    <>
                      {image?.color === productColor && (
                        <div
                          className={`cursor-pointer border  border-gray-300 rounded p-2 w-[100px] 
                          ${selectedImage == urls ? " border-black" : ""}`}
                          key={idx}
                          onClick={() => handleClick(urls)}
                        >
                          <Image
                            key={idx}
                            src={urls}
                            alt=""
                            className="rounded-xl h-auto "
                            width={80}
                            height={80}
                          />
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </>
            ))}
        </div>
        <div className="w-[75%]">
          <div className="">
            {selectedImage === "" ? (
              <Image
                src={images[0]?.url[0]}
                alt="selectedImage"
                className="rounded-xl h-auto "
                width={400}
                height={400}
              />
            ) : (
                <Image
                src={selectedImage}
                alt="selectedImage"
                className="rounded-xl h-auto "
                width={400}
                height={400}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCarousel;
