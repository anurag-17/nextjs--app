import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { getCartProducts, getUserAddress, getUserWishList, setToken } from "../redux/slices/authSlice";

const UserLogin = ({ API_URL }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState("");
  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const { token } = useSelector((state) => state.auth.userDetails || {});

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

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
      },
      data: { email: email, password: password }, // Use _id here
    };

    axios
      .request(options)
      .then(function (response) {
        if (response?.status === 201) {
          dispatch(setToken(response?.data?.token));
          dispatch(getUserWishList(response?.data?.user?.wishlist));
          dispatch(getCartProducts(response?.data?.user?.cart));
          dispatch(getUserAddress(response?.data?.user));
          setLoading(false);
          toast.success("Success, Login Successfully!");
          router.push("/user-product");
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
      <ToastContainer  
      position="bottom-right"
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"/>
      <div
        className="2xl:min-h-screen 2xl:py-40 bg-[#DFF9FF]   xl:min-h-screen xl:py-20
        lg:min-h-screen lg:py-16
        md:min-h-screen md:py-16
        sm:min-h-screen sm:py-10
        min-h-screen py-12
        "
      >
        <Link href="/">
          <div className="flex justify-center items-center md:gap-x-1 lg:gap-x-3 hover:bg-[#f3f3f3e0] md:px-0 lg:px-6 py-1 rounded-md text-[14px] 2xl:text-[18px] font-medium fixed right-[1px] sm:right-[20px] md:right-[36px] lg:right-[50px] top-[20px]">
            <Image className="w-5 sm:w-6 md:w-6 lg:w-5 xl:w-6 2xl:w-10" src={`/svg/back.svg`} alt="go back" height={40} width={40} />
            Go back
          </div>
        </Link>

        <div className="container mx-auto">
          <div
            className="flex flex-col lg:flex-row justify-center  bg-white rounded-xl mx-auto shadow-lg overflow-hidden 2xl:min-h-[700px] border-[2px] border-[#0891B2]
          xl:min-h-[450px] xl:w-8/12
          lg:min-h-[400px] 
          2xl:w-10/12
          lg:w-[70%]
          md:w-10/12
          sm:w-10/12
          w-9/12
          
           "
          >
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center 
            md:w-10/12 md:mx-auto 
            sm:w-10/12 sm:mx-auto
            "
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
            xl:py-6 xl:px-7 xl:my-[0px]
            lg:py-6 lg:px-5 lg:my-[12px]
             md:px-16 sm:px-14 px-5"
            >
              <h2
                className="2xl:text-[40px] font-bold 2xl:mb-4  text-center
              xl:text-[28px] xl:mb-0  
              lg:text-[25px] lg:mb-5
              md:text-[35px] md:mb-2
               sm:text-[30px] sm:mb-2
               text-[25px] mb-3"
              >
                
                Login
              </h2>
              <p
                className="2xl:py-4 2xl:text-[20px] text-center first-letter xl:py-1 xl:text-[16px] 
              lg:py-0 lg:text-[14px]
              md:py-2 md:text-[16px]
              sm:py-2 sm:text-[14px]"
              >
            
              </p>

              <form onSubmit={addFormHandler}>
                <div
                  className="2xl:mt-5 
                xl:mt-3
                lg:mt-2
                md:mt-3
                sm:mt-2
                mt-2"
                >
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    className="custom-input border border-gray-600 2xl:h-[60px] 
                    xl:h-[40px] 
                    lg:h-[35px]
                    md:h-[60px]
                    sm:h-[45px]
                    h-[40px]"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div
                  className="2xl:mt-6 2xl:mb-2
                xl:mt-4 xl:mb-4
                lg:mt-3 lg:mb-2 
                md:mt-4 md:mb-2 
                sm:mt-4 sm:mb-2
                mt-4  relative "
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    className="custom-input border border-gray-600 2xl:h-[60px] xl:h-[40px] lg:h-[35px] md:h-[60px] sm:h-[45px] h-[40px]"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button" 
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleToggle}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-6 w-6 text-gray-500" />
                    ) : (
                      <EyeSlashIcon className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                </div>

                <div
                  className="2xl:mt-8
                xl:mt-2
                lg:mt-2 md:mt-2 
                mt-2"
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
                      lg:py-[7px] lg:mb-1
                      md:py-3 md:mb-1
                      sm:py-2 sm:mb-1
                      py-2
                      "
                    >
                      Login
                    </button>
                  )}
                    <p
                      className="text-center   2xl:mt-6 2xl:text-[20px] font-medium
                      xl:mt-4 xl:text-[16px] first-letter: 
                      lg:mt-4 lg:text-[14px] 
                      md:mt-2 md:text-[18px] 
                      sm:mt-2 sm:text-[16px]
                      mt-2 text-[16px]"
                    >
                  Not registered?
                      <Link href="/user-signup">
                    <span className="text-lightBlue-700"> Create an account</span>
                  </Link>
                    </p>
                  <Link href="/user-forgot-password">
                    <p
                      className="text-center underline  2xl:text-[20px] font-medium
                     xl:text-[16px] first-letter: mt-3 sm:mt-4 md:mt-4 lg:mt-4  xl:mt-6  lg:text-[14px] 
                    md:text-[18px]  md:mb-10
                    sm:text-[16px]  sm:mb-10
                    text-[16px] mb-10"
                    >
                Forgot password
                    </p>
                  </Link>

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
