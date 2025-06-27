import { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import.meta.env.VITE_BACKEND_URL;

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [image, setImage] = useState(null);
  const [imageMode, setImageMode] = useState("upload");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyServices();
    fetchProviderBookings();
  }, []);

  const fetchMyServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${VITE_BACKEND_URL}/api/services/my-services`, {
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
    const { data } = await axios.get(`${VITE_BACKEND_URL}/api/bookings/provider`, {
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
        `${VITE_BACKEND_URL}/api/bookings/${bookingId}/status`,
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

  const handleCreateService = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      let res;

      if (imageMode === "upload") {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("location", location);
        formData.append("price", price);
        formData.append("image", imageFile);

        res = await axios.post("/services", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post(
          "/services",
          {
            title,
            description,
            category,
            location,
            price,
            image: imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      toast.success("Service created successfully!");
      setShowForm(false);
      fetchMyServices();
    } catch (error) {
      console.error("Create Service Error:", error);
      toast.error("Failed to create service.");
    }
  };


  return (
    <div className="container mt-5">
      <ToastContainer />

      <h2 className="text-center mb-5 fw-bold display-6">🧰 Provider Dashboard</h2>

      {/* Section 1: Services */}
      <section className="mb-5">
        <h4 className="mb-4 text-primary">📦 My Listed Services</h4>
        {loadingServices ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <div className="alert alert-info shadow-sm">You have not listed any services yet.</div>
        ) : (
          <div className="row">
            {services.map((service) => (
              <div 
                key={service._id} 
                className="col-md-6 col-lg-4 mb-4" 
                data-aos="zoom-in" 
                onClick={() => navigate(`/services/${service._id}`)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card h-100 shadow-lg border-0 rounded-4">
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-success">{service.title}</h5>
                    <p className="text-muted">{service.description}</p>
                    <ul className="list-unstyled small">
                      <li>📂 <strong>Category:</strong> {service.category}</li>
                      <li>📍 <strong>Location:</strong> {service.location}</li>
                      <li>💰 <strong>Price:</strong> ₹{service.price}</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-success"
          onClick={() => setShowForm(true)}
        >
          ➕ Add New Service
        </button>
      </div>

      {showForm && (
        <div className="card p-4 shadow-sm mb-5">
          <h5 className="mb-3">📝 Create New Service</h5>
          <form onSubmit={handleCreateService}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
              </div>
              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
              </div>
              <div className="col-md-6 mb-3">
                <input type="number" className="form-control" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
              <div className="col-12 mb-3">
                <textarea className="form-control" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Select Image Input Mode</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="imageMode"
                    value="upload"
                    checked={imageMode === "upload"}
                    onChange={() => setImageMode("upload")}
                  />
                  <label className="form-check-label">Upload Image</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="imageMode"
                    value="link"
                    checked={imageMode === "link"}
                    onChange={() => setImageMode("link")}
                  />
                  <label className="form-check-label">Image URL</label>
                </div>
              </div>


              {imageMode === "upload" ? (
                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="col-12 text-end">
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </div>
          </form>
        </div>
      )}


      <hr className="my-5" />

      {/* Section 2: Bookings */}
      <section>
        <h4 className="mb-4 text-primary">📋 Bookings for My Services</h4>
        {loadingBookings ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="alert alert-info shadow-sm">No bookings found for your services.</div>
        ) : (
          <div className="row">
            {bookings.map((booking, index) => (
              <div key={booking._id} className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card shadow-lg border-0 p-4 rounded-4 bg-light">
                  <h5 className="fw-bold mb-2 text-dark">{booking.service.title}</h5>
                  <p className="mb-1">📅 <strong>Date:</strong> {booking.scheduleDate ? new Date(booking.scheduleDate).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "Not Scheduled"}</p>
                  <p className="mb-1">📍 <strong>Location:</strong> {booking.service.location}</p>
                  <p className="mb-2">💰 <strong>Price:</strong> ₹{booking.service.price}</p>
                  <div className="mb-2">
                    🚦 <strong>Status:</strong>
                    <select
                      className="form-select mt-2"
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
              </div>
            ))}
          </div>
        )}
      </section>
    </div>

  );
};

export default ProviderDashboard;
