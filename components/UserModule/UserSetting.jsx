import React from "react";
import UserNavbar from "./userNavbar";
import dynamic from "next/dynamic";
import { useState } from "react";
import UserUpdatePaymentM from "./UserUpdatePaymentM";
import UserNotificationSetting from "./UserNotificationSetting";
import Passwordchange from "../../pages/passwordchange";


const UserSetting = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(  {
    id: 3,
    label: "Change Password",
    component: <Passwordchange />,
    icon: "fa fa-phone-square",
    imagePath: "/keylock.svg",
    path: "/user-password",
  },);
  const [labelId, setLabelId] = useState(1);
  const [show, setShow] = useState("Dashboard");

  const handleClick = (label, id) => {
    setShow(label);
    setLabelId(id);
  };

  const handleMenuItemClick = (menuItem) => { 
    setSelectedMenuItem(menuItem);
  };

  const menuList = [
    {
      id: 1,
      label: "Payment Method",
      component: <UserUpdatePaymentM />,
      icon: "fa fa-users",
      imagePath: "/paymntmethod.svg",
      path: "/user-paymentset",
    },
    {
      id: 2,
      label: "Notification Setting",
      component: <UserNotificationSetting />,
      icon: "fa fa-phone-square",
      imagePath: "/bell.svg",
      path: "/user-notifictionSet",
    },

    {
      id: 3,
      label: "Change Password",
      component: <Passwordchange />,
      icon: "fa fa-phone-square",
      imagePath: "/keylock.svg",
      path: "/user-password",
    },
  ];

  return (
    <>
      <UserNavbar />
      <div className="px-20">
        <div>
          <h1 className="text-[30px]  font-medium my-5">
            {selectedMenuItem
              ? `Setting/${selectedMenuItem.label}`
              : "Setting/Profile"}
          </h1>

          <div className="flex ">
            <div className="w-3/12 bg-white p-5">
              {/* Sidebar content */}
              {menuList.map((item) => (
                <div
                  key={item.id}
                  className={`menu-item ${
                    item === selectedMenuItem ? "active" : ""
                  }`}
                  onClick={() => handleMenuItemClick(item)}
                >
                  <img
                    className="w-6 absolute mt-5 ml-2"
                    src={item.imagePath}
                  />

                  <li className="list-none cursor-pointer border px-10 py-5 my-4 rounded-md hover:border-lightBlue-600 hover:text-lightBlue-500  text-gray-500">
                    {" "}
                    {item.label}
                  </li>
                </div>
              ))}
            </div>

            <div className="w-9/12">
              {selectedMenuItem ? (
                // Render the selected component here
                selectedMenuItem.component
              ) : (
                // Render a default component or welcome message
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default dynamic(() => Promise.resolve(UserSetting), { ssr: false });