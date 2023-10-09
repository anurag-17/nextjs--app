import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  MagnifyingGlassPlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const ProductList = () => {

const [allProduct, setAllProduct] = useState([])

  useEffect(()=>{
    getAllProducts()
  },[])

  const getAllProducts = async() => {

    const options = {
      method: 'GET',
      url: 'https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct',
      headers: {
        cookie: 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw',
        'User-Agent': 'insomnia/2023.5.8'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      if(response.status===200){
        setAllProduct(response?.data)
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <>
      <section>
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold">Products List </h2>
          <h2>Welcome Back, Clint</h2>
        </div>
        <div className="flex justify-between items-center px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] mt-5">
          <input
            type="search"
            placeholder="Search Product"
            className="border border-gray-400 p-2 rounded-md w-3/12 cursor-pointer "
          />
          <select
            name="cars"
            id="cars"
            placeholder="Category"
            className="border border-gray-400 p-2 rounded-md w-3/12 bg-white cursor-pointer "
          >
            Category
            <option className="p-5" value="saab">
              Men's Cloth
            </option>
            <option value="opel">Women's Cloth</option>
            <option value="volvo">Watches</option>
            <option value="audi">Footwear's</option>
          </select>
          <select
            name="cars"
            id="cars"
            placeholder="Price"
            className="border border-gray-400 p-2 rounded-md bg-white w-3/12 cursor-pointer "
          >
            <option value="volvo">Low to High</option>
            <option value="saab">High to Low</option>
          </select>
        </div>

        <table class="table-auto bg-white w-full rounded-md mt-5">
          <thead className="">
            <tr className="bg-gray-200 text-gray-400 text-sm text-start ">
              <input type="checkbox" className="mx-3 mt-6 cursor-pointer " />
              <th className="text-start py-5 ">PRODUCT NAME</th>
              <th className="text-start">CATEGORY</th>
              <th className="text-start">PRICE</th>
              <th className="text-start">SALE PRICE</th>
              <th className="text-start">STOCK</th>
              <th className="text-start">COLOUR</th>
              <th className="text-start">STATUS</th>
              <th className="text-start">VIEW</th>
              <th className="text-start">ACTION</th>
            </tr>
          </thead>
          {allProduct?.map((item, index) => (
            <tbody>
              <tr>
             <td  className=""> <input type="checkbox" className="mx-3 mt-6 cursor-pointer " /></td>
              <td className="py-5 text-[18px]">{item?.title}</td>
              <td className="py-5 text-[18px]"> {item?.category}</td>
              <td className="py-5 text-[18px]">{item?.price}</td>
              <td className="py-5 text-[18px] tex">{item?.brand}</td>
              <td className="py-5 text-[18px] tex"> {item?.quantity}</td>
              <td className="py-5 text-[18px] tex"> {item?.color?.map((optn,inx)=>(
                <p className=" capitalize text-[16px] font-normal leading-[30px]" key={inx}>{optn}</p>
              ))}</td>
              <td className="py-5 text-[18px] tex">
                <p className=" bg-green-100 p-1 text-center rounded-xl text-green-700 w-20">
                  selling
                </p>
              </td>
              <td>
                <button>
                  <MagnifyingGlassPlusIcon className="cursor-pointer h-6 w-6 text-gray-500" />
                </button>
              </td>
              <td className="flex justify-around">
                <Link href={`/edit-product/${item?._id}`}>
                <button>
                  <PencilSquareIcon className="cursor-pointer h-6 w-6 text-gray-500" />
                </button>
                </Link>
                <button>
                  <TrashIcon className="cursor-pointer h-6 w-6 text-gray-500" />
                </button>
                </td>
              </tr>
             
            </tbody>
          ))}

          </table>
      </section>
    </>
  );
};

export default ProductList;