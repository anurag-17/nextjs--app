import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Cart = ({ _id }) => {
  const [cartItem, setCartItem] = useState([]);
  const userId = "_id";

  const url =
    "https://e-commerce-backend-brown.vercel.app/api/auth/getUserCart";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setCartItem(data);
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <>
      <div>
        <div className="flex justify-between items-center pt-4 px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold pb-4">Cart List </h2>
          <h2>Welcome Back</h2>
        </div>
        {cartItem.map((item) => (
          <h1>{item?.price}</h1>
        ))}
      </div>
    </>
  );
};

export default Cart;
