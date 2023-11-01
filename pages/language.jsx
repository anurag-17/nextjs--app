import React from "react";

const language = () => {
  return (
    <>
      <div className="flex justify-between items-center pt-4 my-4 px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <div>
          <h2 className="text-2xl font-semibold ">Language </h2>
          
          <p className="mb-19">Home / Language</p>
        </div>

        <div className="mb-3 w-[40%]">
        <input
              type="search"
              className=" border border-gray-500  p-3 rounded-xl focus:border-none w-11/12 "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
        </div>
        <h2>Welcome Back, Client</h2>
      </div>
      <div className="bg-white border border-gray-300 rounded-md p-4 flex flex-wrap ">
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">English</h1>
          </div>  
          <div>
            <img src="/flag-1.png" className="mr-5" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">Arabic</h1>
          </div>
          <div>
            <img src="/flag-2.png" className="mr-5" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">Bengali</h1>
          </div>
          <div>
            <img src="/flag-3.png" className="mr-5" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">Chinese</h1>
          </div>
          <div>
            <img src="/flag-4.png" className="mr-5" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">Portuguese</h1>
          </div>
          <div>
            <img src="/flag-5.png" className="mr-5" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">Spanish</h1>
          </div>
          <div>
            <img src="/flag-6.png" className="mr-5" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">Russian</h1>
          </div>
          <div>
            <img src="/flag-7.png" className="mr-5" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">German</h1>
          </div>
          <div>
            <img src="/flag-8.png" className="mr-5" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">Romanian</h1>
          </div>
          <div>
            <img src="/flag-9.png" className="mr-5" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] flex justify-between p-5 w-[48%] m-4 rounded-lg">
          <div className="flex">
            <input type="checkbox" className="w-5 mx-4" />
            <h1 className="text-[18px] font-medium mt-1 ">French</h1>
          </div>
          <div>
            <img src="/flag-10.png" className="mr-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default language;
