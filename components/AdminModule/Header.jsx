import React from "react";
import { useRouter } from "next/router";

const Header = ({ headTitle, subTitle }) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-between items-center border border-[#f3f3f3] rounded-lg bg-white 2xl:px-10 2xl:py-6 xl:px-7 xl:py-4 lg:px-4 lg:py-2">
      <div className="">
        <h2 className="2xl:text-[30px] xl:text-[18px] lg:text-[14px]  font-semibold 2xl:mb-1">
          {" "}
          {headTitle}
        </h2>
        <p className="2xl:text-[16px] xl:text-[16px] lg:text-[14px] 2xl:pt-1 font-normal">
          {subTitle}
        </p>
      </div>
      <div className="">
        <p
          className="cursor-pointer flex  items-center 2xl:gap-3 2xl:mb-2 2xl:text-[20px] xl:text-[13px] xl:gap-2 xl:mb-1 lg:text-[12px] lg:gap-1 lg:mb-[1px]"
          onClick={handleGoBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="2xl:w-6 2xl:h-6 xl:w-4  xl:h-4 lg:w-3 lg:h-3 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Go Back
        </p>
        <h2 className="2xl:text-[20px] xl:text-[13px] lg:text-[12px] font-normal">
          Welcome Back, Admin
        </h2>
      </div>
    </div>
  );
};

export default Header;
