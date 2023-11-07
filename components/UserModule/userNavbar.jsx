import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import Link from "next/link";

import {setToken, setUserDetails } from "../../redux/slices/authSlice";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import shoping from "../../public/shopingcart.svg";


const menuList = [
  {
    id: 0,
    label: "All Products ",
    component: "",
    icon: "fa fa-users",
    imagePath: "",
    path: "/all-product",
  },
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
    path: "/user-wishlist",
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
    label: "Notification",
    component: "",
    icon: "fa fa-phone-square",
    imagePath: "/loginn.svg",
    path: "user-notifictionSet",
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
    id: 8,
    label: "Invoice",
    component: "",
    icon: "fa fa-phone-square",
    path: "/user-invoice",
  },
  {
    id: 9,
    label: "Order Details",
    component: "",
    icon: "fa fa-phone-square",
    path: "/userorder-detail",
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
  const router = useRouter();
  const dispatch = useDispatch()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { token } = useSelector((state) => state.auth.userDetails || null);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSignOut = ()=>{
    dispatch(setUserDetails({}))
    localStorage.removeItem("token");
    router.push('/login');
  }
  const handleLogin = ()=>{
    router.push('/login');
  }

  return (
    <>
      <nav className="p-6 bg-white border mb-5 flex justify-between">
        <ul className="flex justify-start w-full">
          <div className="flex justify-between w-full">
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
            <div className="flex items-cente gap-[20px]">
              {
              ( !token || token == undefined ) && 
                <div className="bg-lightBlue-500 text-white rounded px-6 py-2 flex justify-center items-center h-[44px] text-[18px] font-semibold cursor-pointer" 
                onClick={handleLogin}>Login
                </div>
           
              }
              <Link href="/cart">
                <Image src={shoping}  className="w-12 mr-10"/>
              </Link>
            </div>
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
              <Link href="/">
                <img src="/log.png" className=" p-0" />
              </Link>
              <div className="">
                <ul>
                  {menuList.map((item) => (
                  <>
                  {
                    item.id === 7 ?
                    <>
                    {
                      !token || token == undefined ?
                      null :

                      <li className="list-none cursor-pointer border px-10 py-5 my-4 rounded-md hover:border-sky-600 hover:text-sky-500  text-gray-500" 
                      onClick={()=>handleSignOut(item.path)}>
                        {item.label}
                      </li>
                    }
                    </>
                      :
                    <Link href={item.path ? item.path : "#"}>
                      <li className="list-none cursor-pointer border px-10 py-5 my-4 rounded-md hover:border-sky-600 hover:text-sky-500  text-gray-500">
                        {item.label}
                      </li>
                    </Link>
                  }
                  </>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </ul>
        {/* <ul className="flex justify-end">
          <input type="text" placeholder="Search" className="p-1 border rounded-lg"/>
        </ul> */}
      </nav>
    </>
  );
};

export default UserNavbar;
