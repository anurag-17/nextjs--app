import React from "react";

export const headItems = ["s. no.", "product name", "product Id", "color", "Ouantity","price"];


const DetailsDrawer = ({ orderDetails }) => {
    return (
        <>
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
                    {orderDetails?.length > 0 &&
                        orderDetails?.map((items, index) => (
                            <tr key={index} className="" >
                                <td className="p-4 border-b">
                                    <p className="text-gray-800 font-medium"> {index + 1}</p>
                                </td>
                                <td className="p-4 border-b">
                                    <p className="text-gray-800 font-medium hover:text-lightBlue-700 cursor-pointer"
                                        > {items?.product?.title} </p>
                                </td>
                                <td className="p-4 border-b">
                                    <p className="text-gray-800 font-medium"> {items?.product?._id} </p>
                                </td>
                                <td className="p-4 border-b">
                                    <p className="text-gray-800 font-medium"> {items?.color} </p>
                                </td>
                                <td className="p-4 border-b">
                                    <p className="text-gray-800 font-medium"> {items?.count}</p>
                                </td>
                                <td className="p-4 border-b">
                                    <p className="text-gray-800 font-medium"> ₹ {items?.product?.discountedPrice}</p>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
};

export default DetailsDrawer;
