import React from "react";
import UserNavbar from "./userNavbar";
import Image from "next/image";
import dress1 from "../../public/dress1.svg";
import dress2 from "../../public/dress2.svg";
import dress3 from "../../public/dress3.svg";
import man1 from "../../public/man1.svg";
import phone from "../../public/ph.svg";

const UserOrderDetail = () => {
  return (
    <>
      <UserNavbar />
      <div className="px-20">
        <p className="text-5xl font-bold py-6">Order List</p>
        <div className="border bg-white p-8 rounded-md">
          <div className="bg-[#F3F4F6] p-8 rounded-md">
            <div className="flex justify-between">
              <div className="font-semibold text-3xl">
                <p>Items from Order</p>
                <p>#BD22548</p>
              </div>
              <div className="text-gray-500 text-2xl font-medium ">
                October 7, 2020 at 9:08 pm / 3 items / Total $10254.00
              </div>
              <div>
                <button className="p-4 px-6 font-medium rounded text-xl bg-sky-400 text-white">
                  Paid
                </button>
                <button className="p-4 px-6 font-medium rounded text-xl bg-sky-400 mx-2 text-white">
                  Partially Fullfilled
                </button>
              </div>
            </div>
          </div>

          <div className="flex mt-14 gap-7">
            <div>
              <div className="text-2xl  ">
                <table className="table-fixed w-full border  ">
                  <thead className="text-center bg-[#F3F4F6]">
                    <tr>
                      <th className="py-9 ">Product</th>
                      <th>Product name</th>
                      <th>Price</th>
                      <th>Total Amout</th>
                    </tr>
                  </thead>
                  <tbody className="border ">
                    <tr className="text-center  border-b">
                      <td className="flex justify-center mt-7">
                        <Image src={dress1} />
                      </td>
                      <td className="py-4">
                        Sweter For Women
                        <br />
                        Dress
                        <br />
                        Color:Black
                      </td>
                      <td>$612</td>
                      <td>$612</td>
                    </tr>
                    <tr className="text-center  border-b">
                      <td className="flex justify-center mt-7">
                        <Image src={dress2} />
                      </td>
                      <td className="py-4">
                        Sweter For Women
                        <br />
                        Dress
                        <br />
                        Color:Black
                      </td>
                      <td>$120</td>
                      <td>$120</td>
                    </tr>
                    <tr className="text-center border-b">
                      <td className="flex justify-center mt-6">
                        <Image src={dress3} />
                      </td>
                      <td className="py-4">
                        Convert for man shoe
                        <br />
                        color:Black & Orange
                      </td>
                      <td>$450</td>
                      <td>$450</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-2xl my-4">
                <table className="table-fixed  border  ">
                  <thead className="text-center bg-[#F3F4F6]">
                    <tr>
                      <th className=" py-9">Subtotal</th>
                      <th className="p-9">Amount</th>
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
            </div>

            <div className="">
              <div className="text-2xl">
                <table className="table-fixed w-full border  ">
                  <thead className="text-center bg-[#F3F4F6] ">
                    <tr className="">
                      <th className="py-9">Transactions</th>
                      <th>Date</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="border ">
                    <tr className="text-center  border-b">
                      <td>Payment(Paypal)</td>
                      <td className="py-9">October 7, 2022</td>
                      <td>$2,255.00</td>
                    </tr>
                    <tr className="text-center  border-b">
                      <td>Payment (from Account Balance)</td>
                      <td className="py-9">July 25, 2022</td>
                      <td>$$4,866.00</td>
                    </tr>
                    <tr className="text-center border-b">
                      <td>Refund(visa)</td>
                      <td className="py-9">January 14, 2022</td>
                      <td>$$-2,133.00 </td>
                    </tr>
                    <tr className="text-center border-b">
                      <td className="">Payment(visa)</td>
                      <td className="py-9">December 14, 2022</td>
                      <td>$11133.00 </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-2xl mt-4 flex justify-end">
                <table className="table-fixed  border  ">
                  <thead className="text-center bg-[#F3F4F6]">
                    <tr>
                      <th className="p-9 ">Balance</th>
                      <th className="p-9">Total Amount</th>
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
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-14 my-10">
          <div className="border  ">
            <p className="font-bold p-5 text-2xl bg-gray-400">
              {" "}
              Custome Contact
            </p>
            <div className=" rounded-lg bg-white  p-8 pb-16 ">
              <div className="flex">
                {/* vender profile image */}
                <div className="w-36 mt-14 ">
                  <img
                    src="/profile.png"
                    className="w-20  border-[5px] border-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-[28px] font-medium"></h1>
                  <div className="flex my-5">
                    <img src="/ph.svg" className="mr-3  w-5" />
                    <h2 className="text-gray-500 text-[20px] font-medium">
                      <a href="tel:8349335812">8349335812</a>
                    </h2>
                  </div>
                  <div className="flex my-5">
                    <img src="/mail.svg" className="mr-3  w-5" />
                    <h2 className="text-gray-500 text-[20px] font-medium">
                      <a href="mailto:hariompatil9@gmail.com">
                        hariompatil9@gmail.com
                      </a>
                    </h2>
                  </div>
                  <div className="flex my-5">
                    <img src="/skype.svg" className="mr-3  w-6" />
                    <h2 className="text-gray-500 text-[20px] font-medium">
                      <a href="tel:0731-22552255">John(skype)</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border ">
            <p className="font-bold p-5 text-2xl bg-gray-400">
              Shipping Address
            </p>
            <div className=" rounded-lg bg-white  p-8 ">
              <div className="flex">
                {/* vender profile image */}
                <div className="w-36 mt-14 ">
                  <img
                    src="/profile.png"
                    className="w-20  border-[5px] border-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-[28px] font-medium"></h1>
                  <div className="flex my-5">
                    <img src="/ph.svg" className="mr-3  w-5" />
                    <h2 className="text-gray-500 text-[20px] font-medium">
                      <a href="tel:8349335812">8349335812</a>
                    </h2>
                  </div>
                  <div className="flex my-5">
                    <img src="/mail.svg" className="mr-3  w-5" />
                    <h2 className="text-gray-500 text-[20px] font-medium">
                      <a href="mailto:hariompatil9@gmail.com">
                        hariompatil9@gmail.com
                      </a>
                    </h2>
                  </div>
                  <div className="flex my-5">
                    <img src="/location.svg" className="mr-3  w-6" />
                    <h2 className="text-gray-500 text-[20px] font-medium">
                      <a href="tel:0731-22552255">374 William S Canning Blvd, Fall River MA 2721, USA</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border ">
            <p className="font-bold p-5 text-2xl bg-gray-400">
              {" "}
              Billing Address
            </p>
            <div className=" rounded-lg bg-white  p-8 ">
              <div className="flex">
                {/* vender profile image */}
                <div className="w-36 mt-14 ">
                  <img
                    src="/profile.png"
                    className="w-20  border-[5px]  border-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-[28px] font-medium"></h1>
                  <div className="flex my-5">
                    <img src="/ph.svg" className="mr-3  w-5" />
                    <h2 className="text-gray-500 text-[20px] font-medium">
                      <a href="tel:8349335812">8349335812</a>
                    </h2>
                  </div>
                  <div className="flex my-5">
                    <img src="/mail.svg" className="mr-3  w-5" />
                    <h2 className="text-gray-500 text-[20px] font-medium">
                      <a href="mailto:hariompatil9@gmail.com">
                        hariompatil9@gmail.com
                      </a>
                    </h2>
                  </div>
                  <div className="flex my-5">
                    <img src="/location.svg" className="mr-3  w-6 " />
                    <h2 className="text-gray-500 text-[20px] font-medium">
                      <a href="tel:0731-22552255">374 William S Canning Blvd, Fall River MA 2721, USA</a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrderDetail;
