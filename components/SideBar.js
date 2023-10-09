import { Fragment, forwardRef, useState } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import New from "./New";
import RightArrow from "./svg/rightArrow";
import Customers from "../pages/customers";

const menuList = [
  {
    id: 1,
    label: "Dashboard",
    component: '',
    icon: `fa fa-home`,
    path:'/admin-dashboard'
  },
  {
    id: 2,
    label: "products",
    component: '',
    submenu: true,
    subData: [
      {
        id: 0,
        label: "product list",
        component: <New />,
        path:'/product-list'
      },
      {
        id: 1,
        label: "product grid",
        component: <New />,
        path:'/product-grid'
      },
      {
        id: 3,
        label: "product add", 
        component: <New />,
        path:'/add-product'
      },
      {
        id: 4,
        label: "product details",
        component: <New />,
        path:'/product-details'
      },
      {
        id: 3,
        label: "product cart",
        component: <New />,
        path:'/product-cart'
      },
    ],
    icon: `fa fa-usd`,
  },
  {
    id: 3,
    label: "categories",
    component: '',
    submenu: true,
    subData: [
      {
        id: 1,
        label: "categories list",
        component: <New />,
      },
      {
        id: 2,
        label: "categories add",
        component: <New />,
      },
      {
        id: 3,
        label: "categories edit",
        component: <New />,
      },
    ],
    icon: `fa fa-usd`,
  },
  {
    id: 4,
    label: "orders",
    component: '',
    icon: `fa fa-users`,
    path:"/orders"
  },
  {
    id: 5,
    label: "customers",
    component: <Customers />,
    icon: `fa fa-phone-square`,
    path: '/customers'
  },
  {
    id: 6,
    label: "transitions",
    component: '',
    icon: `fa fa-phone-square`,
  },
  {
    id: 7,
    label: "settings",
    component: '',
    icon: `fa fa-phone-square`,
  },
];

const SideBar = forwardRef(({ showNav }, ref) => {

  const router = useRouter();
  const [show, setShow] = useState("Dashboard");
  const [labelId, setLabelId] = useState(1);
  const [activeSubMenuId, setActiveSubMenuId] = useState(null);

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
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("userDetails")
    router.push("/login")
  }

  return (
    <div ref={ref} className="fixed w-[250px] h-full bg-white shadow-sm">
      <div className="flex justify-center items-center whitespace-pre-wrap h-[100px] my-14">
        <h1 className="text-3xl font-bold mx-5 text-sky-600">Admin Dashboard</h1>
      </div>

      <div className="flex flex-col">
        {
          menuList.map((items, inx) => (
            <Fragment key={inx}>
              <Link href={items.path?items.path:'#'}>
                <div
                  className={`pl-6 py-3 mx-5 rounded justify-center cursor-pointer mb-3 flex items-center transition-colors font-semibold
                 ${items?.id === labelId
                      ? "bg-sky-600 text-white"
                      : "text-black-400  hover:bg-sky-600  hover:text-white"
                    }`}
                  onClick={() => handleClick(items.label, items.id)}
                >
                  {/* <div className="mr-2">
                <HomeIcon className="h-5 w-5" />
              </div> */}
                  <div className='w-full'>
                    {
                      items.submenu ?
                        <p className=" capitalize whitespace-nowrap flex gap-5"
                          onClick={() => handleSubMenuToggle(items.id)}
                        >
                          {items.label}
                          <span
                            className="submenu-toggle"
                          >
                            <RightArrow />
                          </span>
                        </p> :
                        <p className=" capitalize whitespace-nowrap" >
                          {items.label}
                        </p>
                    }

                  </div>
                </div>
              </Link>
              <div
                className={`dropdown ${items.id === activeSubMenuId ? "active" : ""
                  }`}
              >
                {items.submenu && (
                  <div className="dropdown-content">
                    {items.subData.map((subOpt, subInx) => (
                    <Link href={subOpt.path?subOpt.path:'#'} key={subInx}>
                      <div
                        className={`pl-6 py-3 mx-5 rounded max-w-[200px] justify-center text-left cursor-pointer mb-3 flex items-center transition-colors capitalize font-medium
                         ${subOpt?.id === labelId
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
          ))
        }

          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors mt-[144px] font-semibold
            ${router.pathname == "/admin-login"
                ? "bg-sky-600 text-white"
                : "text-black-400 hover:bg-sky-600 hover:text-white"
              }`}
              onClick={handleSignout}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Signout</p>
            </div>
          </div>\
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
