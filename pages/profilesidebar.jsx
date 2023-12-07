import dynamic from "next/dynamic";
import { useState } from "react";
import Profile from "./profile";
import Notification from "./notification";
import Payment from "./payment";
import PasswordChange from "../components/UserModule/user-setting/change-password";
import ConnectSocial from "./connectsocial";
import Image from "next/image";
import Logactivity from "./logactivity";

const profilesideBar = ({ showNav }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
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
      label: "Personal Info",
      component: <Profile />,
      icon: "fa fa-users",
      imagePath: "/profilephoto.svg",
      path: "/profile",
    },
    {
      id: 2,
      label: "Payment Method",
      component: <Payment />,
      icon: "fa fa-users",
      imagePath: "/paymntmethod.svg",
      path: "/payment",
    },
    {
      id: 3,
      label: "Notification Setting",
      component: <Notification />,
      icon: "fa fa-phone-square",
      imagePath: "/bell.svg",
      path: "/notification",
    },
    {
      id: 4,
      label: "Login Activity",
      component: <Logactivity />,
      icon: "fa fa-phone-square",
      imagePath: "/loginn.svg",
      path: "/logactivity",
    },
    {
      id: 5,
      label: "Change Password",
      component: <PasswordChange />,
      icon: "fa fa-phone-square",
      imagePath: "/keylock.svg",
      path: "/passwordchange",
    },
    {
      id: 6,
      label: "Connect With Social",
      component: <ConnectSocial />,
      icon: "fa fa-phone-square",
      imagePath: "/social.svg",
      path: "/profile",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center pt-4 my-4 px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">
          <h1 className="text-[30px] ml-4 ">
            {selectedMenuItem
              ? `Setting/${selectedMenuItem.label}`
              : "Setting/Profile"}
          </h1>
        </h2>
        <h2>Welcome Back, Client</h2>
      </div>

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
              <img className="w-6 absolute mt-5 ml-2" src={item.imagePath} />

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
            <div>
              <Profile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default dynamic(() => Promise.resolve(profilesideBar), { ssr: false });