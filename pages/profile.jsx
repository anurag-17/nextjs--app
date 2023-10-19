import React from "react";
import dynamic from "next/dynamic";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const profile = () => {
  return (
    <>
      <div>
        <div className="bg-white m-4 p-5 ">
          <div className="flex my-auto  bg-[#F5F7FA] px-10 py-5">
            <div className=" w-1/12">
              <img src="/user.png" className="rounded-[60%]   mb-0" />
              <p className="text-blue-600 text-xl mx-8 cursor-pointer">
                Change
              </p>
            </div>
            <div className="my-auto ml-10 ">
              <h1 className="my-auto mx-5 text-[35px]">Hariom Patil</h1>
              <p className="text-blue-600 text-xl my-auto  mx-5">
                I am Professional Frontend Web Developer
              </p>
              <div className="flex mt-5 ml-5">
                <img class="h-9 w-13  " src="/fb.png" />
                <img class="h-9 w-13" src="/in.png" />
                <img class="h-9 w-13   " src="/twitter.png" />

                <PlusCircleIcon class="h-10 w-10 " />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-[25px] my-10">Personal Information</h1>
            {/* <h1 className="m-1 text-[18px]  text-2xl">Full Name : Hariom Patil  </h1> */}

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
                  <td className="p-53 text-gray-500 text-[18px] ">
                    hariompatil00gmail.com
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Phone</td>
                  <td className="px-10">:</td>
                  <td className="p-53 text-gray-500 text-[18px]">8989898989</td>
                </tr>
                <tr>
                  <td className="p-3 text-[20px]">Date of Birth </td>
                  <td className="px-10">:</td>
                  <td className="p-53 text-gray-500 text-[18px] ">
                    15/10/2000
                  </td>
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
<Link href="/passwordchange">

<button className=" border border-red-500 text-red-600 p-2">
            passwordchange
            </button>
</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(profile), { ssr: false });
