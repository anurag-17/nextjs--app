"use client";
import React, { useState } from "react";

const Buy = ({ makePayment, isLoading }) => {

  return (
    <div className="flex flex-col items-end justify-end mt-[30px]">
      <button
        onClick={() => {
          makePayment({ productId: "example_ebook" });
        }}
        disabled={isLoading}
        className={`px-5 py-2 rounded bg-lightBlue-700 text-white font-semibold hover:bg-lightBlue-600 w-full md:w-[300px] ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
};

export default Buy;
