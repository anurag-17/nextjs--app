import { useState, useEffect, Fragment } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";

export default function Layout({ children }) {


  const router = useRouter();
  console.log("router", router.pathname)
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
      {
        router.pathname === "/admin-login" || router.pathname === "/signup" ?
          null :
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
      }
      <main
        className={` transition-all duration-[400ms] ${(showNav  && !isMobile) && !(router.pathname === "/admin-login" || router.pathname === "/signup" )? "pt-16 pl-56" : ""
          }`}
      >
        <div className={!(router.pathname === "/admin-login" || router.pathname === "/signup" ) && "px-4 md:px-16"}>{children}</div>
      </main>
    </>
  );
}
