import dynamic from "next/dynamic";
import React from 'react'
import UserNavbar from '../../components/UserModule/userNavbar'

const ProductFilter = () => {
  return (
    <>
    <UserNavbar/>
      <div>
      <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
            <h2 className="text-2xl font-semibold pb-4">All Product </h2>

            <div className="mb-3 w-[40%]">
              <input
                type="search"
                className=" border border-gray-500  p-3 rounded-xl focus:border-none w-11/12 "
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon1"
              />
            </div>
            <div className=" flex  gap-x-3"></div>
          </div>
      </div>
    </>
  )
}

export default dynamic(() => Promise.resolve(ProductFilter), { ssr: false });
