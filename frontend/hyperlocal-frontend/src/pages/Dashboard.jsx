import { useEffect, useState } from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);

  let user = {};
  if (token) {
    const decoded = jwtDecode(token);
    user = decoded;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (user.role === "user") {
          res = await axios.get("/bookings/my", {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else if (user.role === "provider") {
          res = await axios.get("/bookings/provider", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        setRecentData(res.data.slice(0, 3)); // show latest 3
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.role, token]);

  return (
    <div className="container mt-5" data-aos= "flip-right">
      <div className="card p-4 p-md-5 shadow-lg border-0 rounded-4 bg-light">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-1">👋 Welcome, <span className="text-primary">{user.name}</span>!</h2>
          <p className="lead">
            Your role:{" "}
            <span className={`badge bg-${user.role === 'user' ? 'success' : 'warning'} text-uppercase`}>
              {user.role}
            </span>
          </p>
        </div>

        <hr className="my-4" />

        <div className="row text-center justify-content-center">
          <div className="col-md-6">
            <h4 className="mb-3">🚀 Quick Actions</h4>
            <ul className="list-group list-group-flush">
              {user.role === "user" && (
                <li className="list-group-item">
                  <Link to="/my-bookings" className="text-decoration-none fw-semibold">
                    📋 View My Bookings
                  </Link>
                </li>
              )}
              {user.role === "provider" && (
                <li className="list-group-item">
                  <Link to="/provider-dashboard" className="text-decoration-none fw-semibold">
                    🛠 Go to Provider Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        {/* 🔥 Recent Activity Section */}
        <div className="mt-4">
          <h4>{user.role === "user" ? "🕑 Recent Bookings" : "🧰 Recent Service Requests"}</h4>

          {loading ? (
            <p>Loading...</p>
          ) : recentData.length === 0 ? (
            <p className="text-muted">No recent activity yet.</p>
          ) : (
            <ul className="list-group">
              {recentData.map((booking, idx) => (
                <li key={booking._id || idx} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{booking.service?.title || "Unknown Service"}</strong>
                    <div className="text-muted small">Status: {booking.status}</div>
                  </div>
                  <span className="badge bg-secondary">
                    {new Date(booking.scheduleDate).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;