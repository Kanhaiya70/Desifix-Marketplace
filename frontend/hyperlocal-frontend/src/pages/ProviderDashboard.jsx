import { useEffect, useState } from "react";
import axios from 'axios';

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:7050/api/services/my-services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },  
      });
      setServices(data);
    } catch (err) {
      console.log('Error fetching provider services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyServices();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading your services.</p>

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Services</h2>
      {services.length === 0 ? (
        <p className="text-center">You have not listed any services yet.</p>
      ) : (
        <div className="row">
          {services.map(service => (
            <div className="col-md-4 mb-4" key={service._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                  <p className="mb-1">
                    <strong>Category:</strong> {service.category}
                  </p>
                  <p className="mb-1">
                    <strong>Price:</strong> ₹{service.price}
                  </p>
                  <p className="mb-1">
                    <strong>Location:</strong> {service.location}
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

export default ProviderDashboard;