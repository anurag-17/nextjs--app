import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import New from "./new";

const adminDashList = [
  {
    id: 1,
    label: "Dashboard",
    component:'',
    icon: `fa fa-home`,
  },
  {
    id: 2,
    label: "products",
    component:'',
    submenu: true,
    subData: [
      {
        id: 1,
        label: "product grid",
        component: <New />,
      },
      {
        id: 2,
        label: "product details",
        component: <New />,
      },
      {
        id: 3,
        label: "product edit",
        component: <New />,
      },
      {
        id: 3,
        label: "product add",
        component: <New />,
      },
      {
        id: 3,
        label: "product cart",
        component: <New />,
      },
    ],
    icon: `fa fa-usd`,
  },
  {
    id: 3,
    label: "categories",
    component:'',
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
    component:'',
    icon: `fa fa-users`,
  },
  {
    id: 5,
    label: "customers",
    component: '',
    icon: `fa fa-phone-square`,
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


  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center items-center whitespace-pre-wrap h-[100px] my-14">
         <h1 className="text-4xl font-bold px-3">Admin Dashboard</h1>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-black text-white"
                : "text-gray-400 hover:bg-black hover:text-white "
            }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link href="/account">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/account"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Account</p>
            </div>
          </div>
        </Link>
        <Link href="/billing">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/billing"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Billing</p>
            </div>
          </div>
        </Link>
        <Link href="/admin-login">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors mt-[144px] ${
              router.pathname == "/billing"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Signout</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
