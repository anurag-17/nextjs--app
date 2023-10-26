import React from 'react'
import UserNavbar from './userNavbar'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";




const UserFAQ = () => {
  return (
    <>
    <UserNavbar/>
    <div>
    <h1 className='text-[35px] my-5'>Help and Customer Service</h1>
        <div>
        <h1 className='text-[25px]'>Find more solutions</h1>
        <MagnifyingGlassIcon className="h-6 w-6 font-medium absolute z-10 mt-3 ml-4    "  />
            <input  type='text' className='p-3 border mb-5 w-6/12 relative'/>
        </div>
        <div className='w-6/12 py-5'>
            <h1 className='text-[35px]'>FAQs on using Rs. 2,000 notes for Cash on Delivery (COD) Payments and Cashloads</h1>

            <p className='text-[18px] my-5'>Frequently asked questions on using Rs. 2,000 notes for Cash on Delivery (COD) payments and cashloads. Refer to the following links to view the below content in English, or हिन्दी (Hindi).</p>
        </div>
    </div>
    </>
  )
}

export default UserFAQ
