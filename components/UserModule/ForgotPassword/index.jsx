// components/ForgotPasswordForm.js
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_URL } from '../../../utlis/config';


const ForgotPasswordForm = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/auth/forgotpassword`, {
        email,
      });
      setError('');
      if (response.status === 200) {
        setMessage("Please check your mail!. Reset link sent to your mail.")
        toast.success("Email sent tsuccessfully")
        setLoading(false)
        setEmail("")
      }
      else {
        setError("Email is invalid");
        setLoading(false)
      }
    } catch (err) {
      setError(err.response.data);
      setLoading(false)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl mx-auto mt-24">
        <div className="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900 bg-gray-100 max-h-screen">
          <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
            <h1 className=" mb-6 text-3xl font-bold text-center">
              Don't worry
            </h1>
            <p className="text-center mx-12">We are here to help you to recover your password. Enter the email address you used
              when you joined and we'll send you instructions to reset your password.</p>
            <form action="#" className="space-y-6 w-ful" onSubmit={handleSubmit}>

              {message && (
                <div className="my-2 text-green-700 px-2 text-[20px]  font-medium">{message  }</div>
              )}
              <input className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
                type="email" name="email" placeholder="Email address"
                required="" value={email}
                onChange={handleEmailChange}
              />
              {error && (
                <div className="my-4 text-red-600 px-2">{error}</div>
              )}

              <div>
                <button type="submit"
                  className={`w-full px-4 py-2 font-medium text-center transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 
                  ${isLoading ? "bg-white text-lightBlue-700." : "bg-lightBlue-700 text-white"}`}>
                  {isLoading ? "Loading." : "Send"}
                </button>
              </div>
            </form>
            <div className="text-sm text-gray-600 items-center flex justify-between">
              <p className="text-gray-800 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4"
              
              onClick={()=>router.back()}
              >
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
  );
};

export default ForgotPasswordForm;
