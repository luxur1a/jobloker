# JobLoker

A full-stack job portal application built with **React** (frontend) and **Express.js** (backend). JobLoker allows job seekers to browse job listings, apply for positions, and manage their profiles. Admins can post and manage job opportunities.

## 🌟 Features

- **User Registration & Authentication**: Secure user and admin registration with JWT-based authentication
- **Job Listings**: Browse available job opportunities
- **Job Applications**: Apply for job positions and track applications
- **Admin Dashboard**: Post and manage job listings
- **Password Encryption**: Secure password hashing using bcrypt
- **CORS Support**: Cross-origin requests enabled for frontend-backend communication

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment**: dotenv

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Linting**: ESLint

## 📁 Project Structure

```
JobLoker/
├── backend/
│   ├── controllers/         # Request handlers for API endpoints
│   ├── middleware/          # Authentication middleware
│   ├── routes/              # API route definitions
│   ├── db.js               # Database configuration
│   ├── index.js            # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── assets/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- Git

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5000
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`

## 📝 Available Scripts

### Backend

- `npm run dev` - Start development server with hot reload (using nodemon)

### Frontend

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔌 API Endpoints

### Authentication & Registration

- `POST /api/register` - Register as a job seeker
- `POST /api/register-admin` - Register as an admin
- `POST /api/login` - Login user/admin

### Job Listings

- `GET /api/lowongan` - Get all job listings
- `POST /api/lowongan` - Create new job listing (admin only)
- `PUT /api/lowongan/:id` - Update job listing (admin only)
- `DELETE /api/lowongan/:id` - Delete job listing (admin only)

### Job Applications

- `GET /api/lamaran` - Get all applications
- `POST /api/lamaran` - Submit job application (authenticated)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in and receives a token
2. Token is sent in the `Authorization` header for protected routes
3. Middleware verifies the token before processing requests

Protected routes require a valid JWT token in the request header:

```
Authorization: Bearer <token>
```

## 💾 Database Schema

The application uses MySQL with tables for:

- **Users**: Job seeker profiles and credentials
- **Admins**: Admin profiles and credentials
- **Lowongan** (Job Listings): Job postings
- **Lamaran** (Applications): Job applications from users

## 📦 Dependencies

### Backend Production

- `express` - Web framework
- `cors` - Cross-Origin Resource Sharing
- `mysql2` - MySQL database driver
- `jsonwebtoken` - JWT token generation and verification
- `bcrypt` - Password hashing
- `dotenv` - Environment variable management

### Frontend Production

- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC
