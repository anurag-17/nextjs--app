import React from 'react';
import Image from "next/image";
import star from '/public/stars.svg'
import UserNavbar from '../userNavbar';



const UserNotificationSetting = () => {
  return (
   <>
   <div className="container mx-auto">
   <div className="">
        <div className="p-4 border bg-white space-y-2  ">
          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-14" src={`/discount.svg`} height={200} width={200}/>
                <div className="ml-3">
                  <p className="font-semibold text-2xl">You have an offer! successfully done</p>
                  <p className="opacity-60">
                 20 minutes ago
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-14" src={`/puzzle.svg`} height={200} width={200} />
                <div className="ml-3">
                  <p className="font-semibold text-2xl">You upload your fast product successfully done</p>
                  <p className="opacity-60">
                  3 hours ago
                  </p>
                </div>
              </div>
              
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-14" height={200} width={200} src={`/emptyfolder1.svg`} />
                <div className="ml-3">
                  <p className="font-semibold text-2xl">Your Account has been created successfully done</p>
                  <p className="opacity-60">
            5 hours ago
                  </p>
                </div>
              </div>
             
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-14" height={200} width={200} src={`/dollar.svg`} />
                <div className="ml-3">
                  <p className="font-semibold text-2xl">Thank you !you made your fast sell $120</p>
                  <p className="opacity-60">6 hours ago
                  </p>
                </div>
              </div>
              
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-14" height={200} width={200} src={`/discount.svg`} />
                <div className="ml-3">
                  <p className="font-semibold text-2xl">You have an offer! successfully done</p>
                  <p className="opacity-60">
                10 hours ago
                  </p>
                </div>
              </div>
             
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-14" height={200} width={200} src={`/hearts.svg`} />
                <div className="ml-3">
                  <p className="font-semibold text-2xl">You swapped exactly</p>
                  <p className="opacity-60">
                  Upload successfully done you can get notification
                  </p>
                </div>
              </div>
              
            </div>
          </div>

          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-14" height={200} width={200} src={star} />
                <div className="ml-3">
                  <p className="font-semibold text-2xl">A new rating has been received</p>
                  <p className="opacity-60">
                2 day ago
                  </p>
                </div>
              </div>
              
            </div>
          </div>
         <div><button className='bg-[#0284C7] text-white p-7 px-8 text-2xl font-semibold rounded mt-14' type='submit'>View all Notifications</button>
        </div>
        </div> 
      </div>
   </div>
   </>
  )
}

export default UserNotificationSetting




