import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Usercart from "../components/UserModule/Cart/Index";
import { fetchApi } from "../utlis/api";


const Cart = () => {
  const [getCartProduct, setGetCartProduct] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const { token } = useSelector((state) => state?.auth?.userDetails || null);

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  const defaultCustomer = async () => {
    try {
      const response = await fetchApi("/auth/getUserCart", { 
        headers : {
        "Content-Type": "application/json",
        authorization: token,
      }},);
      if (response?.status === 200) {
        const data = await response.json();
        setGetCartProduct(data?.cart);
      } else if (response.status === 202) {
        setGetCartProduct([])
        toast.warning("Your cart is empty!");
        return
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [sessionCartProduct, setsessionCartProduct] = useState([]);

  const updateCart = () => {
    setsessionCartProduct(JSON.parse(sessionStorage.getItem("addToCart")));
  };

  useEffect(() => {
    if (!token || token == undefined) {
      updateCart();
      // sessionCartProduct;
    } else {
      defaultCustomer();
    }
  }, [isRefresh]);

  return (
    <>
 <ToastContainer  
      position="bottom-right"
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"/>
      <Usercart
        token={token}
        getCartProduct={getCartProduct}
        sessionCartProduct={sessionCartProduct || []}
        refreshData={refreshData}
      />
    </>
  );
};

export default Cart;
