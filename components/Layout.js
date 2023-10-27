import { useState, useEffect, Fragment } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  console.log("router", router.pathname);
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  // const [adminAccessToken, setAdminAccessToken] = useState(
  //   JSON.parse(sessionStorage.getItem("accessToken"))
  // );

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // console.log("isAuthenticated",isAuthenticated)

  // useEffect(() => {
  //   const authToken = sessionStorage.getItem('accessToken');
  //   if (authToken) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!isAuthenticated && router.pathname === "/admin-dashboard") {
  //     router.replace("/admin-login");
  //   }
  //   else{
  //     router.replace("/admin-dashboard");
  //   }
  // }, [isAuthenticated, router.pathname]);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {router.pathname === "/admin-login" ||
      router.pathname === "/signup" ||
      router.pathname === "/login" ||
      router.pathname === "/all-product" ||
      router.pathname === "/wish-list" ||
      router.pathname === "/user-order" ||
      router.pathname === "/userFAQ" ||
      router.pathname === "/user-profile" ||
      router.pathname === "/user-setting" ? null : (
        <>
          <TopBar showNav={showNav} setShowNav={setShowNav} />
          <Transition
            as={Fragment}
            show={showNav}
            enter="transform transition duration-[400ms]"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform duration-[400ms] transition ease-in-out"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <SideBar showNav={showNav} />
          </Transition>
        </>
      )}
      <main
        className={` transition-all duration-[400ms] ${
          showNav &&
          !isMobile &&
          !(
            router.pathname === "/admin-login" ||
            router.pathname === "/signup" ||
            router.pathname === "/login" ||
            router.pathname === "/all-product" ||
            router.pathname === "/userFAQ" ||
            router.pathname === "/user-profile" ||
            router.pathname === "/user-order" ||
            router.pathname === "/wish-list" ||
            router.pathname === "/user-setting"
          )
            ? "pt-16 pl-56"
            : ""
        }`}
      >
        <div
          className={
            !(
              router.pathname === "/admin-login" ||
              router.pathname === "/signup" ||
              router.pathname === "/login" ||
              router.pathname === "/userFAQ" ||
              router.pathname === "/user-profile" ||
              router.pathname === "/wish-list" ||
              router.pathname === "/user-order" ||
              router.pathname === "/all-product" ||
              router.pathname === "/user-setting"
            )
              ? "px-4 md:px-16"
              : ""
          }
        >
          {children}
        </div>
      </main>
    </>
  );
}
