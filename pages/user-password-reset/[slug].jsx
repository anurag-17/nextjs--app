import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../utlis/config";

const PasswordReset = () => {

  const router = useRouter();
  const { slug } = router.query;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/auth/resetpassword/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      console.log(response);
      if (response.status === 201) {
        toast.success('Password reset successfully!')
        setMessage("Your password has been reset successfully. Now, please log in to access your account.")
        setLoading(false)
      } else if (response.status === 500) {
        toast.error('Token expired !')
        setLoading(false)
      } else {
        toast.error('Password reset failed')
        setLoading(false)
      }
    } catch (error) {
      console.error(error);
      toast.error('Password reset failed')
      setLoading(false)
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl mx-auto mt-24">
        <div className="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900 bg-gray-100 max-h-screen">

          {
            message ?
              <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
                <p className="text-[20px] bg-green-100 px-4 py-6 text-green-700 font-medium mb-6">{message}</p>
                <Link href="/login">
                <button
                      type="button"
                      className="w-full text-lightBlue-700 border rounded-md bg-lightBlue-100 border-lightBlue-700 2xl:py-3 text-center  2xl:mb-2 font-semibold xl:text-[18px] lg:text-[16px]
                      xl:py-2 xl:mb-1
                      lg:py-2 lg:mb-1
                      md:py-3 md:mb-1
                      sm:py-2 sm:mb-1"
                    >
                      Login
                    </button>
                </Link>
              </div>
              :
              <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
                <h1 className=" mb-6 text-3xl font-bold text-center">
                  Change Password
                </h1>
                <p className="text-center mx-12">We are here to help you to recover your password. Enter the new password</p>

                <form action="#" className="space-y-6 w-ful my-4"
                  onSubmit={handleResetPassword}
                >
                  <input className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required="" value={password} minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex items-center mt-1 px-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="mr-2"
                    />
                    <label htmlFor="showPassword">Show Password</label>
                  </div>
                  <div>
                    <button type="submit"
                      className={`w-full px-4 py-2 font-medium text-center transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 
                  ${isLoading ? "bg-white text-lightBlue-700." : "bg-lightBlue-700 text-white"}`}>
                      {isLoading ? "Loading..." : "Submit"}
                    </button>
                  </div>
                </form>

                <div className="text-sm text-gray-600 items-center flex justify-between">
                  <p className="text-gray-800 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clip-rule="evenodd" />
                    </svg>
                    Back</p>
                  <p className="hover:text-blue-500 cursor-pointer">Need help?</p>
                </div>
              </div>
          }

        </div>
      </div>
    </>
  )
};

export default PasswordReset;
