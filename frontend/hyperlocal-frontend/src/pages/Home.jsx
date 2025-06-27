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

  // useEffect(() => {
  //   fetchServices();
  // }, [filters]);

  useEffect(() => {
    const el = document.querySelector("#heroCarousel");
    if (el) {
      const carousel = new window.bootstrap.Carousel(el, {
        interval: 5000,
        ride: "carousel",
      });
    }
    fetchServices();
  }, [filters]);

return (
    <div className="container-fluid px-4" data-aos= "fade-right" data-aos-delay={100}>

      {/* Filters */}
      {/* <div className="row justify-content-center mb-4">
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
      </div> */}

      {/* Filters */}
      <div className="bg-light py-4 px-3 rounded shadow-sm mt-1 mb-4">
        <div className="container">
          <div className="row justify-content-center g-3">
            {/* Category */}
            <div className="col-md-4">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by category (e.g. Electrician)"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                />
              </div>
            </div>

            {/* Location */}
            <div className="col-md-4">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by location (e.g. Ranchi)"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
            </div>

            {/* Button */}
            <div className="col-md-2 d-flex gap-2">
              <button className="btn btn-primary w-100" onClick={fetchServices}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Hero Section */}
      <div id="heroCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
        <div className="carousel-inner rounded shadow overflow-hidden">

          {/* Slide 1 */}
          <div className="carousel-item active" data-bs-interval="3000" style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              className="d-block w-100"
              alt="Home Services"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            ></div>
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: 2 }}>
              <h1 className="display-5 fw-bold text-white">Find Trusted Local Services</h1>
              <p className="lead text-white">Book professionals for home, beauty, repair and more.</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item" data-bs-interval="3000" style={{ position: 'relative' }}>
            <img
              src="https://cdn.pixabay.com/photo/2024/07/01/20/41/ai-generated-8866051_1280.jpg"
              className="d-block w-100"
              alt="Repair Services"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            ></div>
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: 2 }}>
              <h1 className="display-5 fw-bold text-white">Expert Services at Your Doorstep</h1>
              <p className="lead text-white">Plumbers, electricians, beauticians — all in one place.</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item" data-bs-interval="3000" style={{ position: 'relative' }}>
            <img
              src="https://img.freepik.com/premium-photo/man-is-holding-faucet-that-has-number-3-it_1207067-17833.jpg?ga=GA1.1.1510334441.1727718078&semt=ais_hybrid&w=740"
              className="d-block w-100"
              alt="Beauty Services"
              style={{ height: '400px', objectFit: 'cover', backgroundColor: '#000'}}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            ></div>
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: 2 }}>
              <h1 className="display-5 fw-bold text-white">Expert Services at Your Doorstep</h1>
              <p className="lead text-white">Plumbers, electricians, beauticians — all in one place.</p>
            </div>
          </div>


          {/* Slide 4 */}
          <div className="carousel-item" data-bs-interval="3000" style={{ position: 'relative' }}>
            <img
              src="https://cdn.pixabay.com/photo/2017/08/24/11/12/makeup-2676392_960_720.jpg"
              className="d-block w-100"
              alt="Beauty Services"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            ></div>
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: 2 }}>
              <h1 className="display-5 fw-bold text-white">Pamper Yourself at Home</h1>
              <p className="lead text-white">Book beauticians, spas, and wellness anytime.</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      

      <div>
        <h2 className="mb-4">📈 Trending Services</h2> {/*info purpose*/}
      </div>

      
      {/* Services Grid */}
      <div className="row" data-aos="zoom-in">
        {services.length === 0 && (
          <p className="text-center text-muted">No services found. Try different filters.</p>
        )}

        {services.map(service => (
          <div key={service._id} className="col-md-4 mb-4" >
            <div className="card shadow-sm border-0 text-center p-3 h-100">
              {/* 🖼️ Clickable Image with Hover */}
              <Link to={`/services/${service._id}`} className="d-block mx-auto">
                <img
                  src= {service.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuB8vf7vwXthhRu2s-SsFeabYs3VlAK083sO-umhbVtqwVekfPXOqf8PTkLzbkqbQ4hH7DA2Ydny89OYRR3gD7EIPY3Stc2TNjuRdhWoNY5g4U6aaIn5MZ06-_Yvmnxn-79vrvaMevRnNe0sdn4Xv82rhURQqtizvZMegLFz-_Jxe2AWadMl3T1539891rlJokvnAxLqCUJ7Pgd75pQmY4uCPqprveGmQBHs0cuUqRFhn825y6SeqgraoFoCEfXFxrYHRAGtkTr1AXY"}
                  alt={service.title}
                  className="img-fluid rounded hover-zoom"
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
              </Link>

              {/* 🏷️ Title Below */}
              <h6 className="mt-3 mb-0 fw-semibold text-dark">{service.title}</h6>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;