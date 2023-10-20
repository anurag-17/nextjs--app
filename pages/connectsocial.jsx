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
                  <img src="/facebook-176-svgrepo-com.svg" className="w-5 absolute mt-12 ml-[23%] z-20"/>
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
                    <img src="/twitter-154-svgrepo-com.svg" className="w-5 absolute mt-12 ml-[23%] z-20"/>
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
                    <img src="/google-plus-circle-svgrepo-com.svg" className="w-8 absolute mt-11 ml-[22.5%] z-20"/>
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
                    <img src="/linkedin-161-svgrepo-com.svg" className="w-5 absolute mt-12 ml-[23%] z-20"/>
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
                    <img src="/instagram-167-svgrepo-com.svg" className="w-5 absolute mt-12 ml-[23%] z-20"/>
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
                    <img src="/pinterest-svgrepo-com.svg" className="w-5 absolute mt-12 ml-[23%] z-20"/>
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
              className="mx-12 border py-2 px-5 bg-sky-600 text-white rounded-lg text-[22px]"
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
