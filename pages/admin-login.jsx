import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { setAdminDetails, setAdminToken } from "../redux/slices/adminAuthSlice";

const AdminLogin = ({ API_URL }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const addFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "POST",
      url: `${API_URL}/adminLogin`,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
      },
      data: { email: email, password: password },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response?.status === 201) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.token)
          );
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response?.data?.user?._id)
          );
          // console.log(response?.data?.token);
          
          dispatch(setAdminToken(response?.data?.token))
          // dispatch(setAdminDetails(response?.data?.user))
          setLoading(false);
          toast.success("Success. Login Successfully!");
          router.push("/admin-dashboard");
        } else {
          setLoading(false);
          return;
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        toast.error("Failed. Invalid Credentials!");
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen py-40 bg-[#DFF9FF]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-center w-10/12 lg:w-[80%] bg-white rounded-xl mx-auto shadow-lg overflow-hidden min-h-[700px] border-[2px] border-[#0891B2]">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center">
              <Image
                src="/loginImage.svg"
                width={800}
                height={800}
                alt="login_img"
              ></Image>
            </div>
            <div className="w-full lg:w-1/2 py-10 px-12 my-[20px] flex flex-col justify-center">
              <h2 className="text-[40px] font-bold mb-4 text-center">
                Admin Login
              </h2>
              <p className="py-4 text-[20px] text-center">
                {" "}
                {/* Create your account. It’s free and only take a minute */}
              </p>
              <form onSubmit={addFormHandler}>
                <div className="mt-5">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="custom-input  xl:h-[60px]"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    className="custom-input xl:h-[60px]"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
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

                <div className="py-5 xl:text-[18px] lg:[text-[16px] mt-6">
                  <label>
                    <input
                      type="checkbox"
                      className="border border-gray-400 mr-2"
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
                <div className="mt-8">
                  {isLoading ? (
                    <button
                      type="submit"
                      className="w-full  text-cyan-600 py-3 text-center bg-white mb-2 border border-cyan-600 font-semibold text-[18px]"
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-cyan-600 py-3 text-center text-white mb-2 font-semibold xl:text-[18px] lg:text-[16px] rounded"
                    >
                      Login
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

export async function getServerSideProps() {
  // Define your API URL here
  const API_URL = "https://e-commerce-backend-brown.vercel.app/api/auth";

  return {
    props: {
      API_URL,
    },
  };
}
