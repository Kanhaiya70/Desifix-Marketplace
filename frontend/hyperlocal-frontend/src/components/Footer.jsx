// const Footer = ()=>{
//   return (
//     <footer className="bg-light text-centre py-3 mt-5 border-top">
//       <p className="mb-0">© 2025 Hyperlocal Marketplace. All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footer;

import { useEffect } from "react";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 👇 Show/hide button on scroll
  useEffect(() => {
    const scrollBtn = document.getElementById("scrollToTop");

    const handleScroll = () => {
      if (scrollBtn) {
        if (window.scrollY > 300) {
          scrollBtn.classList.add("show");
        } else {
          scrollBtn.classList.remove("show");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top button functionality
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollBtn = document.getElementById("scrollToTop");
  //     if (scrollBtn) {
  //       scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  

  return (
    <>
      {/* Footer */}
      <footer className="bg-dark text-light pt-4 pb-3 mt-5 border-top border-secondary">
        <div className="container">
          <div className="row gy-4 align-items-center">

            {/* Logo and Description */}
            <div className="col-md-4 text-center text-md-start">
              {/* Placeholder logo — replace with your image */}
              <img
                src="https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2025/05/15.-Hyperlocal-Services.png"
                alt="Swift Services Logo"
                style={{ height: "40px", marginBottom: "10px" }}
              />
              <h5 className="fw-bold">Swift Services</h5>
              <p className="small text-muted mb-0">Your trusted hyperlocal marketplace.</p>
            </div>

            {/* Links */}
            <div className="col-md-4 text-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item mx-2">
                  <a href="#" className="text-decoration-none text-light">Home</a>
                </li>
                <li className="list-inline-item mx-2">
                  <a href="#" className="text-decoration-none text-light">About</a>
                </li>
                <li className="list-inline-item mx-2">
                  <a href="#" className="text-decoration-none text-light">Contact</a>
                </li>
              </ul>
              {/* Social Icons */}
              <div className="mt-3">
                <a href="#" className="text-light me-3 fs-5"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-light me-3 fs-5"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-light me-3 fs-5"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="text-light fs-5"><i className="bi bi-twitter"></i></a>
              </div>
            </div>

            {/* Copyright */}
            <div className="col-md-4 text-center text-md-end">
              <p className="small text-light mb-0">
                © {new Date().getFullYear()} Hyperlocal Marketplace. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        id="scrollToTop"
        onClick={scrollToTop}
        className="btn btn-primary rounded-circle shadow scroll-to-top-btn"
        title="Back to top"
      >
        <i className="bi bi-arrow-up fs-5"></i>
      </button>

    </>
  );
};

export default Footer;
