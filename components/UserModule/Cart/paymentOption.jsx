import React, { useState } from "react";

const PaymentOption = ({paymentOption, handleOptionChange}) => {

  return (
    <>
      <div className="my-10 flex flex-col gap-10 text-[18px] font-normal">
        <div className="flex gap-10 items-start">
          <input
            type="radio"
            name="postpaid"
            id="option1"
            className="cursor-pointer mt-2"
            value="COD"
            checked={paymentOption === "COD"}
            onChange={(e) => handleOptionChange({ value: e.target.value })}
          />
          <label className="text-[18px] font-medium flex flex-col">COD</label>
        </div>
        <div className="flex gap-10 items-start">
          <input
            type="radio"
            name="prepaid"
            id="option2"
            className="cursor-pointer mt-2"
            value="Payment using razorpay"
            checked={paymentOption === "Payment using razorpay"}
            onChange={(e) => handleOptionChange({ value: e.target.value })}
          />
          <label className="text-[18px] font-medium flex flex-col">
            Payment using razorpay
          </label>
        </div>
      </div>
    </>
  );
};

export default PaymentOption;
