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
    <div className="container-fluid px-4">
      {/* Hero Section */}
      <div className="text-center bg-light py-5 rounded shadow-sm my-4">
        <h1 className="display-5 fw-bold">Find Trusted Local Services</h1>
        <p className="lead text-muted">Book professional providers for home services, beauty, repair and more.</p>
      </div>

      {/* Filters */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-4 mb-2">
          <input
            className="form-control form-control-lg"
            placeholder="Search by category (e.g. Electrician)"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            className="form-control form-control-lg"
            placeholder="Search by location (e.g. Ranchi)"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="row">
        {services.length === 0 && (
          <p className="text-center text-muted">No services found. Try different filters.</p>
        )}

        {services.map(service => (
          <div className="col-md-4 mb-4" key={service._id}>
            <div className="card h-100 shadow-sm border-0 hover-shadow">
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <ul className="list-unstyled small text-muted mb-3">
                  <li><strong>Category:</strong> {service.category}</li>
                  <li><strong>Location:</strong> {service.location}</li>
                  <li><strong>Price:</strong> ₹{service.price}</li>
                </ul>
                <Link to={`/services/${service._id}`} className="btn btn-outline-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;