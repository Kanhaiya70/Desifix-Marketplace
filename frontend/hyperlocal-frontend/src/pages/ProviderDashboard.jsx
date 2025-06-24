import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    fetchMyServices();
    fetchProviderBookings();
  }, []);

  const fetchMyServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:7050/api/services/my-services", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("📦 Response from /my-services:", data);
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching services:', err);
      toast.error("Failed to fetch services");
      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  };

  const fetchProviderBookings = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("http://localhost:7050/api/bookings/provider", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("📋 Booking:", bookings.scheduleDate);
    console.log("📋 Full booking data:", data);
    setBookings(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    toast.error("Failed to fetch bookings");
    setBookings([]); // fallback to empty array
  } finally {
    setLoadingBookings(false);
  }
};


  const updateStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:7050/api/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Booking status updated");
      fetchProviderBookings(); // refresh list
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />

      <h2 className="text-center mb-4">🧰 Provider Dashboard</h2>

      {/* Section 1: Services */}
      <section className="mb-5">
        <h4 className="mb-3">📦 My Listed Services</h4>
        {loadingServices ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <div className="alert alert-info">You have not listed any services yet.</div>
        ) : (
          <div className="row">
            {services.map((service) => (
              <div key={service._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5>{service.title}</h5>
                    <p>{service.description}</p>
                    <ul className="list-unstyled small text-muted">
                      <li><strong>Category:</strong> {service.category}</li>
                      <li><strong>Location:</strong> {service.location}</li>
                      <li><strong>Price:</strong> ₹{service.price}</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <hr />

      {/* Section 2: Bookings */}
      <section>
        <h4 className="mb-3">📋 Bookings for My Services</h4>
        {loadingBookings ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="alert alert-info">No bookings found for your services.</div>
        ) : (
          <div className="row">
            {bookings.map((booking) => (
              <div key={booking._id} className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm p-3">
                  <h5>{booking.service.title}</h5>
                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.scheduleDate
                      ? new Date(booking.scheduleDate).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "Not Scheduled"}
                  </p>
                  <p><strong>Location:</strong> {booking.service.location}</p>
                  <p><strong>Price:</strong> ₹{booking.service.price}</p>
                  <p><strong>Current Status:</strong></p>
                  <select
                    className="form-select"
                    value={booking.status}
                    onChange={(e) => updateStatus(booking._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProviderDashboard;
