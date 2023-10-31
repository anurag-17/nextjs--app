import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const vendorgrid = () => {
  const [getAllVendor, setgetAllVendor] = useState([]);

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/vendor/getAllVendors",
  };

  useEffect(() => {
    defaultVendor();
  }, []);

  const defaultVendor = () => {
    axios
      .request(options)
      .then((response) => {
        setgetAllVendor(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="flex justify-between items-center pt-4 my-5 px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">Vendor List </h2>
        <h2>Welcome Back, Client</h2>
      </div>
      <div className="flex flex-wrap  justify-around ">
        {getAllVendor.map((item) => (
          <div className="border rounded-lg bg-white w-[28%] p-8 my-5">
            <div className="flex">
              {/* vender profile image */}
              <div className="w-36 mt-14 ">
                <img
                   src="/profile.png"
                  className="w-20  border-[5px] border-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-full"
                />
              </div>
              <div>
                <h1 className="text-[28px] font-medium">{item?.vendorName}</h1>
                <div className="flex my-5">
                  <img src="/ph.svg" className="mr-3  w-5" />
                  <h2 className="text-gray-500 text-[20px] font-medium">
                    <a href="tel:8349335812">{item?.phone}</a>
                  </h2>
                </div>
                <div className="flex my-5">
                  <img src="/mail.svg" className="mr-3  w-5" />
                  <h2 className="text-gray-500 text-[20px] font-medium">
                    <a href="mailto:hariompatil9@gmail.com">{item?.email}</a>
                  </h2>
                </div>
                <div className="flex my-5">
                  <img src="/location.svg" className="mr-3  w-6" />
                  <h2 className="text-gray-500 text-[20px] font-medium">
                    <a href="tel:0731-22552255">{item?.address}</a>
                  </h2>
                </div>
              </div>
            </div>
            <hr className="my-7" />
            <div className="flex pt-6">
              <div>
                <p className="text-[22px]">Items </p>
                <p className=" text-[22px] font-medium my-3">120</p>
              </div>
              <div className="w-[2px] bg-gray-300 h-20  mx-auto "></div>
              <div>
                <p className="text-[22px]">Sells</p>
                <p className=" text-[22px] font-medium my-3">1206</p>
              </div>
              <div className="w-[1px] bg-gray-300 h-20 mx-auto "></div>
              <div>
                <p className="text-[22px]">Earning</p>{" "}
                <p className=" text-[22px] font-medium my-3">92852</p>
              </div>
            </div>
          <div>
          <button className="border py-2 px-5 w-full mt-5 rounded-lg bg-sky-600 text-white text-[20px] ">View</button>
          </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default vendorgrid;
