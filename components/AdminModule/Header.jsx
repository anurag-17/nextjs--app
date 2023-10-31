import React from "react";
import { useRouter } from "next/router";

const Header = ({ headTitle, subTitle }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-between items-center px-10 border  border-[#f3f3f3] rounded-lg bg-white  py-6">
    <div className="">
    <h2 className="xl:text-2xl text-lg font-semibold mb-1"> {headTitle}</h2>
      <p className="xl:text-[18px] lg:text-[16px] pt-1 font-normal">
        {subTitle}
      </p>
    </div>
      <div className="">
        <p
          className="cursor-pointer flex gap-3 items-center mb-2"
          onClick={handleGoBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Go Back
        </p>
        <h2 className="xl:text-[18px] lg:text-[16px] font-normal">
          Welcome Back, Admin
        </h2>
      </div>
    </div>
  );
};

export default Header;
