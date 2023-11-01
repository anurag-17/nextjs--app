import React from 'react';
import Image from "next/image";
import telegram from '/public/telegram.svg';
import puzzle from '/public/puzzle.svg';
import folders from '/public/empty folder.svg';
import etherum from '/public/etherum.svg';
import discount from '/public/discount.svg';
import heart from '/public/hearts.svg';
import star from '/public/stars.svg'
import UserNavbar from './userNavbar';
import discount2 from '../../public/discount2.svg';
import empty from '../../public/emptyfolder1.svg';
import dollar from '../../public/dollar.svg';

const UserNotificationSetting = () => {
  return (
   <>
   <UserNavbar/>
    <div className="ml-5">
        <div className="p-4 border bg-white space-y-2 w-[50%] ">
          <div className="border p-4 rounded-md ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image className="w-14" src={discount2}/>
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
                <Image className="w-14" src={puzzle} />
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
                <Image className="w-14" src={empty} />
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
                <Image className="w-14" src={dollar} />
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
                <Image className="w-14" src={discount} />
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
                <Image className="w-14" src={heart} />
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
                <Image className="w-14" src={star} />
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
   </>
  )
}

export default UserNotificationSetting




