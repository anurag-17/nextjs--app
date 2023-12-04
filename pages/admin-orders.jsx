import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../utlis/config.js";
import ManageOrders from "../components/AdminModule/Order/manage-Order.jsx";
import WebsiteLoader from "../components/websiteLoader.jsx";


const orders = () => {

  const [allOrders, setAllOrders] = useState([]);
  const { auth_token } = useSelector((state) => state.adminAuth || null);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);


  const refreshDatas = () => {
    setRefresh(!isRefresh);
  };


  useEffect(() => {
    if (auth_token) {
      getAllOrders();
    }
  }, [isRefresh]);

  const getAllOrders = () => {
    setLoading(true)
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
          setAllOrders(response?.data.reverse());
          setLoading(false)

        } else if (response.status === 202) {
          setLoading(false)
          // refreshData();
          return;
        }
      })
      .catch((error) => {
        setLoading(false)
        console.error("Error:", error);
      });
  };


  return (
    <>
      {
        isLoading &&
        <WebsiteLoader />
      }
      <ManageOrders allOrders={allOrders || []} refreshDatas={refreshDatas} />
    </>
  );
};

export default orders;
