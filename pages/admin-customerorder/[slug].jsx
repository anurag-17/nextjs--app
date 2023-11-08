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
        <h1>Filtered Orders:</h1>
        {filteredOrders.length > 0 ? (
          <ul>
            {filteredOrders.map((order) => (
              <li key={order._id}>
                <strong>Order ID:</strong> {order._id} <br />
                <strong>Product:</strong> {order.product} <br />
                <strong>Order Status:</strong> {order.orderStatus} <br />
                <strong>Payment Status:</strong> {order.paymentStatus} <br />
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found for this user.</p>
        )}
      </div>
    </>
  );
};

export default AdminCustomerOrder;
