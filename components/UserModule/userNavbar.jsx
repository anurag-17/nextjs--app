import React, { useEffect } from "react";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import shoping from "../../public/shopingcart.svg";
import { Dialog, Transition } from "@headlessui/react";
import { fetchApi } from "../../utlis/api";
import { setCartItems } from "../../redux/slices/orderSlice";
import { setToken } from "../../redux/slices/authSlice";

const menuList = [
  {
    id: 0,
    label: "All Products ",
    component: "",
    icon: "fa fa-users",
    imagePath: "",
    path: "/user-product",
    show: true,
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
    path: "user-notifiction",
    show: true,
  },
  {
    id: 5,
    label: "Setting",
    component: "",
    icon: "fa fa-phone-square",
    imagePath: "",
    path: "/user-setting",
    show: true,
  },
  {
    id: 6,
    label: "FAQ",
    component: "",
    icon: "fa fa-phone-square",
    imagePath: "",
    path: "/userFAQ",
    show: true,
  },
  // {
  //   id: 8,
  //   label: "Invoice",
  //   component: "",
  //   icon: "fa fa-phone-square",
  //   path: "/user-invoice",
  //   show: true,
  // },
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
  const [isOpenLogin, setOpenLogin] = useState(false);
  const [isRefresh, setrefresh] = useState(false);
  const { token } = useSelector((state) => state.auth.userDetails || null);
  const { cart } = useSelector((state) => state.auth || []);


  const refreshData = () => {
    setrefresh(!isRefresh);
  };
  const openLoginModal = () => {
    if (!token || token === undefined) {
      setOpenLogin(true);
    }else{
      router.push("/user-wishlist");
    }
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
    dispatch(setToken(null));
    window.location.reload();
    // router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (token) {
      defaultCustomer();
    }
  }, []);

  const defaultCustomer = async () => {
    try {
      const response = await fetchApi("/auth/getUserCart", token);
      if (response?.status === 200) {
        const data = await response.json();
        setCartItems(dispatch(data?.cart?.products))

        if (typeof window !== "undefined") {
          refreshData()
        }
      } else if (response.status === 202) {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="px-6  border mb-5 flex justify-between ">
        <div className="flex justify-start w-full">
          <div className="flex justify-between w-full items-center">
            {
              !token || token == undefined ?
                <Link href="/">
                  <Image src="/log.png" alt="logo" height={200} width={200} />
                </Link>
                :
                <div className="text-center flex">
                  <button 
                    className="w-36 focus-visible:outline-none"
                    type="button"
                    onClick={openDrawer} // Open the drawer when this button is clicked
                  >
                    <div className="2xl:w-[30%] w-[25%]">
                      <div className="bg-black 2xl:p-[3px] p-[2px] my-1  2xl:my-2"></div>
                      <div className="bg-black 2xl:p-[3px] p-[2px] my-1  2xl:my-2"></div>
                      <div className="bg-black 2xl:p-[3px] p-[2px] my-1  2xl:my-2"></div>
                    </div>
                  </button>
                </div>
            }
            <Link href="/" className="uppercase text-lightBlue-700 font-bold 2xl:text-[40px] lg:text-[28px] text-center ">
              E-commerce WEBSITE
            </Link>
            <div className="flex items-center gap-[10px] justify-center">
              {(!token || token == undefined) ?
                <>
                  <div
                    className="bg-lightBlue-200 text-black rounded px-6 py-2 flex justify-center items-center h-[44px] text-[18px] font-semibold cursor-pointer"
                    onClick={handleLogin}
                  >
                    Login
                  </div>
                  <Link href="/user-cart">
                    <div className="flex text-black font-medium text-[19px]">
                      <Image src={shoping} className="relative" width={35} height={35} alt="cart" />
                    </div>
                  </Link>
                </>
                :
                <>
                  {/* <Link href="/user-wishlist"> */}
                    <div className="cursor-pointer" onClick={openLoginModal}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="w-[35px] h-[35px] font-bold "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                  {/* </Link> */}
                  <Link href="/user-cart">
                    <div className="py-6 ">
                      <Image src={shoping} className="relative" width={35} height={35} alt="cart" />
                    </div>
                    {
                      cart?.length > 0 &&
                    <div className=" absolute top-[6px] right-[36px] bg-[#d91919]  text-white w-[30px] h-[30px] rounded-[50%] font-bold flex flex-col justify-center items-center">{cart?.length}  </div>
                    }
                  </Link>
                </>
              }

            </div>
          </div>

          {/* drawer component */}
          {isDrawerOpen && (
            <div
              id="drawer-form"
              className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto  border transition-transform -translate-x-0  w-2/12 bg-lightBlue-50"
              tabIndex={-1}
              aria-labelledby="drawer-form-label"
            >
              {/* button to close the drawer */}
              <button
                type="button"
                onClick={closeDrawer}
                className="text-gray-400  shadow-2xl text-sm  h-12  top-3 float-right inline-flex items-center justify-center   "
              >
                <ArrowLeftIcon className="w-12 h-12 bg-white border rounded-xl p-1 hover:bg-orange-100 " />

                <span className="sr-only bg-black">Close menu</span>
              </button>
              <Link href="/">
                <Image src="/log.png" alt="logo" height={200} width={300} />
              </Link>
              <div className="">
                <ul>
                  {menuList.map((item) => (
                    <React.Fragment key={item.id}>
                      {item.id === 7 ? (
                        !token || token === undefined ? null : (
                          <li
                            className={`list-none cursor-pointer border 2xl:px-10 px-4 2xl:py-4 py-2 my-4 rounded-md hover:border-lightBlue-600  2xl:text-[18px] text-[15px] font-semibold   hover:text-white hover:bg-lightBlue-600
                            ${item.path === router.pathname ? "bg-lightBlue-500 text-white" : "bg-lightBlue-100 text-[#3c3939]"}`}
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
                                <li
                                  className={`list-none cursor-pointer border 2xl:px-10 px-4 2xl:py-4 py-2 my-4 rounded-md hover:border-lightBlue-600  2xl:text-[18px] text-[15px] font-semibold  hover:text-white hover:bg-lightBlue-600
                                 ${item.path === router.pathname ? "bg-lightBlue-500 text-white" : "bg-lightBlue-100 text-[#3c3939]"}`}
                                >
                                  {item.label}
                                </li>
                              </Link>
                            ))}
                          {!item.show && (
                            <Link href={item.path ? item.path : "#"}>
                              <li
                                className={`list-none cursor-pointer border 2xl:px-10 px-4 2xl:py-4 py-2 my-4 rounded-md hover:border-lightBlue-600  2xl:text-[18px] text-[15px] font-semibold  hover:text-white hover:bg-lightBlue-500
                               ${item.path === router.pathname ? "bg-lightBlue-500 text-white" : "bg-lightBlue-100 text-[#3c3939]"}`}
                              >
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
        </div>
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
