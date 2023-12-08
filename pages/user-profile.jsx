import React, { useEffect, useState } from "react";
import UserProfile from "../components/UserModule/UserProfile";
import { fetchApi } from "../utlis/api";

const userprofile = () => {
  const [getAllCustomer, setGetAllCustomer] = useState();
  const [isRefresh, setRefresh] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, [isRefresh]);


  const refreshData = () => {
    setRefresh(!isRefresh)
  }

  const getUserDetails = async () => {
    try {
      const response = await fetchApi("/auth/getaUser", {});
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setGetAllCustomer(data?.getaUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <UserProfile getAllCustomer={getAllCustomer} refreshData={refreshData} />
    </div>
  );
};

export default userprofile;
