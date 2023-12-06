import dynamic from "next/dynamic";
import React, { useState } from "react";
import { EyeIcon,EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [about, setAbout] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  const addFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "POST",
      url: "https://e-commerce-backend-brown.vercel.app/api/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        dob: dob,
        country: country,
        language: language,
        about: about,
      },
    };

    try {
      const response = await axios.request(options);
      
      if (response?.status === 200) {
        setLoading(false);
        toast.success("Successfully! register. Please login");
        router.push("/login");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed !");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <ToastContainer />
        <div className="min-h-screen py-40 bg-[#DFF9FF]">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-center w-10/12 lg:w-[80%] bg-white rounded-xl mx-auto shadow-lg overflow-hidden min-h-[700px] border-[2px] border-[#0891B2]">
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center">
                <img
                  src="/loginImage.svg"
                  width={800}
                  height={800}
                  alt="login_img"
                />
              </div>
              <div className="w-full lg:w-1/2 py-10 px-12 my-[20px] flex flex-col justify-center">
                <h2 className="text-[40px] font-bold mb-4 text-center">
                  Register
                </h2>
                <p className="text-[20px]">
                  Create your account. It's free and only take a minute
                </p>
                <form action="#" onSubmit={addFormHandler} className="py-6">
                  <div className="grid grid-cols-2 gap-5 ">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="custom-input"
                      onChange={(e) => setFirstname(e.target.value)}
                      value={firstname}
                      maxLength={64}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="custom-input"
                      onChange={(e) => setLastname(e.target.value)}
                      value={lastname}
                      maxLength={64}
                      required
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Email"
                      className="custom-input w-full"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <div className="mt-5 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      className="custom-input w-full"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      minLength={8}
                    />
                    <button
                    type="button"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleToggle}
                  >
                   {showPassword ? <EyeIcon className="h-6 w-6 text-gray-500" /> : <EyeSlashIcon className="h-6 w-6 text-gray-500" />}
                  </button>
                  </div>
                  <div className="mt-5">
                    <input
                      type="number"
                      placeholder="Mobile no"
                      className="custom-input w-full"
                      onChange={(e) => setMobile(e.target.value)}
                      value={mobile}
                      pattern="[6789][0-9]{9}" 
                      required
                    />
                  </div>
                  <div className="mt-5">
                    <textarea
                      type="text"
                      placeholder="Address"
                      className="custom-input w-full"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      maxLength={100}
                      required
                    />
                  </div>
                    <div className="mt-5">
                      <textarea
                        type="text"
                        placeholder="Date of Birth DD/MM/YYYY"
                        className="custom-input"
                        onChange={(e) => setDob(e.target.value)}
                        pattern="^[0-9]+$"  
                        value={dob}
                        required
                      />
                    </div>
                    <div className="mt-5">
                      <textarea
                        type="text"
                        placeholder="Country"
                        className="custom-input"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        pattern="^[a-zA-Z][a-zA-Z\s]*$"  
                        maxLength={64}
                        required
                      />
                    </div>
                  <div className="mt-5">
                    <textarea
                      type="text"
                      placeholder="Language"
                      className="custom-input w-full"
                      onChange={(e) => setLanguage(e.target.value)}
                      value={language}
                      pattern="^[a-zA-Z][a-zA-Z\s]*$"  
                      required
                    />
                  </div>
                  <div className="mt-5">
                    <textarea
                      type="text"
                      placeholder="About"
                      className="custom-input w-full"
                      onChange={(e) => setAbout(e.target.value)}
                      value={about}
                      maxLength={300}
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
                  <div className="mt-5">
                    <button className="w-full bg-cyan-600  text-center text-white mb-2 font-semibold xl:text-[18px] lg:text-[16px] rounded">
                      {isLoading ? (
                        <button
                          type="submit"
                          className="w-full  bg-cyan-600 py-3 text-center text-white mb-2 border border-cyan-600 font-semibold text-[18px]"
                        >
                          Loading...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full bg-cyan-600 py-3 text-center text-white  font-semibold text-[18px]"
                        >
                          Register
                        </button>
                      )}
                    </button>

                    <Link href="/login">
                      <h1 className="text-center text-cyan-600 text-[25px] font-medium underline">
                        Login
                      </h1>
                    </Link>
                    <div className=" flex justify-center mt-5">
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
                      <Link
                        href="https://www.google.com/account"
                        target="_blank"
                      >
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
    </div>
  );
};

export default dynamic(() => Promise.resolve(Signup), { ssr: false });
