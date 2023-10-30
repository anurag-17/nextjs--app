import React from 'react'
import UserNavbar from './userNavbar'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";




const UserFAQ = () => {
  return (
    <>
    <UserNavbar/>
    <div className='px-20'>
    <h1 className='text-[35px] my-5'>Help and Customer Service</h1>
        <div>
        <h1 className='text-[25px]'>Find more solutions</h1>
        <MagnifyingGlassIcon className="h-6 w-6 font-medium absolute z-10 mt-3 ml-4    "  />
            <input  type='text' className='p-3 border mb-5 w-6/12 relative'/>
        </div>
        <div className='w-6/12 py-5'>
            <h1 className='text-[35px]'>FAQs on using Rs. 2,000 notes for Cash on Delivery (COD) Payments and Cashloads</h1>

            <p className='text-[18px] my-5'>Frequently asked questions on using Rs. 2,000 notes for Cash on Delivery (COD) payments and cashloads. Refer to the following links to view the below content in English, or हिन्दी (Hindi).</p>
        
           <h1 className='text-[35px]'>Do you have gift packaging options?</h1>
          <p>People love buying gifts online, and especially if they can ship them straight to the recipient. Therefore, they’ll often want an option where the invoice is left out of the box or pricing is excluded. Perhaps they’re shipping it to themselves but want a gift receipt for the person getting it. You might even want to consider offering special packaging for gift purchases, but only if it’s within your means. </p>

          <h1 className='text-[35px]'>What if my order arrives damaged?</h1>
          <p className='text-[18px] my-5'>Another common concern that people have when shopping online is dealing with damaged goods upon arrival. If you take the time to explain that you will happily (and quickly) replace anything that arrives damaged or otherwise defective, you’ll not only be proving your value to people, but you’ll be addressing one of their most pressing concerns when it comes to online shopping. </p>

          <h1 className='text-[35px]'>Product info Q&A</h1>
          <p className='text-[18px] my-5'>This one we’re leaving more open-ended because it will be, depending on what products you’re selling specifically. This is a good place to answer the most common questions you get about the products that you sell. Perhaps you sell clothes and people have questions about sizing or materials. Maybe you sell snacks and people want to know about nutrition facts or gluten-free options. These are all worthy of their own Q&A on your website. If you’ve got enough product questions, give this a dedicated section, too. </p>
        </div>
    </div>
    </>
  )
}

export default UserFAQ
