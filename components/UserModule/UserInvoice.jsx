import React from "react";
import UserNavbar from "./userNavbar";

const UserInvoice = () => {
  return (
    <>
      <UserNavbar />
      <div className="px-20">
        <div>
          <p className="text-5xl font-bold">Invoice</p>
          <div className="p-7 bg-white border">
            <div className="flex justify-between">
              <div>
                <p className="text-3xl">Billed To:</p>
                <p className="text-2xl text-gray-500">Johan Smith</p>
                <p className="text-2xl  text-gray-500">Springfield</p>
                <p className="text-2xl  text-gray-500">ATS Field,ST 54321</p>
              </div>
              <div className="text-end">
                <p className="text-3xl">Shipped To:</p>
                <p className="text-2xl text-gray-500">Kenny Rigdon</p>
                <p className="text-2xl text-gray-500">123 Main</p>
                <p className="text-2xl text-gray-500">Ap.4B</p>
                <p className="text-2xl text-gray-500">Springfield,ST 54321</p>
              </div>
            </div>
            <div className="flex justify-between py-9">
              <div className="">
                <p className="text-3xl">Payment Method:</p>
                <p className="text-2xl text-gray-500">Visa ending ***4242</p>
                <p className="text-2xl  text-gray-500">sherahinfo@gmail.com</p>
              </div>
              <div className="text-end">
                <p className="text-3xl">Order Date:</p>
                <p className="text-2xl text-gray-500">November 02,2022</p>
              </div>
            </div>

            <div className="text-2xl">
  <table className="table-fixed w-full border border-gray-500 ">
    <thead className="text-center">
      <tr>
        <th className=" ">No</th>
        <th>Product name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total Amout</th>
      </tr>
    </thead>
    <tbody className="border">
      <tr className="text-center ">
        <td>01</td>
        <td>Sweter For Women<br/>Dress<br/>Color:Black</td>
        <td>$612</td>
        <td>01</td>
      </tr>
      <tr className="text-center ">
      <td>02</td>
        <td>Sweter For Women<br/>Dress<br/>Color:Black</td>
        <td>$120</td>
        <td>01</td>
      </tr>
      <tr className="text-center ">
      <td>03</td>
        <td>Convert for man shoe<br/>color:Black & Orange</td>
        <td>$450</td>
        <td>01</td>
      </tr>
      
    </tbody>
  </table>
</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserInvoice;
