import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AdminCustomerOrder = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (slug) {
      defaultCustomer();
    }
  }, [slug]);

  const defaultCustomer = () => {
    const options = {
      method: "GET",
      url: `https://e-commerce-backend-brown.vercel.app/api/auth/all-users`,
    };

    axios
      .request(options)
      .then((response) => {
        const user = response.data.find((user) => user._id === slug);
        if (user) {
          setFilteredOrders(user.orders);
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center pt-4  px-10 border border-[#f3f3f3] rounded-lg bg-white h-[100px] ">
          <h2 className="text-2xl font-semibold pb-4">Customer Orders</h2>
          <div className="mb-3 w-[40%]">
            <input
              type="search"
              className=" border border-gray-500  p-3 rounded-xl focus:border-none w-11/12 "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
          </div>

          <h2>Welcome Back, Admin</h2>
        </div>

        <table className="border-collapse  bg-white mt-5" >
          <thead>
            <tr className="bg-coolGray-200 text-left  text-gray-400 ">
              <th className="w-64 py-4">Order ID</th>       
              <th className="w-64">Product</th>
              <th className="w-64">Order Status</th>
              <th className="w-40">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className=" border-coolGray-300">
                  <td className="py-4 px-1">{order._id}</td>
                  <td className="py-2 px-1">{order.product}</td>
                  <td className="py-2 px-1">{order.orderStatus}</td>
                  <td className="py-2 px-1">{order.paymentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-5 text-center">
                  No orders found for this user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminCustomerOrder;
