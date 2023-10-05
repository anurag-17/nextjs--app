import Image from "next/image";
import React from "react";

const dummyArr = [
  {
    id: 1,
    title: "test product",
    price: 13.5,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sapiente eum tempore? Nemo dolorum minus reprehenderit, corrupti, distinctio sunt aliquam id corrupti, distinctio sunt aliquam id .",
    image: "https://i.pravatar.cc",
    category: "electronic",
  },
  {
    id: 2,
    title: "test product",
    price: 13.5,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sapiente eum tempore? Nemo dolorum minus reprehenderit, corrupti, distinctio sunt aliquam id corrupti, distinctio sunt aliquam id.",
    image: "https://i.pravatar.cc",
    category: "electronic",
  },
  {
    id: 3,
    title: "test product",
    price: 13.5,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sapiente eum tempore? Nemo dolorum minus reprehenderit, corrupti, distinctio sunt aliquam id corrupti, distinctio sunt aliquam id.",
    image: "https://i.pravatar.cc",
    category: "electronic",
  },
];

const ProductGrid = () => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
       <div className="">
       <h2 className="text-2xl font-semibold">Add Product </h2>
        <p className="xl:text-[18px] lg:text-[16px] pt-1 font-normal">Add your product and necessary information from here</p>
       </div>
        <h2 className="xl:text-[18px] lg:text-[16px] font-normal">Welcome Back, Admin</h2>
      </div>
      
      {/*---- form start here ----*/}
      
      {/*---- form start here ----*/}

    </section>
  );
};

export default ProductGrid;
