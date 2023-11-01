import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { data } from '../data/data.js';

const orders = () => {
  return (
    <div className='bg-gray-100 min-h-screen  '>
      <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
        <h2 className="text-2xl font-semibold pb-4">Orders List </h2>
        <div className="mb-3 w-[40%]">
        <input
              type="search"
              className=" border border-gray-500  p-3 rounded-xl focus:border-none w-11/12 "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
        </div>

        <h2>Welcome Back, Client</h2>
      </div>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span>Order</span>
            <span className='sm:text-left text-right'>Status</span>
            <span className='hidden md:grid'>Last Order</span>
            <span className='hidden sm:grid'>Method</span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li
                key={id}
                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'
              >
                <div className='flex'>
                  <div className='bg-purple-100 p-3 rounded-lg'>
                    <FaShoppingBag className='text-sky-500' />
                  </div>
                  <div className='pl-4'>
                    <p className='text-gray-800 font-bold'>
                    ₹{order.total.toLocaleString()}
                    </p>
                    <p className='text-gray-800 text-sm'>{order.name.first}</p>
                  </div>
                </div>
                <p className='text-gray-600 sm:text-left text-right'>
                  <span
                    className={
                      order.status == 'Processing'
                        ? 'bg-green-200 p-2 rounded-lg'
                        : order.status == 'Completed'
                        ? 'bg-blue-200 p-2 rounded-lg'
                        : 'bg-yellow-200 p-2 rounded-lg'
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <p className='hidden md:flex'>{order.date}</p>
                <div className='sm:flex hidden justify-between items-center'>
                  <p>{order.method}</p>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default orders;
