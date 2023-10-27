import React from "react";
import dynamic from "next/dynamic";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./userNavbar";

const UserProfile = () => {
  const [id, setId] = useState("");
  const [response, setResponse] = useState("");
  const [getAllCustomer, setGetAllCustomer] = useState([]);

  const options = {
    method: "GET",
    url: "https://e-commerce-backend-brown.vercel.app/api/auth/getaUser",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "PostmanRuntime/7.33.0",
    },
  };

  useEffect(() => {
    defaultCustomer();
  }, []);

  const defaultCustomer = () => {
    axios
      .request(options)
      .then((response) => {
        setGetAllCustomer(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response) {
          console.error("Server Response Data:", error.response.data);
        }
      });
  };

  return (
    <>
    <UserNavbar/>
      <div className=" px-20 ">
      <h1 className="text-[30px] pl-10 mb-5">Your Account</h1>
        <div className="bg-white ml-5 p-5 ">
          <div className="flex my-auto  bg-[#e2eaf5] px-10 py-5">
            <div className=" w-1/12">
              <img src="/user.png" className="rounded-[60%]   mb-0" />
              <p className="text-sky-600 text-xl mx-3 cursor-pointer">Change</p>
            </div>
            <div className="my-auto ml-10 ">
              {getAllCustomer.map((items) => (
                <h1 className="my-auto mx-5 text-[35px]">
                  {" "}
                  {items?.firstname}
                </h1>
              ))}
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
                    Hariom Patil
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
                    hariompatil00gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Phone</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px]">8989898989</td>
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
                    Palasia, Indore
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

export default dynamic(() => Promise.resolve(UserProfile), { ssr: false });
