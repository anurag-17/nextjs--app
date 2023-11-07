import React, { useEffect, useState } from "react";
import UserProfile from "../components/UserModule/UserProfile";
import { fetchApi } from "../utlis/api";

const userprofile = () => {
  const [getAllCustomer, setGetAllCustomer] = useState();

  useEffect(() => {
    defaultCustomer();
  }, []);

  const defaultCustomer = async () => {
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
      <UserProfile getAllCustomer={getAllCustomer} />
    </div>
  );
};

export default userprofile;
