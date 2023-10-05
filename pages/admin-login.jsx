
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState }  from "react";
import axios from "axios";
import { setCookie } from 'cookie';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState("");
  const router = useRouter()
  const ClearData = () => {
    setPassword("");
    setEmail("");
  };

  const addFormHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    // console.log("Email:", email);
    // console.log("Password:", password);
    // router.push("/")
    // ClearData();

const options = {
  method: 'POST',
  url: 'https://e-commerce-backend-brown.vercel.app/api/auth/adminLogin',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'insomnia/2023.5.8'
  },
  data: {email: email, password: password}
};

axios.request(options).then(function (response) {
  if (response?.status === 200) {
    console.log(response.data);
    sessionStorage.setItem("accessToken",JSON.stringify(response.data.token))
    localStorage.setItem("accessToken",JSON.stringify(response.data.token))
    // setCookie(null, 'access_token', response.data);
    sessionStorage.setItem("userDetails",JSON.stringify(response?.data) ); 
    localStorage.setItem("userDetails",JSON.stringify(response?.data) ); 
    setLoading(false)
    toast.success("Success. Login Successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    router.push("/")
  }
  else{
    setLoading(false)
    return
  }
}).catch(function (error) {
  setLoading(false)
  console.error(error);
  toast.error("Failed. Invalid Credentials!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
});
  };


  return (
    <div>
         <ToastContainer/>
      <div
        className="min-h-screen py-40"
        style={{  backgroundImage: "linear-gradient(115deg, #0284c7, #2193ce40)" }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-[80%] bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://github.com/phithounsavanh/Tailwind-Simple-Signup-Page/blob/master/images/Register-Background.png?raw=true")',
              }}
            >
              <h1 className="text-white text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean suspendisse aliquam varius rutrum purus maecenas ac
                  <a href="#" className="text-cyan-600 font-semibold">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12 my-[20px]">
              <h2 className="text-3xl mb-4">Admin Login</h2>
              <p className="mb-4">
                Create your account. It’s free and only take a minute
              </p>
              <form onSubmit={addFormHandler}>
        
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    className="custom-input"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="custom-input"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
             
                <div className="mt-5">
                  <input type="checkbox" className="border border-gray-400 mr-2" />
                  <span>
                    I accept the
                    <a href="#" className="text-cyan-600 font-semibold">
                      Terms of Use
                    </a>
                    &amp;
                    <a href="#" className="text-cyan-600 font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                {isLoading ?
                  <button type="submit" className="w-full  text-cyan-600 py-3 text-center bg-white mb-2 border border-cyan-600 font-semibold text-[18px]">
                   Loading...
                  </button>
                :
                  <button type="submit" className="w-full bg-cyan-600 py-3 text-center text-white mb-2 font-semibold text-[18px]">
                   Login
                  </button>
                }
                 <Link href="/signup"><p className="text-center text-cyan-600  underline mt-2">Register Now</p></Link>
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