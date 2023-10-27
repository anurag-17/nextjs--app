import React from "react";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

const menuList = [
  {
    id: 1,
    label: "Your Account",
    component: "",
    icon: "fa fa-users",
    imagePath: "",
    path: "/user-profile",
  },
  {
    id: 2,
    label: "Wishlist",
    component: "",
    icon: "fa fa-users",
    imagePath: "",
    path: "/wish-list",
  },
  {
    id: 3,
    label: "Order",
    component: "",
    icon: "fa fa-phone-square",
    path: "/user-order",
  },

  {
    id: 4,
    label: "Notifiction",
    component: "",
    icon: "fa fa-phone-square",
    imagePath: "/loginn.svg",
    path: "/",
  },
  {
    id: 5,
    label: "Setting",
    component: "",
    icon: "fa fa-phone-square",
    imagePath: "",
    path: "/user-setting",
  },
  {
    id: 6,
    label: "FAQ",
    component: "",
    icon: "fa fa-phone-square",
    imagePath: "",
    path: "/userFAQ",
  },
  {
    id: 7,
    label: "Sign Out",
    component: "",
    icon: "fa fa-phone-square",
    imagePath: "/social.svg",
    path: "/",
  },
];
const UserNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <nav className="p-6 bg-white border mb-5 flex justify-between">
        <ul className="flex justify-start">
          <div className="text-center">
            <button
              className="w-36"
              type="button"
              onClick={openDrawer} // Open the drawer when this button is clicked
            >
              <div className="w-[30%]">
                <div className="bg-black p-[3px] my-2"></div>
                <div className="bg-black p-[3px] my-2"></div>
                <div className="bg-black p-[3px] my-2"></div>
              </div>
            </button>
          </div>

          {/* drawer component */}
          {isDrawerOpen && (
            <div
              id="drawer-form"
              className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto  border transition-transform -translate-x-0 bg-white w-2/12 dark:bg-gray-800"
              tabIndex={-1}
              aria-labelledby="drawer-form-label"
            >
              {/* button to close the drawer */}
              <button
                type="button"
                onClick={closeDrawer}
                className="text-gray-400  shadow-2xl text-sm  h-12  top-3 float-right inline-flex items-center justify-center   "
              >
                <ArrowLeftIcon className="w-12 h-12 bg-white border rounded-xl p-1 hover:bg-orange-100 hover:text-black" />

                <span className="sr-only bg-black">Close menu</span>
              </button>
              <img src="/log.png" className=" p-0" />
              <div className="">
                <ul>
                  {menuList.map((item) => (
                    <Link href={item.path ? item.path : "#"}>
                      <li className="list-none cursor-pointer border px-10 py-5 my-4 rounded-md hover:border-sky-600 hover:text-sky-500  text-gray-500">
                        {" "}
                        {item.label}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </ul>
        <ul className="flex justify-end">
          <input type="text" placeholder="Search" className="p-1 border rounded-lg"/>
        </ul>
      </nav>
    </>
  );
};

export default UserNavbar;
