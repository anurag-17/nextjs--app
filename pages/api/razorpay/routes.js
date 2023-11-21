import { NextResponse } from "next/server";
const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});
console.log(process.env.RAZORPAY_API_KEY);


async function handler(req, res) {
  const orderDetail = JSON.parse(req.body);

  console.log("Cart Total:", orderDetail);
    
  const payment_capture = 1;
  const amount = orderDetail?.grandTotal ;
  // const amount = 1  ;
  const currency = "INR";
  
  const options = {
    amount: amount.toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes: {
      paymentFor: "example_ebook",
      userId: orderDetail?.orderby,
      orderId: orderDetail?._id,
    },
  };

  const order = await razorpay.orders.create(options);
  res.status(200).json({ text: 'Hello....',order});
}
export default handler;


export async function POST(req) {
  const body = await req.json();
  res.status(200).json({msg: body });
}
