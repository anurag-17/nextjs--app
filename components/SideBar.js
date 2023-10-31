import { Fragment, forwardRef, useState } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import New from "../components/New";
import Customers from "../pages/customers";

const menuList = [
  {
    id: 1,
    label: "Dashboard",
    component: "",
    icon: `fa fa-home`,
    path: "/admin-dashboard",
  },
  {
    id: 2,
    label: "products",
    component: "",
    submenu: true,
    subData: [
      {
        id: "01",
        label: "All Product",
        component: <New />,
        path: "/product-list",
      },

      {
        id: "03",
        label: "product add",
        component: <New />,
        path: "/add-product",
      },

      {
        id: "05",
        label: "Brand",
        component: <New />,
        path: "/brand",
      },
      {
        id: 3,
        label: "categories",
        path: "/categories",
        submenu: true,
        subData: [
          {
            id: "001",
            label: "categories list",
            component: <New />,
          },
          {
            id: "002",
            label: "categories add",
            component: <New />,
          },
        ],
        icon: `fa fa-usd`,
      },
    ],
    icon: `fa fa-usd`,
  },

  {
    id: 4,
    label: "orders",
    component: "",
    icon: `fa fa-users`,
    path: "/orders",
  },
  {
    id: "",
    label: "Vendor",
    component: "",
    icon: `fa fa-users`,
    submenu: true,
    subData: [
      {
        id: "1",
        label: "Vendor List",
        component: "",
        icon: `fa fa-users`,
        path: "/vendor",
      },
      {
        id: "2",
        label: "Vendor Grid",
        component: "",
        icon: `fa fa-users`,
        path: "/vendor-grid",
      },
      {
        id: "3",
        label: "Vendor Profile",
        component: "",
        icon: `fa fa-users`,
        path: "",
      },
    ],
  },
  {
    id: 5,
    label: "customers",
    component: <Customers />,
    icon: `fa fa-phone-square`,
    path: "/customers",
  },
  {
    id: 6,
    label: "transactions",
    component: "",
    icon: `fa fa-phone-square`,
    path: "/drawer",
  },
  {
    id: 7,
    label: "Language",
    component: <language />,
    icon: `fa fa-phone-square`,
    path: "/language",
  },
  {
    id: 8,
    label: "settings",
    component: "",
    icon: `fa fa-phone-square`,
    path: "/profilesidebar",
  },
];

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();
  const [show, setShow] = useState("Dashboard");
  const [labelId, setLabelId] = useState(1);
  const [activeSubMenuId, setActiveSubMenuId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const handleClick = (label, id) => {
    setShow(label);
    setLabelId(id);
  };

  const handleSubMenuToggle = (id) => {
    if (activeSubMenuId === id) {
      setActiveSubMenuId(null);
    } else {
      setActiveSubMenuId(id);
    }
  };

  const handleSignout = () => {
    console.log("Logging out...");

    // Remove user token from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("userToken");

    setUserToken(null);
    setUserDetails(null);

    router.push("/login");
  };

  return (
    <div ref={ref} className="fixed w-[250px] bg-white shadow-sm ">
      <img
        src="/log.png"
        width={400}
        height={350}
        alt="login_img"
        className="mx-auto py-2"
      />
      <div className="flex justify-center items-center whitespace-pre-wrap h-[100px]">
        <h1 className="text-2xl font-bold mx-5 text-sky-600">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex flex-col truncate scroll-auto">
        {menuList.map((items, inx) => (
          <Fragment key={inx}>
            <Link href={items.path ? items.path : "#"}>
              <div
                className={`pl-6 py-3 mx-5 rounded justify-center cursor-pointer mb-3 flex items-center transition-colors font-semibold
                 ${
                   items?.id === labelId
                     ? "bg-sky-600 text-white"
                     : "text-black-400  hover:bg-sky-600  hover:text-white"
                 }`}
                onClick={() => handleClick(items.label, items.id)}
              >
                {/* <div className="mr-2">
                <HomeIcon className="h-5 w-5" />
              </div> */}
                <div className="w-full">
                  {items.submenu ? (
                    <p
                      className=" capitalize whitespace-nowrap flex gap-5"
                      onClick={() => handleSubMenuToggle(items.id)}
                    >
                      {items.label}
                      <span className="submenu-toggle">
                        {/* <RightArrow /> */}
                      </span>
                    </p>
                  ) : (
                    <p className=" capitalize whitespace-nowrap">
                      {items.label}
                    </p>
                  )}
                </div>
              </div>
            </Link>
            <div
              className={`dropdown ${
                items.id === activeSubMenuId ? "active" : ""
              }`}
            >
              {items.submenu && (
                <div className="dropdown-content">
                  {items.subData.map((subOpt, subInx) => (
                    <Link href={subOpt.path ? subOpt.path : "#"} key={subInx}>
                      <div
                        className={`pl-6 py-3 mx-5 rounded max-w-[200px] justify-center text-left cursor-pointer mb-3 flex items-center transition-colors capitalize font-medium
                         ${
                           subOpt?.id === labelId
                             ? "bg-sky-600 text-white"
                             : "text-black-400 hover:bg-sky-600 hover:text-white"
                         }`}
                        onClick={() => handleClick(subOpt.label, subOpt.id)}
                      >
                        {subOpt.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Fragment>
        ))}

        <div
          className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors mt-[144px] font-semibold
            ${
              router.pathname == "/admin-login"
                ? "bg-sky-600 text-white"
                : "text-black-400 hover:bg-sky-600 hover:text-white"
            }`}
          onClick={handleSignout}
        >
          <div className="mr-2">
            <CreditCardIcon className="h-5 w-5" />
          </div>
          <div>
            <p>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
