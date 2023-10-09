import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Signup = ({API_URL}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const addFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    const options = {
      method: "POST",
      url: `${API_URL}/register`,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/2023.5.8",
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        number: number,
        address: address,
      },
    };

    try {
      const response = await axios.request(options);

      if (response?.status === 200) {
        console.log(response.data);
        setLoading(false);
        toast.success("Success. Login Successfully!");
        router.push("/");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed. Invalid Credentials!");
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
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="custom-input"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
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
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    className="custom-input w-full"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="Number"
                    placeholder="Number"
                    className="custom-input w-full"
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
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
                    required
                  />
                </div>
                <div className="py-5 xl:text-[18px] lg:[text-[16px] mt-2">
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
                        className="w-full bg-cyan-600 py-3 text-center text-white mb-2 font-semibold text-[18px]"
                      >
                        Register
                      </button>
                    )}
                  </button>
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

export default Signup;


export async function getServerSideProps() {
  // Define your API URL here
  const API_URL = 'https://e-commerce-backend-brown.vercel.app/api/auth';

  return {
    props: {
      API_URL,
    },
  };
}