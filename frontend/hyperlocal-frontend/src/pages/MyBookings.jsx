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
        const { data } = await API.get('http://localhost:7050/api/bookings/my', {
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
    scheduled: 'success',
    completed: 'success',
    cancelled: 'danger',
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4 text-center">📋 My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="alert alert-info text-center">
          You have no bookings yet.
        </div>
      ) : (
        <div className="row">
          {bookings.map((b) => (
            <div key={b._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">{b.service.title}</h5>
                  <p className="mb-1"><strong>Price:</strong> ₹{b.service.price}</p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {b.scheduleDate
                      ? new Date(b.scheduleDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Not Scheduled"}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong>{" "}
                    <span className={`badge bg-${statusColor[b.status]}`}>
                      {b.status.toUpperCase()}
                    </span>
                  </p>
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