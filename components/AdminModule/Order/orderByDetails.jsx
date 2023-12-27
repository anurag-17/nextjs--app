import React from "react";

export const headItems = [
  "s. no.",
  "firstname",
  "lastname",
  "number",
  "email",
  "address",
];

const OrderByDetails = ({ orderDetails }) => {
  return (
    <>
      <div className="bg-white rounded py-2 px-4 text-[22px] font-medium mb-3">
        Order By :
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {headItems?.map((headerItem, inx) => (
              <th className="p-4 border-b capitalize text-left" key={inx}>
                {headerItem}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="p-4 border-b">
              <p className="text-gray-800 font-medium"> 1. </p>
            </td>
            <td className="p-4 border-b">
              <p className="text-gray-800 font-medium hover:text-lightBlue-700 cursor-pointer">
                {" "}
                {orderDetails?.firstname}{" "}
              </p>
            </td>
            <td className="p-4 border-b">
              <p className="text-gray-800 font-medium">
                {" "}
                {orderDetails?.lastname}{" "}
              </p>
            </td>
            <td className="p-4 border-b">
              <p className="text-gray-800 font-medium">
                {" "}
                {orderDetails?.mobile}{" "}
              </p>
            </td>
            <td className="p-4 border-b">
              <p className="text-gray-800 font-medium">
                {" "}
                {orderDetails?.email}{" "}
              </p>
            </td>
            <td className="p-4 border-b">
              <p className="text-gray-800 font-medium">
                {" "}
                {orderDetails?.address}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderByDetails;
