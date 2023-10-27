import React from "react";
import dynamic from "next/dynamic";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const profile = () => {
  const [id, setId] = useState("");
  const [response, setResponse] = useState("");
  const [getAllCustomer, setGetAllCustomer] = useState();
  const [customerID, setCustomerID] = useState(JSON.parse(localStorage.getItem("userDetails")))
 

  useEffect(() => {
    defaultCustomer();
  }, []);

  const defaultCustomer = () => {
    console.log("customerid",customerID);
  
    axios.post("https://e-commerce-backend-brown.vercel.app/api/auth/getaUser", {
      _id: customerID
    }, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.33.0"
      }
    })
      .then((res) => {
        console.log("aa",res.data.getaUser);
        setGetAllCustomer(res.data.getaUser)
        // Assuming the response contains data property, adjust this based on the actual API response structure
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="">
        <div className="bg-white ml-5 p-5 ">
          <div className="flex my-auto  bg-[#F5F7FA] px-10 py-5">
            <div className=" w-1/12">
              <img src="/user.png" className="rounded-[60%]   mb-0" />
              <p className="text-sky-600 text-xl mx-3 cursor-pointer">Change</p>
            </div>
            <div className="my-auto ml-10 ">
              {/* {getAllCustomer.map((items) => (
                <h1 className="my-auto mx-5 text-[35px]">
                  {" "}
                  {getAllCustomer?.firstname}
                </h1>
              ))} */}

              {getAllCustomer?.firstname}
              <p className="text-sky-600 text-xl my-auto  mx-5">
                I am Professional Frontend Web Developer
              </p>
              <div className="flex mt-5 ml-5 justify-evenly w-6/12">
                <Link href="https://www.facebook.com" target="_blank">
                  {" "}
                  <img class="h-9 w-13  " src="/fb.svg" />
                </Link>
                <Link href="https://www.linkedin.com" target="_blank">
                  {" "}
                  <img class="h-9 w-13" src="/in.svg" />
                </Link>
                <Link href="https://twitter.com">
                  {" "}
                  <img class="h-9 w-13   " src="/twitterr.svg" />
                </Link>
                <img class="h-9 w-13   " src="/add.svg" />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-[25px] my-10">Personal Information</h1>
            <table className="table-fixed ">
              <tbody>
                <tr>
                  <td className="p-3 text-[20px]">Full Name</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px]">
                  {getAllCustomer?.firstname}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">About</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px] ">
                    i am a frontend web developer
                  </td>
                </tr>
                <tr>
                  <td className="p-3  text-[20px] ">Email</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px] ">
                  {getAllCustomer?.email}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Phone</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px]"> {getAllCustomer?.mobile}</td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Date of Birth </td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px] ">15/10/2000</td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Address</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px] ">
                  {getAllCustomer?.address}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Country</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px]  ">India</td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Language</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px] ">
                    Hindi, English
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <Link href="/passwordchange">
                <button className=" border border-red-500 text-red-600 p-2">
                  Password Change
                </button>
              </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(profile), { ssr: false });
