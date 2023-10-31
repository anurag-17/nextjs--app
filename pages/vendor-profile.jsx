
import dynamic from "next/dynamic";
import { useState } from "react";
import Profile from "./profile";
import Notification from "./notification";
import Payment from "./payment";
import PasswordChange from "./passwordchange";
import ConnectSocial from "./connectsocial";
import Image from "next/image";
import bank from "../public/bank.svg";
import Logactivity from "./logactivity";

const vendorprofile = ({ showNav }) => {
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
      label: "About",
      component: <Profile />,
      icon: "fa fa-users",
      imagePath: "/profilephoto.svg",
      path: "/profile",
    },
    {
      id: 2,
      label: "Product",
      component: <Payment />,
      icon: "fa fa-users",
      imagePath: "/paymntmethod.svg",
      path: "/payment",
    },
    {
      id: 3,
      label: "Hidden",
      component: <Notification />,
      icon: "fa fa-phone-square",
      imagePath: "/bell.svg",
      path: "/notification",
    },
    {
      id: 4,
      label: "Edit Profile",
      component: <Logactivity />,
      icon: "fa fa-phone-square",
      imagePath: "/loginn.svg",
      path: "/logactivity",
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

              <li className="list-none cursor-pointer border px-10 py-5 my-4 rounded-md hover:border-sky-600 hover:text-sky-500  text-gray-500">
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


export default dynamic(() => Promise.resolve(vendorprofile), { ssr: false });