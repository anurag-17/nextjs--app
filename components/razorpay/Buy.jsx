"use client"
import React,{useState} from "react";

const Buy = ({ makePayment }) => {

  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className="flex flex-col items-center justify-center mt-[30px]">

<button
     onClick={() => {
          makePayment({ productId: "example_ebook" });
        }}
      disabled={isLoading}
      className={`px-5 py-2 rounded bg-lightBlue-700 text-white font-semibold hover:bg-lightBlue-600 w-[100%] ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? 'Processing...' : 'Checkout'}
    </button>



    </div>
  );
};

export default Buy;