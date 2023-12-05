import React from "react";
import UserNavbar from "./userNavbar";
import printer from '../../public/printers.svg';
import Image from "next/image";

const UserInvoice = () => {
  return (
    <>
      <UserNavbar />
      <div className="px-20">
        <div>
          <p className="text-5xl font-bold py-6">Invoice</p>
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
              <table className="table-fixed w-full border  ">
                <thead className="text-center bg-[#F3F4F6]">
                  <tr>
                    <th className="p-6">No</th>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Amout</th>
                  </tr>
                </thead>
                <tbody className="border ">
                  <tr className="text-center  border-b">
                    <td>01</td>
                    <td className="py-4">
                      Sweter For Women
                      <br />
                      Dress
                      <br />
                      Color:Black
                    </td>
                    <td>$612</td>
                    <td>01</td>
                    <td>$612</td>
                  </tr>
                  <tr className="text-center  border-b">
                    <td>02</td>
                    <td className="py-4">
                      Sweter For Women
                      <br />
                      Dress
                      <br />
                      Color:Black
                    </td>
                    <td>$120</td>
                    <td>01</td>
                    <td>$120</td>
                  </tr>
                  <tr className="text-center border-b">
                    <td>03</td>
                    <td className="py-4">
                      Convert for man shoe
                      <br />
                      color:Black & Orange
                    </td>
                    <td>$450</td>
                    <td>01</td>
                    <td>$450</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-2xl my-4">
              <table className="table-fixed  border ">
                <thead className="text-center bg-[#F3F4F6]">
                  <tr>
                    <th className=" ">Subtotal</th>
                    <th className="p-6">Amount</th>
                  </tr>
                </thead>
                <tbody className="border ">
                  <tr className="text-center  border-b">
                    <td className="p-4">Store Credit</td>
                    <td>$440</td>
                  </tr>
                  <tr className="text-center  border-b">
                    <td className="p-4">Delivery Charges</td>
                    <td>$120</td>
                  </tr>
                  <tr className="text-center  border-b">
                    <td className="p-4">Shipping</td>
                    <td>$20</td>
                  </tr>
                  <tr className="text-center  border-b">
                    <td className="p-4">Vat Tax</td>
                    <td>$2</td>
                  </tr>
                  <tr className="text-center  border-b">
                    <td className="p-4 font-bold">Total</td>
                    <td className="font-bold">$500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <br />
            <p className="text-3xl font-bold">Notes:</p>
            <p className="text-gray-700 py-4 text-xl">
              All accounts are to be paid within 7 days from receipt of invoice.
              To be paid by cheque or credit card or direct payment online. If
              account is not paid within 7 days
              <br />
              the credits details supplied as confirmation of work undertaken
              will be charged the agreed quoted fee noted above.
            </p>
            <div className="flex justify-end">
              <div className="flex">
                <button className="p-3 flex m-3 items-center px-12 font-semibold rounded bg-lightBlue-400 text-white text-2xl">
                <Image className="w-10 m-2" src={printer}/>
                 Print
                </button>
              </div>
              <div>
                <button className="p-6 px-12 font-semibold rounded bg-lightBlue-400 text-white text-2xl m-3">
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInvoice;
