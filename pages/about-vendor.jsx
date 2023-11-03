import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

const AboutVendor = () => {

 
  const [getVendor, setGetVendor] = useState();
 

  useEffect(() => {
    defaultCustomer();
  }, []);

  const defaultCustomer = () => {
  
    axios.get("https://e-commerce-backend-brown.vercel.app/api/auth/getaVendor",
    //  {
    //   _id: customerID
    // },
     {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.33.0"
      }
    })
      .then((res) => {
        console.log("aa",res.data);
        setGetVendor(res.data)
        // Assuming the response contains data property, adjust this based on the actual API response structure
      })
      .catch((error) => {
        console.error(error);
      });
  };




  return (
    <>
      <div className="border p-7 my-10 bg-white rounded-lg">
        <div>
          <h1 className="text-[25px] font-semibold">Biodata</h1>
          <p className="my-5 leading-8 text-[20px] text-gray-700">
            Hi I'm Petey Cruiser,has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took Link galley of
            type. Done pede justo, a fringilla vel, aliquet nec,vulputate eget,
            arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
            justo. Nullam dictum felis eu pede mollis pretium. Integer
            tincidunt.Cras dapibus. Vivamus elementumsemper nisi. Aenean
            vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
            consequat vitae, eleifend ac, enim.
          </p>
        </div>
        <hr className="my-7 " />
        <div className="flex justify-between  ">
          <div className="6/12">
            <h1 className="text-[25px] font-semibold">Contact</h1>
            <div className="border rounded-lg p-2 w-96 my-3 flex">
              <img src="/location.svg" className="w-6 mr-2" />
              <h1>301, saket, Indore</h1>
            </div>
            <div className="border rounded-lg p-2 w-96 my-3">
              <Link href="mailto:hariompatil00gmail.com">
              <div className="flex">
              <img src="/mail.svg" className="w-6  mr-2" />
              <h1>Email :  hariompatil00gmail.com</h1>
              </div>
              </Link>
            </div>
            <div className="border rounded-lg p-2 w-96 my-3 flex"  >
            <Link href="tel:+22 (5) 789 0001">
              <div className="flex">
              <img src="/ph.svg" className="w-6  mr-2" />
              <h1>Phone : +22 (5) 789 0001</h1>
              </div>
              </Link>
            </div>
          </div>
          <div className="w-6/12">
            <h1 className="text-[25px] font-semibold mx-2">Social</h1>
            <div className="flex flex-wrap">
              <div className="m-2">
                <Link href="https://www.linkedin.com/home" target="_blank">
                  <div className="   border p-[2px]  rounded-lg  w-40 flex ">
                    <img
                      src="/linkedin-161-svgrepo-com.svg"
                      className="w-5 mx-1"
                    />
                    <h1 className="text-[20px] my-auto mx-1 mt-2">Linkedin</h1>
                  </div>
                </Link>
              </div>

              <div className="m-2">
                <Link
                  href="https://www.instagram.com/accounts/login/"
                  target="_blank"
                >
                  <div className="   border p-1  rounded-lg  w-40 flex ">
                    <img
                      src="/instagram-167-svgrepo-com.svg"
                      className="w-5 mx-1"
                    />
                    <h1 className="text-[20px] my-auto mx-1 mt-1">Instagram</h1>
                  </div>
                </Link>
              </div>

              <div className="m-2">
                <Link href="https://twitter.com/" target="_blank">
                  <div className="   border p-1  rounded-lg  w-40 flex ">
                    <img src="/tw.svg" className="w-5 mx-1" />
                    <h1 className="text-[20px] my-auto mx-1 mt-1">Twitter</h1>
                  </div>
                </Link>
              </div>

              <div className="m-2">
                <Link href="https://www.facebook.com/login/" target="_blank">
                  <div className="   border p-1  rounded-lg  w-40 flex ">
                    <img
                      src="/facebook-176-svgrepo-com.svg"
                      className="w-5 mx-1"
                    />
                    <h1 className="text-[20px] my-auto mx-1 mt-1">Facebook</h1>
                  </div>
                </Link>
              </div>

              <div className="m-2">
                <Link
                  href="https://accounts.google.com/v3/signin"
                  target="_blank"
                >
                  <div className="   border p-[3px] mx-1 rounded-lg  w-40 flex ">
                    <img
                      src="/google-plus-circle-svgrepo-com.svg"
                      className="w-7 mx-1 my-1"
                    />
                    <h1 className="text-[20px] my-auto mx-1 mt-1">Google+</h1>
                  </div>
                </Link>
              </div>
              <div className="m-2">
                <Link href="https://youtube.com" target="_blank">
                  <div className="   border p-[3px] mx-1 rounded-lg  w-40 flex ">
                    <img src="/YT.svg" className="w-7 mx-1 my-1" />
                    <h1 className="text-[20px] my-auto mx-1 mt-1">Youtube</h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutVendor;