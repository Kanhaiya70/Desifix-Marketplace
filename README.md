
# 🛠️ DesiFix - Hyperlocal Service Marketplace

DesiFix is a full-stack web application (inspired by Urban Company) where **users can book services** like electrician, plumbing, beauty, etc., and **service providers can manage their offerings**. It includes secure authentication, Razorpay payments, dynamic service listings, and a provider dashboard.

### 🔗 Live Demo

- Frontend: [Netlify Deployment](https://desifix-marketplace.netlify.app)  
- Backend: [Render Deployment](https://desifix-marketplace-backend.onrender.com) *(used as API endpoint)*

---

## 📦 Features

### 👤 User Features
- Register/Login (JWT + OAuth via Google)
- Browse and filter services by category/location
- View detailed service page and book it
- Choose schedule date
- Pay via Razorpay
- See booking status and history
- Download booking receipt as PDF

### 🛠️ Provider Features
- Register/Login as provider
- Create/update/delete their own services
- Upload image or provide image link
- View bookings for their services
- Update booking status (scheduled, completed, etc.)

### 🔐 Admin/Protected Routes
- Role-based access: user, provider, admin
- Auth middleware (`protect`) and role checks (`isProvider`, `isUser`, `isAdmin`)

---

## 📁 Project Structure

```
kanhaiya70-desifix-marketplace/
├── backend/                  # Node.js + Express + MongoDB API
│   ├── routes/              # All API routes (auth, services, payments)
│   ├── controllers/         # Controllers for handling logic
│   ├── models/              # Mongoose models
│   ├── config/              # DB connection, Razorpay config
│   ├── middlewares/         # Auth, role, and file upload logic
│   ├── utils/               # JWT token generation
│   └── uploads/             # Uploaded service images
│
└── frontend/hyperlocal-frontend/    # React + Bootstrap + Vite
    ├── pages/             # Page-level components
    ├── components/        # Reusable UI components (Navbar, Footer)
    ├── api/axios.js       # Axios instance with baseURL
    ├── App.jsx            # React Router setup
    └── index.html         # Razorpay script + Bootstrap CDN
```

---

## ⚙️ Tech Stack

| Layer       | Technology                       |
|-------------|-----------------------------------|
| Frontend    | React.js, Bootstrap, React Router, AOS |
| Backend     | Node.js, Express.js               |
| Database    | MongoDB + Mongoose                |
| Auth        | JWT, Passport-Google-OAuth2       |
| Payments    | Razorpay API                      |
| Deployment  | Netlify (frontend), Render (backend) |

---

## 💳 Payment Integration

- Razorpay is used for payments.
- After booking, users are redirected to `/pay/:bookingId`.
- On successful payment, verification hits backend (`/api/payments/verify`).
- Payment status and receipt ID is stored in MongoDB.

---

## 📑 How to Run Locally

### Backend (Node.js + MongoDB)
```bash
cd backend
npm install
# Add .env file with:
# MONGO_URI, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, FRONTEND_URL, BACKEND_URL
npm run dev
```

### Frontend (React + Vite)
```bash
cd frontend/hyperlocal-frontend
npm install
# Add .env file with:
# VITE_BACKEND_URL=http://localhost:7050
npm run dev
```

---

## 📌 Environment Variables (`.env`)

**Backend**
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:7050
```

**Frontend**
```
VITE_BACKEND_URL=http://localhost:7050
```

---

## 🧪 API Endpoints (Examples)

| Endpoint                  | Method | Description                    |
|---------------------------|--------|--------------------------------|
| `/api/auth/register`      | POST   | User or Provider registration  |
| `/api/auth/login`         | POST   | Login with email/password      |
| `/api/services`           | GET    | List all services              |
| `/api/services/:id`       | GET    | Service detail                 |
| `/api/bookings`           | POST   | Create booking (auth required) |
| `/api/payments/order`     | POST   | Create Razorpay order          |
| `/api/payments/verify`    | POST   | Verify Razorpay signature      |

---


## 🚀 Future Enhancements

- Admin dashboard for category/location management
- Real-time notifications using socket.io
- Google Maps for location services
- Chatbot using OpenAI API

---

## 👨‍💻 Author

**Kanhaiya Agarwal**  
B.Tech CSE (6th Sem)  
Jharkhand University of Technology  
[LinkedIn](https://www.linkedin.com/public-profile/settings) | [GitHub](https://github.com/Kanhaiya70)