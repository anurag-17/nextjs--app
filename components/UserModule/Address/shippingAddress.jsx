"use client";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const ShippingAddress = ({ closeModal, userAdd ,updateCart,userNumber,userEmail}) => {

  const [address, setAddress] = useState(userAdd ? userAdd : "");
  const [selectedOption, setSelectedOption] = useState(userAdd ? userAdd : "");
  const [shippingDetails, setShippingDetails] = useState({
    address: userAdd,
    number: userNumber,
    email: userEmail,
  });
  

  return (
    <>
      <div className="py-4 mt-2">
          <div className="grid grid-cols-1 gap-x-5 py-10">
            <div className="flex gap-10 items-start">
              <input
                type="radio"
                name="option"
                id="option1"
                className="cursor-pointer mt-2"
                value={userAdd}
                checked={selectedOption === userAdd}
                // onChange={handleOptionChange}
              />
              <label className="text-[18px] font-medium flex flex-col">
                <p className="">{userAdd}</p>
                <p className="">{userNumber}</p>
                <p className="">{userEmail}</p>
              </label>
            </div>
          </div>
          <div className="mt-2 text-center">
            <button
              type="button"
              className="px-4 py-2 border bg-black text-white flex justify-center text-[18px]  font-semibold rounded-md"
              onClick={() => {
                updateCart({ shippingDetails: shippingDetails});
              }}
            >
              Deliver Here
            </button>
          </div>
      </div>
    </>
  );
};
export default ShippingAddress;
