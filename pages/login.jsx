import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import { setCookie } from "cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Cart from "./cart";

import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from "../redux/actions/auth";

const setTokenInCookies = (token) => {
  Cookies.set('token', token, { expires: 7 }); // 'expires' sets the cookie expiration in days
};

const UserLogin = ({ API_URL }) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const ClearData = () => {
    setPassword("");
    setEmail("");
    setUserId("");
  };

  const addFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const options = {
      method: "POST",
      url: `${API_URL}/login`,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
      },
      data: { email: email, password: password }, // Use _id here
    };

    axios
      .request(options)
      .then(function (response) {

        if (response?.status === 201) {

          dispatch(setToken(response?.data?.token));
          // console.log(response.data.user._id);
          localStorage.setItem(
            "userToken",
            JSON.stringify(response?.data?.token)
          );
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response?.data?.user?._id)
          );
          localStorage.setItem(
            "wishList",
            JSON.stringify(response?.data?.user?.wishlist)
          );
          setTokenInCookies(response?.data?.token);
          setLoading(false);
          toast.success("Success, Login Successfully!");

          router.push("/all-product");
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed, Invalid Credentials!");
      });
  };

  return (
    <div>
      <ToastContainer />

      <div
        className="2xl:min-h-screen 2xl:py-40 bg-[#DFF9FF]   xl:min-h-screen xl:py-20
        lg:min-h-screen lg:py-16
        md:min-h-screen md:py-16
        sm:min-h-screen sm:py-10
        "
      >
        <div className="container mx-auto">
          <div
            className="flex flex-col lg:flex-row justify-center 2xl:w-10/12 lg:w-[70%] bg-white rounded-xl mx-auto shadow-lg overflow-hidden 2xl:min-h-[700px] border-[2px] border-[#0891B2]
          xl:min-h-[450px] xl:w-8/12
          lg:min-h-[400px] 
          md:w-10/12
          sm:w-10/12
          
           "
          >
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center 
            md:w-10/12 md:mx-auto 
            sm:w-10/12 sm:mx-auto"
            >
              <Image
                src="/loginImage.svg"
                width={800}
                height={800}
                alt="login_img"
              ></Image>
            </div>
            <div
              className="w-full lg:w-1/2 2xl:py-10 2xl:px-12 2xl:my-[20px]
            xl:py-6 xl:px-5 xl:my-[0px]
            lg:py-6 lg:px-5 lg:my-[12px]
             md:px-16 sm:px-14 "
            >
              <h2
                className="2xl:text-[40px] font-bold 2xl:mb-4  text-center
              xl:text-[30px] xl:mb-0  
              lg:text-[25px] lg:mb-1
              md:text-[35px] md:mb-2
               sm:text-[30px] sm:mb-2 "
              >
                {" "}
                Login
              </h2>
              <p
                className="2xl:py-4 2xl:text-[20px] text-center first-letter xl:py-1 xl:text-[16px] 
              lg:py-0 lg:text-[14px]
              md:py-2 md:text-[16px]
              sm:py-2 sm:text-[14px]"
              >
                {" "}
                Create your account. It’s free and only take a minute
              </p>

              <form onSubmit={addFormHandler}>
                <div
                  className="2xl:mt-5 
                xl:mt-3
                lg:mt-2
                md:mt-3
                sm:mt-2"
                >
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    className="custom-input 2xl:h-[60px] xl:h-[50px] 
                    lg:h-[40px]
                    md:h-[60px]
                    sm:h-[50px]"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div
                  className="2xl:mt-6 2xl:mb-2
                xl:mt-4 xl:mb-2
                lg:mt-3 lg:mb-2 
                md:mt-4 md:mb-2 
                sm:mt-4 sm:mb-2 "
                >
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="custom-input 2xl:h-[60px] xl:h-[50px] lg:h-[40px]
                    md:h-[60px]
                    sm:h-[50px]"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="2xl:py-5 xl:text-[16px] lg:[text-[14px]  xl:py-3 first-letter: lg:py-2 md:py-2 sm:py-2">
                  <label>
                    <input
                      type="checkbox"
                      className="border border-gray-400 2xl:mr-2 xl:mr-1 lg:mr-1 md:mr-1 sm:mr-1"
                    />
                    <span>
                      I accept the
                      <a href="#" className="text-cyan-600 font-semibold">
                        Terms of Use
                      </a>
                      &nbsp; &amp; &nbsp;
                      <a href="#" className="text-cyan-600 font-semibold">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <div
                  className="2xl:mt-8
                xl:mt-2
                lg:mt-2 md:mt-2"
                >
                  {isLoading ? (
                    <button
                      type="submit"
                      className="w-full  text-cyan-600 2xl:py-3 text-center bg-white 2xl:mb-2 border border-cyan-600 font-semibold 2xl:text-[18px]
                      xl:py-2  xl:mb-2 xl:text-[16px]
                      lg:py-2  lg:mb-2 lg:text-[14px]
                      md:py-3  md:mb-3 md:text-[16px]
                      sm:py-2  sm:mb-2 sm:text-[14px]"
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-cyan-600 2xl:py-3 text-center text-white 2xl:mb-2 font-semibold xl:text-[18px] lg:text-[16px]
                      xl:py-2 xl:mb-1
                      lg:py-2 lg:mb-1
                      md:py-3 md:mb-1
                      sm:py-2 sm:mb-1"
                    >
                      Login
                    </button>
                  )}
                  <Link href="/signup">
                    <p
                      className="text-center text-cyan-600  underline 2xl:mt-4 2xl:text-[20px] font-medium
                    xl:mt-2 xl:text-[18px] first-letter: lg:mt-2 lg:text-[16px] 
                    md:mt-2 md:text-[18px]  md:mb-10
                    sm:mt-2 sm:text-[16px]  sm:mb-10"
                    >
                      Register Now
                    </p>
                  </Link>
                  <div className=" flex justify-center">
                    <Link href="https://www.facebook.com/" target="_blank">
                      <div className="border p-2 w-12 rounded-lg mx-1 hover:bg">
                        <img src="/fbb.svg" className="w-8" />
                      </div>
                    </Link>
                    <Link href="https://twitter.com/" target="_blank">
                      <div className="border p-2 w-12 rounded-lg mx-1 hover:bg">
                        <img src="/tw.svg" className="w-8" />
                      </div>
                    </Link>
                    <Link href="https://www.google.com/account" target="_blank">
                      <div className="border p-2 w-12 rounded-lg mx-1 hover:bg">
                        <img src="/g.svg" className="w-8" />
                      </div>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

export async function getServerSideProps() {
  // Define your API URL here
  const API_URL = "https://e-commerce-backend-brown.vercel.app/api/auth";

  return {
    props: {
      API_URL,
    },
  };
}
