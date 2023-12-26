import dynamic from "next/dynamic";
import React from "react";
import UserNavbar from "../components/UserModule/userNavbar";
import { useState, useEffect } from "react";
import { fetchApi } from "../utlis/api";
import { toast, ToastContainer } from "react-toastify";
import UserWishlist from "../components/UserModule/Wishlist/Index";
import { useSelector } from "react-redux";
import axios from "axios";

const Wishlist = () => {
  const [getWishProduct, setGetWishProduct] = useState([]);
  const [isRefresh, setRefresh] = useState([]);
  const { token } = useSelector((state) => state.auth.userDetails || null);
  useEffect(() => {
    // defaultWishPro();
    getAllWishList()
  }, [isRefresh]);

  // const defaultWishPro = async () => {
  //   try {
  //     const response = await fetchApi("/auth/wishlist");
  //     if (response.status === 200) {
  //       const data = await response.json();
  //       setGetWishProduct(data?.wishlist);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const getAllWishList = async () => {
    const options = {
      method: "get",
      url: "https://e-commerce-backend-brown.vercel.app/api/auth/wishlist",
      headers: {
        Authorization:token
      },
      // data: {
      //   _id: customerID,
      // },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("asd",response?.data);

          setGetWishProduct(response?.data?.wishlist)

        }
      })
      .catch(function (error) {
        console.error(error);
      });
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
