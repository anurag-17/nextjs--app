import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utlis/config.js";
import ManageOrders from "../components/AdminModule/Order/manage-Order.jsx";


const orders = () => {

  const [allOrders, setAllOrders] = useState([]);
  const { auth_token } = useSelector((state) => state.adminAuth || null);

  useEffect(() => {
    if (auth_token) {
      getAllOrders();
    }
  }, []);

  const getAllOrders = () => {
    const options = {
      method: "GET",
      url: `${BASE_URL}/auth/getallorders`,
      headers: {
        "Content-Type": "application/json",
        authorization: auth_token,
      },
    };

    axios
      .request(options)
      .then((response) => {
        if (response?.status === 200) {
          setAllOrders(response?.data);
        } else if (response.status === 202) {
          refreshData();
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <ManageOrders allOrders={allOrders || []} />
  );
};

export default orders;
