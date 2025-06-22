import { useEffect, useState } from "react";
import API from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await API.get('/bookings/my', {
          headers: { Authorization: `Bearer ${token}`}
        });
        setBookings(data);
      } catch (err) {
        toast.error('Failed to fetch bookings');
      }
    };

    fetchBookings();
  }, []);

   return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="row">
          {bookings.map((b) => (
            <div key={b._id} className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm">
                <h5>{b.service.title}</h5>
                <p><strong>Price:</strong> ₹{b.service.price}</p>
                <p><strong>Date:</strong> {new Date(b.scheduledDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {b.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;