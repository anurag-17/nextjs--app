import React, { useEffect, useState } from "react";
import Image from "next/image";
import dollar from '../public/dollarsign.svg'
import yen from '../public/yen.svg';
import pound from '../public/pound.svg';
import rupee from '../public/rupee.svg';
import axios from "axios";

const currency=[
    {
        id:1,
        currencyName:"Rupee",
        currencyImage:rupee,
    },
    {
        id:2,
        currencyName:"Dollar",
        currencyImage:dollar,
    },
    {
        id:3,
        currencyName:"Yen",
        currencyImage:yen,
    },
    {
        id:4,
        currencyName:"Pound",
        currencyImage:pound,
    },
]

const Currency = () => {
    const [getCurrency,setGetCurrency]=useState([]);

     const options={
        method:"GET",
        url:"http://e-commerce-backend-brown.vercel.app/api/currency/getAllCurrencies"
     };
     useEffect(()=>{
        defaultCurrency();
     },[]);
     const defaultCurrency = () => {
        axios
          .request(options) 
          .then((response) => {
            setGetCurrency(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

  return (
    <>
      <div>
        <h2 className="text-[25px] font-semibold text-green-600 leading-[25px] px-6 py-6">
          Currency
        </h2>
        <div className="border-b border-green-600   w-[160px]"></div>
        <div>
        <div className="relative overflow-x-auto w-3/5">
    <table className="w-full text-sm text-left  dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-[#E5E7EB] dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    <input
                    type="checkbox"
                    classNameName=""/>
                </th>
                <th scope="col" className="px- py-3">
                    Currency
                </th>
                <th scope="col" className="px- py-3">
                    Currency Sign
                </th>
                
            </tr>
        </thead>
        {
            getCurrency.map((item)=>(
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
               <td className="px-6 py-3">
                <input type="checkbox"
                classNameName=""/>
               </td>
                <td className="px- py-4">
                 {item?.currencyName}
                </td>
                <td className="">
                  {item?.currencySign}
                </td>
                
            </tr>
         
        </tbody>
        ))
        }
    </table>
</div>
        </div>
      </div>
    </>
  );
};

export default Currency;
