import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';
import DatePicker from 'react-datepicker';
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const [role, setRole] = useState('');
  const [hasBooked, setHasBooked] = useState(true);

  const token = localStorage.getItem("token");
  if(token) {
    try{
      const decoded = jwtDecode(token);
      let roles = null;
      roles = decoded.role;
    } catch (err) {
      // console.error("Token decode failed");
    }
  }

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await API.get(`/services/${id}`);
        setService(data);
      } catch (err) {
        console.log('Failed to load service details', err);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await API.get(`/reviews/${id}`);
        setReviews(data);
      } catch (err) {
        console.error('Failed to fetch reviews', err);
      }
    };

    const decodeRole = () => {
      const token = localStorage.getItem('token');
      if(token) {
        try {
          const decoded = jwtDecode(token);
          setRole(decoded.role);
        } catch (err) {
          console.error('JWT decode failed');
        }
      }
    };

    fetchService();
    fetchReviews();
    decodeRole();
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if(!token) {
      toast.error('You must be logged in to book!');
      return;
    }

    if(!date) {
      toast.error('Please select a date!');
      return;
    }

    try {
      console.log("📤 Booking payload:", { serviceId: service._id, scheduleDate: date });

      const res = await API.post(
        "/bookings",
        {
          serviceId: service._id,
          scheduleDate: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const bookingId = res.data._id;
      toast.success('Booking successful!');
      setTimeout(() => { navigate(`/pay/${bookingId}`); }, 1500);

    } catch (err) {
      console.log("📦 Booking response:", res.data);

      console.log('Booking failed!', err);
      toast.error("Booking failed!");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await API.post('/reviews', {
        serviceId: id,
        rating,
        comment,
      }, {
        headers: { Authorization: `Bearer ${token}`},
      });

      toast.success('Review submitted!');
      setComment('');
      setRating(5);
      const { data } = await API.get(`/reviews/${id}`);
      setReviews(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    }
  };

  const handlePayment = async () => {
    const razorpayKey = "RAZORPAY_KEY__HERE";

    const options = {
      key: razorpayKey,
      amount: service.price * 100,
      currency: "INR",
      name: "Desifix",
      description: `Booking for ${service.title}`,
      image: "",
      handler: function (response) {
        toast.success("Payment successful!");
        console.log("💰 Razorpay Payment ID:", response.razorpay_payment_id);
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "999999999",
      },
      theme: {
        color: "#1976d2",
      },
    };

    const rzp = new window.Razopay(options);
    rzp.open();
  };

  if(!service)
    return <p className='text-center mt-5'>Loading...</p>;

return (
    // <div className="container mt-5" data-aos= "fade-in">
    //   <ToastContainer />
    //   <div className="card shadow p-4">
    //     <h2 className="mb-3">{service.title}</h2>
    //     <p className="lead text-muted">{service.description}</p>

    //     <div className="row g-3">
    //       <div className="col-md-6">
    //         <p><strong>Category:</strong> {service.category}</p>
    //         <p><strong>Price:</strong> ₹{service.price}</p>
    //         <p><strong>Location:</strong> {service.location}</p>
    //       </div>
    //       <div className="col-md-6">
    //         <p><strong>Provider:</strong> {service.provider?.name}</p>
    //         <p><strong>Email:</strong> {service.provider?.email}</p>
    //       </div>
    //     </div>

    //     <hr className="my-4" />

    //     <div className="row align-items-center">
    //       <div className="col-md-6">
    //         <label className="form-label"><strong>Select Booking Date:</strong></label>
    //         <DatePicker
    //           selected={date}
    //           onChange={(d) => setDate(d)}
    //           minDate={new Date()}
    //           className="form-control form-control-lg"
    //           placeholderText="Choose a date"
    //         />
    //       </div>
    //       <div className="col-md-6 mt-3 mt-md-0 d-grid">
    //         {role === "user" ? (
    //         <button className="btn btn-primary" onClick={handleBooking}>    {/*replace with handlePayment*/}
    //           Pay & Book Now
    //         </button>
    //       ) : (
    //         <p className="text-danger mt-3">
    //           🔒 Only users can book services. Providers cannot make bookings.
    //         </p>
    //       )}

    //       <hr className='my-4' />
    //       <h4>⭐ Reviews</h4>
    //       { reviews.length === 0 && <p>No reviews yet.</p>}

    //       { reviews.map((r) => (
    //         <div key={r._id} className='mb-3 border-bottom pb-2'>
    //           <strong>{r.user?.name}</strong>{" "}
    //           <span className='text-warning'>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
    //           <p className="mb-0">{r.comment}</p>
    //             <small className="text-muted">
    //               {new Date(r.createdAt).toLocaleDateString("en-IN", {
    //                 day: "numeric", month: "short", year: "numeric"
    //               })}
    //             </small>
    //         </div>
    //       ))}

    //       {/* Review form for logged in users */}
    //         {role === "user" && hasBooked && (
    //           <form className="mt-4" onSubmit={handleSubmitReview}>
    //             <h5>Leave a Review</h5>
    //             <label>Rating</label>
    //             <select className="form-select mb-2" value={rating} onChange={(e) => setRating(e.target.value)}>
    //               {[5, 4, 3, 2, 1].map((r) => (
    //                 <option key={r} value={r}>{r} - {["Excellent", "Good", "Okay", "Poor", "Terrible"][5 - r]}</option>
    //               ))}
    //             </select>

    //             <textarea
    //               className="form-control mb-2"
    //               placeholder="Share your experience"
    //               value={comment}
    //               onChange={(e) => setComment(e.target.value)}
    //             />

    //             <button className="btn btn-success">Submit Review</button>
    //           </form>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="container my-5" data-aos= "flip-left">
      <ToastContainer />
      <div className="card shadow-sm p-4">
        <h2 className="mb-3">{service.title}</h2>
        <p className="text-muted lead">{service.description}</p>

        <div className="row">
          {/* Left column - Service details */}
          <div className="col-md-6">
            <p className="mb-2"><strong>Category:</strong> {service.category}</p>
            <p className="mb-2"><strong>Price:</strong> ₹{service.price}</p>
            <p className="mb-2"><strong>Location:</strong> {service.location}</p>
          </div>

          {/* Right column - Provider details */}
          <div className="col-md-6 ps-md-4">
            <p className="mb-2"><strong>Provider:</strong> {service.provider?.name}</p>
            <p className="mb-2"><strong>Email:</strong> {service.provider?.email}</p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row g-3">
          {token && role === "user" ? (
            <div className="col-md-6">
              <label className="form-label fw-bold">Booking Date</label>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                minDate={new Date()}
                className="form-control form-control-lg"
                placeholderText="Choose a date"
              />
            </div>
          ) : !token ? (
            <div className="col-md-6">
              <p className="text-muted mt-3">Login as a user to book this service.</p>
            </div>
          ) : null}

          <div className="col-md-6 d-grid">
            {role === 'user' ? (
              <button
                className="btn btn-primary btn-lg mt-4 mt-md-0"
                onClick={handleBooking}
                disabled={!date}
              >
                <i className="bi bi-credit-card me-2"></i>Pay & Book Now
              </button>
            ) : (
              <div className="alert alert-warning mt-4" role="alert">
                🔒 Only users can book services.
              </div>
            )}
          </div>
        </div>

        <hr className="my-4" />

        <h4>⭐ Reviews</h4>
        {reviews.length === 0 && <p className="text-muted">No reviews yet.</p>}

        {reviews.map((r) => (
          <div key={r._id} className="mb-3 border-bottom pb-2">
            <strong>{r.user?.name}</strong>{" "}
            <span className="text-warning">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
            <p className="mb-0">{r.comment}</p>
            <small className="text-muted">
              {new Date(r.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
              })}
            </small>
          </div>
        ))}

        {role === 'user' && hasBooked && (
          <form className="mt-4" onSubmit={handleSubmitReview}>
            <h5>Leave a Review</h5>
            <label className="form-label">Rating</label>
            <select
              className="form-select mb-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} - {["Excellent", "Good", "Okay", "Poor", "Terrible"][5 - r]}
                </option>
              ))}
            </select>
            <textarea
              className="form-control mb-3"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            ></textarea>
            <button className="btn btn-success">Submit Review</button>
          </form>
        )}
      </div>
    </div>


  );
};

export default ServiceDetail;