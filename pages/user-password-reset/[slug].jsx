import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utlis/config";

const PasswordReset = () => {

  const router = useRouter();
  const { slug } = router.query;
  const [password, setPassword] = useState("");
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
      if (response.status===200) {
        toast.success('Password reset successfully!')
          setLoading(false)
      } else if(response.status===500){
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
      <div className="max-w-4xl mx-auto mt-24">
        <div className="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900 bg-gray-100 max-h-screen">
          <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
            <h1 className=" mb-6 text-3xl font-bold text-center">
              Don't worry
            </h1>
            <p className="text-center mx-12">We are here to help you to recover your password. Enter the new password</p>
            <form action="#" className="space-y-6 w-ful my-4"
              onSubmit={handleResetPassword}
            >
              <input className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
                type="password" name="password"
                required="" value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <button type="submit"
                  className={`w-full px-4 py-2 font-medium text-center transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 
                  ${isLoading ? "bg-white text-lightBlue-700." : "bg-lightBlue-700 text-white"}`}>
                  {isLoading ? "Loading." : "Submit"}
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
        </div>
      </div>
    </>
  )
};

export default PasswordReset;
