import React from 'react'
import UserNavbar from './userNavbar'

const UserInvoice = () => {
  return (
   <>
   <UserNavbar/>
    <div className='px-20'>
    <div>
        <p className='text-5xl font-bold'>Invoice</p>
        <div className='p-4 bg-white border'>
        <div className='flex justify-between'> 
           <div>
            <p className='text-3xl'>Billed To:</p>
            <p className='text-2xl text-gray-500'>Johan Smith</p>
            <p className='text-2xl  text-gray-500'>Springfield</p>
            <p className='text-2xl  text-gray-500'>ST 54321</p>
            </div>
            <div>
            <p className='text-3xl'>Shipped To:</p>
            <p className='text-2xl text-gray-500'>Kenny Rigdon</p>
            <p className='text-2xl text-gray-500'>123 Main</p>
            <p className='text-2xl text-gray-500'>Ap.4B</p>
            <p className='text-2xl text-gray-500'>Springfield,ST 54321</p>
            </div>
        </div>
        </div>
    </div>
    </div>
   </>
  )
}

export default UserInvoice