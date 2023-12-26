import { Fragment, forwardRef, useState } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import New from "../components/New";
import Customers from "../pages/customers";
import { setAdminToken } from "../redux/slices/adminAuthSlice";

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
    path: "/admin-product",
    subData: [
      {
        id: "01",
        label: "All Product",
        component: <New />,
        path: "/admin-product",
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
        id: "06",
        label: "Size Chart",
        path: "/size-chart",
      },
      {
        id: "07",
        label: "main Category",
        path: "/categories",
        icon: `fa fa-usd`,
      },
      {
        id: "08",
        label: "sub Category",
        path: "/sub-categories",
        icon: `fa fa-usd`,
      },
      {
        id: "09",
        label: "color",
        component: <New />,
        path: "/color",
      },
    ],
    icon: `fa fa-usd`,
  },

  {
    id: 4,
    label: "orders",
    component: "",
    icon: `fa fa-users`,
    path: "/admin-orders",
  },
  {
    id: "",
    label: "Vendor",
    component: "",
    icon: `fa fa-users`,
    submenu: true,
    path: "/admin-vendor",
    subData: [
      {
        id: "1",
        label: "All Vendors",
        component: "",
        icon: `fa fa-users`,
        path: "/admin-vendor",
      },
      // {
      //   id: "2",
      //   label: "Vendor Grid",
      //   component: "",
      //   icon: `fa fa-users`,
      //   path: "/vendor-grid",
      // },
      {
        id: "3",
        label: "Vendor Profile",
        component: "",
        icon: `fa fa-users`,
        path: "vendor-profile",
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
    id: 7,
    label: "Language",
    component: <language />,
    icon: `fa fa-phone-square`,
    path: "/language",
  },
  // {
  //   id: 9,
  //   label: "Currency",
  //   component: <language />,
  //   icon: `fa fa-phone-square`,
  //   path: "/currency",
  // },
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
    setUserToken(null);
    // dispatch(setAdminToken(null));
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  return (
    <div
      ref={ref}
      className="fixed h-screen overflow-y-auto 2xl:w-[270px] xl:w-[220px] bg-white shadow-sm  "
    >
      <img
        src="/log.png"
        width={400}
        height={350}
        alt="login_img"
        className="mx-auto 2xl:py-3 xl:py-2 "
      />
      <div className="flex justify-center items-center whitespace-pre-wrap h-[100px]">
        <h1 className="2xl:text-2xl xl:text-[20px]  font-bold mx-5 text-lightBlue-600">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex flex-col truncate overflow-y-scroll min-h-screen">
        {menuList.map((items, inx) => (
          <Fragment key={inx}>
            <Link href={items.path ? items.path : "#"}>
              <div
                className={`2xl:pl-6 2xl:py-3 2xl:ml-5 xl:pl-5 xl:py-2 xl:ml-6 lg:pl-4 lg:py-1 lg:ml-7 rounded-l-full justify-center cursor-pointer 2xl:mb-3 xl:mb-2 lg:mb-1 flex items-center transition-colors font-semibold
                 ${
                   items?.id === labelId
                     ? "bg-lightBlue-600 text-white"
                     : "text-black-400  hover:bg-lightBlue-600 hover:rounded-l-full  hover:text-white"
                 }`}
                onClick={() => handleClick(items.label, items.id)}
              >
                <div className="w-full text-[10px] xl:text-[14px] 2xl:text-[22px]">
                  {items.submenu ? (
                    <p
                      className=" capitalize whitespace-nowrap flex gap-5 "
                      onClick={() => handleSubMenuToggle(items.id)}
                    >
                      {items.label}
                      <span className="submenu-toggle "></span>
                    </p>
                  ) : (
                    <p className=" capitalize whitespace-nowrap ">
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
                        className={`ml-12 py-3 pl-5 rounded-l-full max-w-[230px] justify-start text-left cursor-pointer mb-3 flex items-center transition-colors capitalize font-medium
                         ${
                           subOpt?.id === labelId
                             ? "bg-lightBlue-600 text-white"
                             : "text-black-400 hover:bg-lightBlue-600 hover:text-white hover:rounded-l-full "
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
          className={`pl-6 py-3 ml-5 rounded text-center rounded-l-full  cursor-pointer mb-3 flex items-center transition-colors 2xl:mt-[100px] font-semibold 
            ${
              router.pathname == "/admin-login"
                ? "bg-lightBlue-600 text-white"
                : "text-black-400 hover:bg-lightBlue-600 hover:text-white  "
            }`}
          onClick={handleSignout}
        >
          <div className="mr-2">
            <CreditCardIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] xl:text-[14px] 2xl:text-[22px]">Log Out </p>
          </div>
        </div>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
