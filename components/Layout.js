import { useState, useEffect, Fragment } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";


export default function Layout({ children }) {
  
  const router = useRouter();
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  

  function handleResize() {
    if (innerWidth <= 1024) {
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
      router.pathname === "/" ||
      router.pathname === "/user-signup" ||
      router.pathname === "/login" ||
      router.pathname === "/user-product" ||
      router.pathname === "/user-wishlist" ||
      router.pathname === "/user-order-history" ||
      router.pathname === "/userFAQ" ||
      router.pathname === "/user-profile" ||
      router.pathname === "/user-setting" ||
      router.pathname === "/userorder-detail" ||
      router.pathname === "/user-invoice" ||
      router.pathname === "/user-notifiction" ||
      router.pathname === "/product-filter/[slug]" ||
      router.pathname === "/user-cart" ||
      router.pathname === "/success" ||
      router.pathname === "/cancel" ||
      router.pathname.includes("product-details") ||
      router.pathname.includes("password") 
      ? null : (
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
            <SideBar showNav={showNav}/>
          </Transition>
        </>
      )}
      <main
        className={` transition-all duration-[400ms]  ${
          showNav &&
          !isMobile &&
          !(
            router.pathname === "/admin-login" ||
            router.pathname === "/" ||
            router.pathname === "/user-signup" ||
            router.pathname === "/login" ||
            router.pathname === "/user-product" ||
            router.pathname === "/userFAQ" ||
            router.pathname === "/user-profile" ||
            router.pathname === "/user-order-history" ||
            router.pathname === "/user-wishlist" ||
            router.pathname === "/user-setting" ||
            router.pathname === "/user-invoice" || 
            router.pathname === "/user-cart" ||
            router.pathname === "/userorder-detail" ||
            router.pathname === "/user-notifiction"||
            router.pathname === "/product-filter/[slug]" ||
            router.pathname === "/success" ||
      router.pathname === "/cancel" ||
            router.pathname.includes("product-details") 
            ||
            router.pathname.includes("password") 
          )
            ? "pt-[4rem] pl-56"
            : ""
        }`}
      >
        <div
          className={
            !(
              router.pathname === "/admin-login" ||
              router.pathname === "/" ||
              router.pathname === "/user-signup" ||
              router.pathname === "/login" ||
              router.pathname === "/userFAQ" ||
              router.pathname === "/user-profile" ||
              router.pathname === "/user-wishlist" ||
              router.pathname === "/user-order-history" ||
              router.pathname === "/user-product" ||
              router.pathname === "/user-setting" ||
              router.pathname === "/user-invoice" ||
              router.pathname === "/user-cart" ||
              router.pathname === "/userorder-detail" ||
              router.pathname === "/user-notifiction"||
              router.pathname === "/product-filter/[slug]" ||
              router.pathname === "/success" ||
      router.pathname === "/cancel" ||
              router.pathname.includes("product-details") 
              ||
              router.pathname.includes("password") 
            )
              ? "lg:pl-2 lg:pr-2 xl:pl-6 xl:pr-6 2xl:pl-24 "
              : ""
          }
        >
          {children}
        </div>
      </main>
    </>
  );
}
