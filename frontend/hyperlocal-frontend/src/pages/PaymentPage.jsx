import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const [ booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}`},
        });
        setBooking(res.data);
      } catch (err) {
        toast.error("Failed to load booking");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    const token = localStorage.getItem("token");

    const { data: order } = await axios.post(
      "/payments/order",
      { amount: booking.service.price },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Desifix Marketplace",
      description: "Service Payment",
      order_id: order.id,
      handler: async function (response) {
        try {
          const token = localStorage.getItem("token");
          await axios.post(
            "/payments/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking._id,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          toast.success("Payment verified!");
          navigate(`/payment-success?bookingId=${booking._id}&paymentId=${response.razorpay_payment_id}&orderId=${response.razorpay_order_id}`);
        } catch (err) {
          toast.error("Payment verification failed!");
          console.error(err);
        }
        // ✅ TODO: Mark booking as paid in DB
        console.log("Payment success:", response);
        toast.success("Payment successful!");
      },
      prefill: {
        name: "User",
        email: "user@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log("🛡 Razorpay Key:", options.key);
    const rzp = new window.Razorpay(options);
    rzp.open();
  };



  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">💳 Payment for Service</h2>

      {booking ? (
        <div className="card shadow p-4">
          <h5>{booking.service.title}</h5>
          <p><strong>Amount:</strong> ₹{booking.service.price}</p>
          <p><strong>Date:</strong> {new Date(booking.scheduleDate).toLocaleDateString()}</p>

          {/* Razorpay/Stripe Button goes here */}
          <button className="btn btn-success mt-3" onClick={handlePay}>
            Pay Now
          </button>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
};

export default PaymentPage;