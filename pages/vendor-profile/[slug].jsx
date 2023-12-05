import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import AboutVendor from "./about-vendor";
// import ActiveProduct from "./active-product";
// import HiddenProduct from "./hidden-product";
import axios from "axios";

const VendorProfile = ({ showNav }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [labelId, setLabelId] = useState(1);
  const [show, setShow] = useState("Dashboard");
  const router = useRouter();
  const { slug } = router;
  const [getVendor, setGetVendor] = useState({});
  console.log("ventDetail", getVendor);

  const handleClick = (label, id) => {
    setShow(label);
    setLabelId(id);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const menuList = [
    {
      id: 1,
      label: "About",
      //   component: <AboutVendor/>,
      icon: "fa fa-users",
      imagePath: "/profilephoto.svg",
      path: "/about-vendor",
    },
    {
      id: 2,
      label: "Product",
      //   component: <ActiveProduct/>,
      icon: "fa fa-users",
      imagePath: "/paymntmethod.svg",
      path: "/active-product",
    },
    {
      id: 3,
      label: "Hidden",
      //   component: <HiddenProduct/>,
      icon: "fa fa-phone-square",
      imagePath: "/bell.svg",
      path: "/hidden-product",
    },
    {
      id: 4,
      label: "Edit Profile",
      //   component: <UpdateVendor/>,
      icon: "fa fa-phone-square",
      imagePath: "/loginn.svg",
      path: "/update-vendor",
    },
  ];

  // useEffect(() => {
  //   getaVendor();
  // }, []);

  const getaVendor = async () => {
    try {
      const response = await axios.post(
        `https://e-commerce-backend-brown.vercel.app/api/vendor/getaVendor/${slug}`,
        options
      );
      console.log(response.result);
      setGetVendor(response.result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-4 my-4 px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">
          <h1 className="text-[30px] ml-4  ">
            {selectedMenuItem
              ? `Vendor/${selectedMenuItem.label}`
              : "Vendor/Profile"}
          </h1>
        </h2>
        <h2>Welcome Back, Client</h2>
      </div>

      <div className=" bg-white p-5 ">
        <img
          src="/profile.png"
          className="w-36 border-[5px] rounded-full border-white absolute mt-56 ml-5 z-50"
        />
        <img src="/profile-cover.jpg" className="w-full relative" />

        <div>
          <div>{getVendor?.vendorName}</div>
          <div className="flex justify-end mt-5">
            <div className="mx-5">
              <p>Followers {getVendor?.vendorName}</p>
              <p className="text-[35px] font-semibold">4532</p>
            </div>
            <div className="mx-5">
              <p>Following</p>
              <p className="text-[35px] font-semibold">532</p>
            </div>
          </div>
        </div>

        <div className="   flex mt-12">
          {/* Sidebar content */}
          {menuList.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${
                item === selectedMenuItem ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick(item)}
            >
              {/* <img className="w-6 absolute mt-5 ml-2" src={item.imagePath} /> */}

              <li className="list-none cursor-pointer border px-10 py-3 m-4 ml-0 rounded-md hover:border-lightBlue-600 hover:bg-lightBlue-100 hover:text-lightBlue-500  text-gray-500">
                {" "}
                {item.label}
              </li>
            </div>
          ))}
        </div>

        <div className="w-full">
          {selectedMenuItem ? (
            // Render the selected component here
            selectedMenuItem.component
          ) : (
            // Render a default component or welcome message
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(VendorProfile), { ssr: false });
