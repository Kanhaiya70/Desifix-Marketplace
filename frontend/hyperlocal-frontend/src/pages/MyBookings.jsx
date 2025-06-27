import { useEffect, useState } from "react";
import API from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("🔐 Current JWT:", token);
        const { data } = await API.get(`/api/bookings/my`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        setBookings(data);
      } catch (err) {
        toast.error('Failed to fetch bookings');
      }
    };
    console.log("🧾 My bookings:", bookings);

    fetchBookings();
  }, []);

// Status to Bootstrap badge color
  const statusColor = {
    pending: 'warning',
    scheduled: 'primary',
    completed: 'success',
    cancelled: 'danger',
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4 text-center display-6 fw-bold">📋 My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm">
          You have no bookings yet.
        </div>
      ) : (
        <div className="row">
          {bookings.map((b, index) => (
            <div key={b._id} className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="card shadow-lg border-0 h-100 rounded-4 bg-light">
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">{b.service.title}</h5>
                  <hr />
                  <p className="mb-2">
                    💰 <strong>Price:</strong> ₹{b.service.price}
                  </p>
                  <p className="mb-2">
                    📅 <strong>Date:</strong>{" "}
                    {b.scheduleDate
                      ? new Date(b.scheduleDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Not Scheduled"}
                  </p>
                  <p className="mb-2">
                    📍 <strong>Location:</strong> {b.service.location}
                  </p>
                  <p className="mb-2">
                    🚦 <strong>Status:</strong>{" "}
                    <span className={`badge bg-${statusColor[b.status]} text-uppercase`}>
                      {b.status}
                    </span>
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0 text-end">
                  {/* Optional: Action button */}
                  {/* <button className="btn btn-sm btn-outline-danger">Cancel</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default MyBookings;