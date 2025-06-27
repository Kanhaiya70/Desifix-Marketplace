import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "../api/axios";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");
  const paymentId = params.get("paymentId");
  const orderId = params.get("orderId");

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(data);
      } catch (err) {
        console.error("Failed to load booking", err);
      }
    };

    if(bookingId) fetchBooking();
  }, [bookingId]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("receipt-content");
    if(!element) {
      toast.error("Receipt not ready. Please wait a second.");
      return;
    }

    const canvas = await html2canvas(element, { useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Receipt-${booking._id}.pdf`);
  };


  return(
    <div className="container mt-5 text-center">
      <div className="card shadow-lg p-5 rounded-4">
        <h2 className="text-success mb-3">🎉 Payment Successful!</h2>
        <p className="lead">Thank you for your booking.</p>

        {booking ? (
          <>
            <div className="bg-white p-4" id="receipt-content" style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial" }}>

              {/* Header with Logo and Title */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <img src="https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2025/05/15.-Hyperlocal-Services.png" alt="Desifix Logo" crossOrigin="anonymous" style={{ height: "50px" }} />
                <h4 className="text-end">Receipt / Invoice</h4>
              </div>

              <hr />

              <h5>🧾 Booking Summary</h5>
              <p><strong>Service:</strong> {booking.service.title}</p>
              <p><strong>Date:</strong> {new Date(booking.scheduleDate).toLocaleDateString("en-IN")}</p>
              <p><strong>Price:</strong> ₹{booking.service.price}</p>
              <p><strong>Status:</strong> {booking.paymentStatus.toUpperCase()}</p>

              <hr/>
              <h6>🔐 Payment Details</h6>
              <p><strong>Booking ID:</strong> {booking._id}</p>
              <p><strong>Payment ID:</strong> {paymentId}</p>
              <p><strong>Order ID:</strong> {orderId}</p>
            </div>

            <button className="btn btn-outline-dark mt-3" onClick={handleDownloadPDF}>
              📥 Download Receipt (PDF)
            </button>
          </>  
        ) : (
          <p>Loading booking details...</p>
        )}

        <Link to="/dashboard" className="btn btn-primary mt-4">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;