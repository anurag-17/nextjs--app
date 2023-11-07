import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Usercart from "../components/UserModule/Cart/Index";
import { fetchApi } from "../utlis/api";

const Cart = () => {
  const [getCartProduct, setGetCartProduct] = useState([]);
  const { token } = useSelector((state) => state?.auth?.userDetails || null);

  const defaultCustomer = async () => {
    try {
      const response = await fetchApi("/auth/getUserCart", token);
      if (response?.status === 200) {
        const data = await response.json();
        setGetCartProduct(data?.products);  
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
    updateCart();
    if (!token || token == undefined) {
      setGetCartProduct(sessionCartProduct);
    } else {
      defaultCustomer();
    }
  }, []);
  // console.log(sessionCartProduct);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const options = {
      method: "GET",
      url: "https://e-commerce-backend-brown.vercel.app/api/product/getAllProduct",
      headers: {
        cookie:
          "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ4OTg5MiwiZXhwIjoxNjk2NzQ5MDkyfQ.r9M7MHA5dLHqKU0effObV0mwYE60SCEUt2sfiWUZzEw",
        "User-Agent": "insomnia/2023.5.8",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.status === 200) {
          // setAllProduct(response?.data);
          // response?.data?.map((row)=>())
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <Usercart
       token = {token}
        getCartProduct={getCartProduct}
        sessionCartProduct={sessionCartProduct || []}
      />
    </>
  );
};

export default Cart;
