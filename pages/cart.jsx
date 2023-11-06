import React, { useEffect, useState } from "react";
import Usercart from "../components/UserModule/Cart/Index"
import { fetchApi } from "../utlis/api";

const Cart = () => {

  const [getCartProduct, setGetCartProduct] = useState([]);
    
  useEffect(() => {
    defaultCustomer();
  }, []);

  const defaultCustomer = async() => {

      try {
        const response = await fetchApi("/auth/getUserCart");
        const data = await response.json();
        console.log(data);
        if (response?.status === 200) {
          setGetCartProduct(res?.data?.products);
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <>
   <Usercart getCartProduct={getCartProduct} />
    </>
  );
};

export default Cart;
