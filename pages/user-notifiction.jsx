import dynamic from "next/dynamic";
import React from "react";
import UserNotificationSetting from "../components/UserModule/user-setting/UserNotificationSetting";
import UserNavbar from "../components/UserModule/userNavbar";

const usernotifictionSet = () => {
  return (
    <div>
      <UserNavbar/>
      <UserNotificationSetting />
    </div>
  );
};

export default dynamic(() => Promise.resolve(usernotifictionSet), { ssr: false });