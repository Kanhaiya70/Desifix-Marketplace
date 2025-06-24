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

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await API.get(`/services/${id}`);
        setService(data);
      } catch (err) {
        console.log('Failed to load service details', err);
      }
    };
    fetchService();
  }, [id]);

  const token = localStorage.getItem('token');
  let role = null;
  if(token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

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
      console.log("📤 Booking payload:", { serviceId: id, scheduleDate: date });
      await API.post(
        "/bookings",
        {
          serviceId: id,
          scheduleDate: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      toast.success('Booking successful!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.log('Booking failed!', err);
      toast.error("Booking failed!");
    }
  };

  if(!service)
    return <p className='text-center mt-5'>Loading...</p>;

return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="card shadow p-4">
        <h2 className="mb-3">{service.title}</h2>
        <p className="lead text-muted">{service.description}</p>

        <div className="row g-3">
          <div className="col-md-6">
            <p><strong>Category:</strong> {service.category}</p>
            <p><strong>Price:</strong> ₹{service.price}</p>
            <p><strong>Location:</strong> {service.location}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Provider:</strong> {service.provider?.name}</p>
            <p><strong>Email:</strong> {service.provider?.email}</p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <label className="form-label"><strong>Select Booking Date:</strong></label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              minDate={new Date()}
              className="form-control form-control-lg"
              placeholderText="Choose a date"
            />
          </div>
          <div className="col-md-6 mt-3 mt-md-0 d-grid">
            {role === "user" ? (
            <button className="btn btn-primary" onClick={handleBooking}>
              Book Now
            </button>
          ) : (
            <p className="text-danger mt-3">
              🔒 Only users can book services. Providers cannot make bookings.
            </p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;