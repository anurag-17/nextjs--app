import React, { useState } from "react";
import { useRouter } from "next/router";

const CreateCurrency = () => {
  const [currency, setCurrency] = useState("");
  const [currencyLogo, setCurrencyLogo] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const currencyData = {
          currencySign:currency,
          currencyName: currencyLogo
        };
    
        const response = await fetch('https://e-commerce-backend-brown.vercel.app/api/currency/createCurrency', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(currencyData)
        });
    
        const responseData = await response.json();
    
        if (response.ok) {
            router.push("/currency");
          console.log('Currency created successfully:', responseData);
        } else {
          console.error('Failed to create currency:', responseData);
        }
      } catch (error) {
        console.error('Error occurred while creating currency:', error);
      }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
          <h2 className="text-2xl font-semibold pb-4">Add New Currency </h2>
          <div className="mb-3 w-[40%]"></div>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" bg-white border  rounded-lg p-2 mx-auto"
        >
          <div>
            <div className="  ">
              <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                Currency Name
              </label>
              <input
                onChange={(e) => setCurrency(e.target.value)}
                value={currency}
                type="text"
                name="name"
                className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                required
              />
              
            </div>

            <div className="  ">
              <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
                Currency Sign
              </label>
              <input
                onChange={(e) => setCurrencyLogo(e.target.value)}
                value={currencyLogo}
                type="text"
                name="name"
                className="px-3 py-2 rounded  m-10  border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
                required
              />
              <button
                type="submit"
                className="border p-2 m-10 mt-0 rounded-lg bg-sky-600 text-white text-[20px] "
              >
                Add Currency / Sign
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCurrency;
