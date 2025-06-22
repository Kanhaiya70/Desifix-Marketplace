import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';
import DatePicker from 'react-datepicker';
import { toast, ToastContainer } from 'react-toastify';

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
    <div className='container mt-5'>
      <ToastContainer />
      <div className='card p-4 shadow'>
        <h2>{service.title}</h2>
        <p>{service.description}</p>
        <p><strong>Price:</strong> ₹{service.price}</p>
        <p><strong>Category:</strong> {service.category}</p>
        <p><strong>Location:</strong> {service.location}</p>
        <p><strong>Provider:</strong> {service.provider?.name} ({service.provider?.email})</p>

        <div className='mt-4'>
          <label><strong>Select Date:</strong></label>
          <br />
          <DatePicker 
            selected={date}
            onChange={(d) => setDate(d)}
            minDate={new Date()}
            className='form-control w-50'
            placeholderText='Choose a date'
          />
        </div>

        <button onClick={handleBooking} className='btn btn-success mt-3'>Book Now</button>
      </div>
    </div>
  );
};

export default ServiceDetail;