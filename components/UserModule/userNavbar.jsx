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
import { setCartItems } from "../../redux/slices/orderSlice";

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
    path: "user-notifictionSet",
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
  const [isShow, setShow] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [isRefresh, setrefresh] = useState(false);
  const { token } = useSelector((state) => state.auth.userDetails || null);
  const { cartItem } = useSelector((state) => state.order || 0);

  useEffect(() => {
    setCartLength(localStorage.getItem("productsLength") || 0);
  }, [isRefresh]);

  useEffect(() => {
    if (!token || token === undefined) {
      router.push("/");
    }
  }, []);


  const refreshData = () => {
    setrefresh(!isRefresh);
  };
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
    localStorage.removeItem(" ");
    window.location.reload();

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
          // localStorage.setItem("productsLength", data?.cart?.products?.length);
          // setCartLength(data?.cart?.products?.length)
          alert("S")
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
            }
            <div className="flex items-cente gap-[20px]">
              {(!token || token == undefined) ?
                <>
                  <div
                    className="bg-lightBlue-200 text-black rounded px-6 py-2 flex justify-center items-center h-[44px] text-[18px] font-semibold cursor-pointer"
                    onClick={handleLogin}
                  >
                    Login
                  </div>
                  {/* <div className="">
                    New customer  - <div className="underline text-[18px] font-medium text-lightBlue-600">Signup</div>
                  </div> */}
                  <Link href="/user-cart">
                    <div className="flex text-black font-medium text-[19px]">
                      <Image src={shoping} className="relative" width={45} height={45} alt="cart" />
                    </div>
                  </Link>
                </>
                :
                <Link href="/user-cart">
                  <div className="py-6">
                    <Image src={shoping} className="relative" width={45} height={45} alt="cart" />
                  </div>
                  <div className=" absolute top-[6px] right-[36px] bg-[#d91919]  text-white w-[30px] h-[30px] rounded-[50%] font-bold flex flex-col justify-center items-center">{cartItem}  </div>
                </Link>
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
                            className={`list-none cursor-pointer border px-10 py-4 my-4 rounded-md hover:border-lightBlue-600  text-[18px] font-semibold   hover:text-white hover:bg-lightBlue-600
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
                                  className={`list-none cursor-pointer border px-10 py-4 my-4 rounded-md hover:border-lightBlue-600  text-[18px] font-semibold  hover:text-white hover:bg-lightBlue-600
                                 ${item.path === router.pathname ? "bg-lightBlue-500 text-white" : "bg-lightBlue-100 text-[#3c3939]"}`}
                                >
                                  {item.label}
                                </li>
                              </Link>
                            ))}
                          {!item.show && (
                            <Link href={item.path ? item.path : "#"}>
                              <li
                                className={`list-none cursor-pointer border px-10 py-4 my-4 rounded-md hover:border-lightBlue-600  text-[18px] font-semibold  hover:text-white hover:bg-lightBlue-500
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
