import React from "react";
import Bank from "../public/bank.jpg";
import Image from "next/image";
import Visa from '../public/visa.png';
import Visa1 from '../public/visa1.png';
import Paypal from '../public/paypal.png';

const payment = () => {
  return (
    <>
      <div>
        <div className="bg-white p-5 border">
          <div className="flex flex-row justify-end">
            <div>
              <button className="bg-sky-600 m-4 text-white px-6 py-4 rounded font-medium text-lg">
                Add New Bank
              </button>
              <button className="bg-green-600 text-white px-6 py-4 rounded font-medium text-lg">
                Add New Card
              </button>
            </div>
          </div>
          <p className="font-medium text-lg">Add a payment method</p>
          <div className="my-7">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image className="w-24" src={Bank} />
                <div className="space-y-2 ml-4">
                  <p className="font-medium text-lg opacity-70 ">
                    Bank of America
                  </p>
                  <p className="opacity-70 text-lg ">Bank ************ 5421</p>
                  <p className="text-green-600">Verified</p>
                </div>
              </div>
              <div>
                <button className="bg-yellow-400  px-5 py-3 rounded font-medium text-lg">
                  Manage
                </button>
              </div>
            </div>
          </div>
          <hr/>

          <div className="my-7">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image className="w-24" src={Visa1} />
                <div className="space-y-2 ml-4">
                  <p className="font-medium text-lg opacity-70 ">
                    Bank of America
                  </p>
                  <p className="opacity-70 text-lg ">Bank ************ 3497</p>
                  <p className="text-green-600">Verified</p>
                </div>
              </div>
              <div>
                <button className="bg-yellow-400  px-5 py-3 rounded font-medium text-lg">
                  Manage
                </button>
              </div>
            </div>
          </div>
          <hr/>

          <div className="my-7">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image className="w-24" src={Paypal} />
                <div className="space-y-2 ml-4">
                  <p className="font-medium text-lg opacity-70 ">
                    Bank of America
                  </p>
                  <p className="opacity-70 text-lg ">Bank ************ 8945</p>
                  <p className="text-green-600">Verified</p>
                </div>
              </div>
              <div>
                <button className="bg-yellow-400  px-5 py-3 rounded font-medium text-lg">
                  Manage
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default payment;
