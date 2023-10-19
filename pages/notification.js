import React from "react";
import Telegram from "../public/telegram.png";
import Image from "next/image";

const notification = () => {
  return (
    <>
      <div className="">
        <div className="p-4 border bg-white space-y-2">
          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-16" src={Telegram} />
                <div className="ml-3">
                  <p className="font-semibold text-lg">Send Inactive for 7 days</p>
                  <p className="opacity-60">
                    Unlocable content,only revealed by the owner of the item.
                  </p>
                </div>
              </div>
              <div>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    //   checked
                  />
                   <div class="w-11 h-6 bg-green-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-16" src={Telegram} />
                <div className="ml-3">
                  <p className="font-semibold text-lg">New Contributions</p>
                  <p className="opacity-60">
                  Evey new prodcuts upload seccessfullly doen you can get notifcation
                  </p>
                </div>
              </div>
              <div>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    //   checked
                  />
                  <div class="w-11 h-6 bg-green-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-16" src={Telegram} />
                <div className="ml-3">
                  <p className="font-semibold text-lg">Empty Buffer</p>
                  <p className="opacity-60">
                  Every new products sell you can get notification
                  </p>
                </div>
              </div>
              <div>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    //   checked
                  />
                 <div class="w-11 h-6 bg-green-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-16" src={Telegram} />
                <div className="ml-3">
                  <p className="font-semibold text-lg">Your Ethereum Balance</p>
                  <p className="opacity-60">Evey new follower you can get notifcation
                  </p>
                </div>
              </div>
              <div>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    //   checked
                  />
                  <div class="w-11 h-6 bg-green-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-16" src={Telegram} />
                <div className="ml-3">
                  <p className="font-semibold text-lg">New Offer</p>
                  <p className="opacity-60">
                  Every new products sell you can get notification
                  </p>
                </div>
              </div>
              <div>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    //   checked
                  />
                   <div class="w-11 h-6 bg-green-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-16" src={Telegram} />
                <div className="ml-3">
                  <p className="font-semibold text-lg">You swapped exactly</p>
                  <p className="opacity-60">
                  Upload successfully done you can get notification
                  </p>
                </div>
              </div>
              <div>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    //   checked
                  />
                  <div class="w-11 h-6 bg-green-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-16" src={Telegram} />
                <div className="ml-3">
                  <p className="font-semibold text-lg">A new rating has been received</p>
                  <p className="opacity-60">
                  Every new products sell you can get notification
                  </p>
                </div>
              </div>
              <div>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    //   checked
                  />
                  <div class="w-11 h-6 bg-green-600 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default notification;
