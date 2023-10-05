import React from "react";
import { useState } from "react";

const Signup = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ClearData = () => {
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const addFormHandler = async (e) => {
    e.preventDefault();
    console.log("name:", name);
    console.log("surname:", surname);
    console.log("email:", email);
    console.log("password:", password);
    console.log("confirmPassword:", confirmPassword);
    
    ClearData();
  }

  return (
    <div>
      <div
        className="min-h-screen py-40"
        style={{ backgroundImage: "linear-gradient(115deg, #0284c7, #2193ce40)"}}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-[80%] rounded-xl mx-auto shadow-lg overflow-hidden">
            <div style={{backgroundImage: 'url(https://github.com/phithounsavanh/Tailwind-Simple-Signup-Page/blob/master/images/Register-Background.png?raw=true)'}}
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            
            >
              <h1 className="text-white text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-white text-xl mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean suspendisse aliquam varius rutrum purus maecenas ac
                  <a href="#" className="underline  font-bold">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full bg-white lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">
                Create your account. It’s free and only take a minute
              </p>
              <form action="#" onSubmit={addFormHandler}>
                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Firstname"
                    className="border border-gray-400 py-1 px-2"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    className="border border-gray-400 py-1 px-2"
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                    required
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Email"
                    className="border border-gray-400 py-1 px-2 w-full"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-400 py-1 px-2 w-full"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border border-gray-400 py-1 px-2 w-full"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                  />
                </div>
                <div className="mt-5">
                  <input type="checkbox" className="border border-gray-400 mr-2" />
                  <span>
                    I accept the
                    <a href="#" className="text-lightBlue-600 font-semibold">
                      Terms of Use
                    </a>
                    &amp;
                    <a href="#" className="text-lightBlue-600 font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                  <button className="w-full bg-lightBlue-600 py-3 text-center text-white">
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

