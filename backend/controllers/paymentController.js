import razorpay from '../config/razorpay.js';
import crypto from 'crypto';
import Booking from '../models/Booking.js';

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Math.floor(Math.random() * 10000),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Create Razorpay Order Error:", err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ message: "Signature verification failed" });
  }

  // update booking as paid
  try{
    const booking = await Booking.findById(bookingId);
    if(!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "paid";
    booking.paymentId = razorpay_payment_id;
    booking.orderId = razorpay_order_id;

    await booking.save();

    res.status(200).json({ message: "Payment verified and booking updated" });
  } catch (err) {
    console.error("Payment update error:", err);
    res.status(500).json({ message: "Server error while updating booking" });
  }
};