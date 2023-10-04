import Link from "next/link";
import React from "react";

const AdminLogin = () => {
  return (
    <div>
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
                  Aenean suspendisse aliquam varius rutrum purus maecenas ac{" "}
                  <a href="#" className="text-cyan-600 font-semibold">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12 my-[20px]">
              <h2 className="text-3xl mb-4">Login</h2>
              <p className="mb-4">
                Create your account. It’s free and only take a minute
              </p>
              <form action="#">
                {/* <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Firstname"
                    className="border border-gray-400 py-1 px-2"
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    className="border border-gray-400 py-1 px-2"
                  />
                </div> */}
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Email"
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                </div>
                {/* <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                </div> */}
                <div className="mt-5">
                  <input type="checkbox" className="border border-gray-400 mr-2" />
                  <span>
                    I accept the{" "}
                    <a href="#" className="text-cyan-600 font-semibold">
                      Terms of Use
                    </a>{" "}
                    &amp;{" "}
                    <a href="#" className="text-cyan-600 font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                <Link href="/">
                 <button className="w-full bg-cyan-600 py-3 text-center text-white mb-2">
                    Login
                  </button>
                  </Link>
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