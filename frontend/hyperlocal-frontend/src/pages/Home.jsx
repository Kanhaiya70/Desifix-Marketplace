import { useEffect, useState } from "react";
import API from '../api/axios';
import { Link } from "react-router-dom";

const Home = () =>{
  const [services, setServices] = useState([]);
  const [filters, setFilters] = useState({ category: '', location: '' });

  const fetchServices = async () => {
    try{
      const params = new URLSearchParams(filters).toString();
      const { data } = await API.get(`/services?${params}`);
      setServices(data);
    } catch (err) {
      console.log('Failed to fetch services', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [filters]);

  return (
    <div className="container mt-4">
      <h2>All Services</h2>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search by category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search by location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
      </div>

      {/* Services */}
      <div className="row">
        {services.map(service => (
          <div className="col-md-4 mb-3" key={service._id}>
            <div className="card p-3 shadow-sm">
              <h5>{service.title}</h5>
              <p>{service.description}</p>
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Location:</strong> {service.location}</p>
              <p><strong>Price:</strong> ₹{service.price}</p>

              <Link to={`/services/${service._id}`} className="btn btn-sm btn-outline-primary mt-2">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;