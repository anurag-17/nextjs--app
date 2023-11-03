import React from "react";
import Image from "next/image";
import dollar from '../public/dollarsign.svg'
import yen from '../public/yen.svg';
import pound from '../public/pound.svg';
const Currency = () => {
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
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
               <td className="px-6 py-3">
                <input type="checkbox"
                classNameName=""/>
               </td>
                <td className="px- py-4">
                 Dollar   
                </td>
                <td className="">
                    <Image className="w-10" src={dollar}/>
                </td>
                
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-3">
                <input type="checkbox"
                classNameName=""/>
               </td>
                <td className="px- py-4">
                    Yen
                </td>
                <td className="">
                <Image className="w-10" src={yen}/>
                </td>
                
            </tr>
            <tr className="bg-white dark:bg-gray-800">
            <td className="px-6 py-3">
                <input type="checkbox"
                classNameName=""/>
               </td>
                <td className="px- py-4">
                    Pound
                </td>
                <td className="">
                   <Image className="w-10" src={pound}/>
                </td>
                
            </tr>
        </tbody>
    </table>
</div>
        </div>
      </div>
    </>
  );
};

export default Currency;
