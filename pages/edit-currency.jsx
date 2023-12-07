import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const EditCurrency = ({currencyEdit}) => {
  const router = useRouter();
  // const { _id } = router.query; 
  // const [id, setId] = useState("");
  const [selectedCurrencyId, setSelectedCurrencyId] = useState(null);
  const [currencySign, setCurrencySign] = useState("");
  const [currencyName, setCurrencyName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
console.log(currencyEdit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-backend-brown.vercel.app/api/currency/getCurrency/${currencyEdit}`
        );

        if (response.ok) {
          const data = await response.json();
          // Set the retrieved data to state variables for editing
          setCurrencySign(data.currencySign);
          setCurrencyName(data.currencyName);
        } else {
          console.error("Failed to fetch currency data");
        }
      } catch (error) {
        console.error("Error occurred while fetching currency data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currencyData = {
        _id: currencyEdit,
        currencySign: currencySign,
        currencyName: currencyName,
      };

      const response = await fetch(
        `https://e-commerce-backend-brown.vercel.app/api/currency/updateCurrency`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currencyData),
        }
      );

      const responseData = await response.json();
console.log(response);

      if (response.ok) {
        setLoading(false);
        toast.success("Product updated successfully !");
        refreshData();
        router.push("/currency");
        console.log("Currency updated successfully:", responseData);
      } else {
        setLoading(false);
        console.error("Failed to update currency:", responseData);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed. something went wrong!");
      console.error("Error occurred while updating currency:", error);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === "currencyName") {
      setCurrencyName(value);
    } else if (name === "CurrencySign") {
      setCurrencySign(value);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between items-center pt-4  px-5 border border-[#f3f3f3] rounded-lg bg-white h-[50px] my-5 ">
        <h2 className="text-2xl font-semibold pb-4">Edit Currency </h2>
        <div className="mb-3 w-[40%]"></div>
      </div>
      <div className="bg-white border rounded-lg  p-2 mx-auto">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
              Currency Name:
            </label>

            <input
              type="text"
              name="currencyName"
              className="px-3 py-2 rounded m-10   border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
              value={currencyName}
              // defaultValue={
              //   editData?.brand ? editData?.brand : productDetails.brand
              // }
              onChange={inputHandler}
              required
            />
          </div>

          <div>
            <label className="absolute mt-6 bg-white  ml-14 z-20 text-[18px] text-gray-800 bg-">
              Currency Sign:
            </label>

            <input
              type="text"
              name="CurrencySign"
              className="px-3 py-2 rounded m-10   border border-gray-300 bg-gray-50 text-gray-500 text-sm focus:bg-white dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600  focus:outline-none  h-[50px] relative  w-8/12"
              value={currencySign}
              // defaultValue={
              //   editData?.brand ? editData?.brand : productDetails.brand
              // }
              onChange={inputHandler}
              required
            />
          </div>

          <button
            type="submit"
            className="border p-2 m-10 mt-0 rounded-lg bg-lightBlue-600 text-white text-[20px] "
            // onClick={handleUpdateBrand}
          >
            Update Currency
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCurrency;
