import React from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";

import UserNavbar from "./userNavbar";


const UserProfile = ({getAllCustomer}) => {

  return (
    <>
      <UserNavbar />
      <div className=" px-20 ">
        <h1 className="text-[30px] pl-10 mb-5">Your Account</h1>
        <div className="bg-white ml-5 p-5 ">
          <div className="flex my-auto  bg-[#e2eaf5] px-10 py-5">
            <div className=" w-1/12">
              <img src="/user.png" className="rounded-[60%]   mb-0" />
              <p className="text-sky-600 text-xl mx-10  cursor-pointer">Change</p>
            </div>
            <div className="my-auto ml-10 ">
              <h1 className="my-auto mx-5 text-[35px]">
                {" "}
                {getAllCustomer?.firstname} {getAllCustomer?.lastname}
              </h1>
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
                    {getAllCustomer?.firstname} {getAllCustomer?.lastname}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">About</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px] ">
                    {getAllCustomer?.about}
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
                  <td className="p-3 text-gray-500 text-[18px]">
                    {" "}
                    {getAllCustomer?.mobile}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Date of Birth </td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px] ">
                    {" "}
                    {getAllCustomer?.dob}
                  </td>
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
                  <td className="p-3 text-gray-500 text-[18px]  ">
                    {" "}
                    {getAllCustomer?.country}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Language</td>
                  <td className="px-10">:</td>
                  <td className="p-3 text-gray-500 text-[18px] ">
                    {getAllCustomer?.language}
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
