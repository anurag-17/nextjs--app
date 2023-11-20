import crypto from "crypto";
import Payment from "../../../database/model/Payment";
import dbConnect from "../../../database/database";

export async function POST(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("id==", body);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await dbConnect();

      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.status(200).json({ msg: "success" });
    } else {
      res.status(400).json({ msg: "fail" });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
