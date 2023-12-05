import Link from "next/link";
import React from "react";

const ConnectSocial = () => {
  return (
    <>
      <div className=" bg-white ml-5">
        <div className="">
          <div className="bg-white  p-5">
            <h1 className="text-[25px] m-10 mt-0">Social Account</h1>

            <div className="mt-10 flex justify-around  grid-cols-2">
              
                {" "}
                <div className=" w-5/12">
                  <div className="mb-3">
                    <label className="absolute mt-4 ml-8 z-20 text-[18px] text-gray-500 bg-white">
                      Facebook *
                    </label>
                 <Link href="https://www.facebook.com/login/">
                 <img src="/facebook-176-svgrepo-com.svg" className="w-5 absolute mt-12 ml-[22%] z-20"/>
                 </Link>
                    <input
                      type="password "
                      className="border p-5 relative rounded-lg my-7 w-full "
                    placeholder="Facebook profile link"

                    />
                  </div>
                  <div className=" mb-3 ">
                    <label className="absolute mt-4 ml-8 z-20 text-[18px] text-gray-500 bg-white">
                      Twitter *
                    </label>
                    <Link href="https://twitter.com/">
                    <img src="/tw.svg" className="w-5 absolute mt-12 ml-[22%] z-20"/>
                    </Link>
                    <input
                      type="password "
                      className="border p-5 relative rounded-lg my-7 w-full"
                      placeholder="Twitter profile link"
                    />
                  </div>
                  <div className=" mb-3 ">
                    <label className="absolute mt-4 ml-8 z-20 text-[18px] text-gray-500 bg-white">
                      Google Plus *
                    </label>
                    <Link href="https://accounts.google.com/v3/signin">
                    <img src="/google-plus-circle-svgrepo-com.svg" className="w-8 absolute mt-11 ml-[21.5%] z-20"/>
                    </Link>
                    <input
                      type="password "
                      className="border p-5 relative rounded-lg my-7 w-full"
                      placeholder="Google Plus profile link"
                    />
                  </div>
                </div>

                <div className=" w-5/12">
                  <div className=" mb-3 ">
                    <label className="absolute mt-4 ml-8 z-20 text-[18px] text-gray-500 bg-white">
                      Linkedin *
                    </label>
                    <Link href="https://www.linkedin.com/home">
                    <img src="/linkedin-161-svgrepo-com.svg" className="w-5 absolute mt-12 ml-[22%] z-20"/>
                    </Link>
                    <input
                      type="password "
                      className="border p-5 relative rounded-lg my-7 w-full"
                      placeholder="Linkedin profile link"
                    />
                  </div>
                  <div className=" mb-3 ">
                    <label className="absolute mt-4 ml-8 z-20 text-[18px] text-gray-500 bg-white">
                      Instagram *
                    </label>
                    <Link href="https://www.instagram.com/accounts/login/">
                    <img src="/instagram-167-svgrepo-com.svg" className="w-5 absolute mt-12 ml-[22%] z-20"/>
                    </Link>
                    <input
                      type="password "
                      className="border p-5 relative rounded-lg my-7 w-full"
                      placeholder="Instagram profile link"
                    />
                  </div>

                  <div className=" mb-3 ">
                    <label className="absolute mt-4 ml-8 z-20 text-[18px] text-gray-500 bg-white">
                      Pinterest *
                    </label>
                    <Link href="https://in.pinterest.com/login/">
                    <img src="/pinterest-svgrepo-com.svg" className="w-5 absolute mt-12 ml-[22%] z-20"/>
                    </Link>
                    <input
                      type="password "
                      className="border p-5 relative rounded-lg my-7 w-full"
                      placeholder="Pinterest profile link"
                    />
                  </div>
                </div>
             
            </div>
            <button
              type="submit"
              className="mx-12 border py-2 px-5 bg-lightBlue-600 text-white rounded-lg text-[22px]"
            >
              Save Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectSocial;
