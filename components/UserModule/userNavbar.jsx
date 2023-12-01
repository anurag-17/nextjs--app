import React, { useEffect } from "react";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { setUserDetails } from "../../redux/slices/authSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import shoping from "../../public/shopingcart.svg";
import { Dialog, Transition } from "@headlessui/react";
import { fetchApi } from "../../utlis/api";

const menuList = [
  {
    id: 0,
    label: "All Products ",
    component: "",
    icon: "fa fa-users",
    imagePath: "",
    path: "/user-product",
  },
  {
    id: 1,
    label: "Your Account",
    component: "",
    icon: "fa fa-users",
    imagePath: "",
    path: "/user-profile",
    show: true,
  },
  {
    id: 2,
    label: "Wishlist",
    component: "",
    icon: "fa fa-users",
    imagePath: "",
    path: "/user-wishlist",
    show: true,
  },
  {
    id: 3,
    label: "Order History",
    component: "",
    icon: "fa fa-phone-square",
    path: "/user-order-history",
    show: true,
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
  // {
  //   id: 9,
  //   label: "Order Details",
  //   component: "",
  //   icon: "fa fa-phone-square",
  //   path: "/userorder-detail",
  //   show: true,
  // },
  {
    id: 7,
    label: "Sign Out",
    component: "",
    icon: "fa fa-phone-square",
    imagePath: "/social.svg",
    path: "/",
    show: true,
  },
];

const UserNavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { token } = useSelector((state) => state.auth.userDetails || null);
  const [isOpenLogin, setOpenLogin] = useState(false);
  const [isShow, setShow] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    setCartLength(localStorage.getItem("productsLength") || 0);
  }, []);

  const openLoginModal = () => {
    setOpenLogin(true);
  };
  const closeLoginModal = () => {
    setOpenLogin(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSignOut = () => {
    dispatch(setUserDetails({}));
    localStorage.removeItem("wishList");
    localStorage.removeItem("userID");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userNum");
    localStorage.removeItem("userAdd");
    localStorage.removeItem("userMail");
    window.location.reload();
  };

  const handleLogin = () => {
    router.push("/login");
  };

 

  return (
    <>
      <nav className="p-6 bg-white border mb-5 flex justify-between">
        <ul className="flex justify-start w-full">
          <div className="flex justify-between w-full items-center">
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
              {(!token || token == undefined) && (
                <div
                  className="bg-lightBlue-500 text-white rounded px-6 py-2 flex justify-center items-center h-[44px] text-[18px] font-semibold cursor-pointer"
                  onClick={handleLogin}
                >
                  Login
                </div>
              )}

              <Link href="/user-cart">
                <div className="">
                  <Image src={shoping} className="relative" width={45} height={45} alt="cart"  />
                </div>
                  <div className=" absolute top-[15px] right-[40px] bg-[#d91919]  text-white w-[30px] h-[30px] rounded-[50%] font-bold flex flex-col justify-center items-center">{cartLength}</div>
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
                    <React.Fragment key={item.id}>
                      {item.id === 7 ? (
                        !token || token === undefined ? null : (
                          <li
                            className="list-none cursor-pointer border px-10 py-5 my-4 rounded-md hover:border-sky-600 hover:text-sky-500 text-gray-500"
                            onClick={() => handleSignOut(item.path)}
                          >
                            {item.label}
                          </li>
                        )
                      ) : (
                        <>
                          {item.show &&
                            (!token || token === undefined ? null : (
                              <Link href={item.path ? item.path : "#"}>
                                <li className="list-none cursor-pointer border px-10 py-5 my-4 rounded-md hover:border-sky-600 hover:text-sky-500 text-gray-500">
                                  {item.label}
                                </li>
                              </Link>
                            ))}
                          {!item.show && (
                            <Link href={item.path ? item.path : "#"}>
                              <li className="list-none cursor-pointer border px-10 py-5 my-4 rounded-md hover:border-sky-600 hover:text-sky-500 text-gray-500">
                                {item.label}
                              </li>
                            </Link>
                          )}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </ul>
      </nav>

      <Transition appear show={isOpenLogin} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeLoginModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[600px] transform overflow-hidden rounded-2xl bg-white py-10 px-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h4"
                    className="lg:text-[25px] text-[16px] font-semibold leading-6 text-gray-900 mb-4"
                  >
                    Please login to Open wishlist
                  </Dialog.Title>

                  <div className="flex justify-between gap-x-5 pt-4">
                    <button
                      className="w-full border border-1 rounded-md border-lightBlue-400 text-lightBlue-700 hover:bg-lightBlue-200 text-sm  px-2 py-3 hover:border-none"
                      onClick={closeLoginModal}
                    >
                      No
                    </button>
                    <Link href="/login" className="w-full">
                      <button className="w-full border border-1 rounded-md  text-sm  border-red-400 text-red-700 hover:bg-red-200  px-2 py-3 hover:border-none">
                        Ok
                      </button>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UserNavbar;
