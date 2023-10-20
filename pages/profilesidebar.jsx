
import { useState } from "react";
import Profile from "./profile";
import Notification from "./notification";
import Payment from "./payment";
import PasswordChange from "./passwordchange";
import ConnectSocial from "./connectsocial";

const profilesideBar = ({ showNav }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const menuList = [
    {
      id: 1,
      label: "Personal Info",
      component: <Profile/>,
      icon: "fa fa-users",
      path: "/profile"
    },
    {
      id: 2,
      label: "Payment Method",
      component: <Payment/>,
      icon: "fa fa-users",
      path: "/payment"
    },
    {
      id: 3,
      label: "Notification Setting",
      component: <Notification/>, 
      icon: "fa fa-phone-square",
      path: '/notification'
    },
    {
      id: 4,
      label: "Login Activity",
      component: '', // Replace with the actual component you want to render
      icon: "fa fa-phone-square",
      path: '/profile'
    },
    {
      id: 5,
      label: "Change Password",
      component:<PasswordChange/>, 
      icon: "fa fa-phone-square",
      path: '/passwordchange'
    },
    {
      id: 6,
      label: "Connect With Social",
      component:<ConnectSocial/>,
      icon: "fa fa-phone-square",
      path: '/profile'
    },
  ];

  return (
    <div>
       <h1 className="text-[30px] ml-4 ">Setting</h1>
    
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
        <li className="list-none border px-10 py-5 my-4 rounded-md hover:border-sky-600 hover:text-sky-500  text-gray-500">    {item.label}</li>
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
            <Profile/>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default profilesideBar;
