import dynamic from "next/dynamic";
import React from "react";
import UserNavbar from "../components/UserModule/userNavbar";
import { useState, useEffect } from "react";
import { fetchApi } from "../utlis/api";
import { toast, ToastContainer } from "react-toastify";
import UserWishlist from "../components/UserModule/Wishlist/Index";

const Wishlist = () => {
  const [getWishProduct, setGetWishProduct] = useState([]);
  const [isRefresh, setRefresh] = useState([]);

  useEffect(() => {
    defaultWishPro();
  }, [isRefresh]);

  const defaultWishPro = async () => {
    try {
      const response = await fetchApi("/auth/wishlist");
      if (response.status === 200) {
        const data = await response.json();
        setGetWishProduct(data?.wishlist);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const refreshData = () => {
    setRefresh(!isRefresh)
  }

  return (
    <>
      <ToastContainer />
      <UserNavbar />
      <UserWishlist getWishProduct={getWishProduct} refreshData = {refreshData} />
    </>
  );
};
export default dynamic(() => Promise.resolve(Wishlist), { ssr: false });
