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
        <h2 className="text-2xl font-semibold">Products Grid </h2>
        <h2>Welcome Back, Clint</h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 my-16">
        {
          dummyArr.map((items,ix)=>(
          <div className="max-w-[80%] border border-transparent hover:border hover:border-black px-4 py-4" key={ix}>
            <Image src={items.image} alt="" className=" mx-auto"  width={400} height={500}/>
           <div className="flex justify-between items-center my-4"> 
             <h6 className="text-lg font-semibold capitalize ">{items.title}</h6>
              <p className="text-md font-semibold capitalize ">{items.price}</p>
              </div>
              <p className="text-[16px] font-normal text-justify">{items.description} </p>
          </div>
          ))
        }
      </div>
    </section>
  );
};

export default ProductGrid;
