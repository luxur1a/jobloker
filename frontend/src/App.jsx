import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterAdmin from "./components/RegisterAdmin";
import HRD_Dashboard from "./components/HRD_Dashboard";
import { useState } from "react";
import FormTambahLowongan from "./components/HRD_TambahLowongan";
import BackgroundImage from "./assets/rocket.png";

function App() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    navigate("/login"); // Kembalikan ke halaman login
  };

  return (
    <div
      className="bg-cover min-h-screen bg-size-[auto_768px] bg-top-right bg-no-repeat bg-origin-content bg-fixed pt-22
      h-full"
      // Gunakan inline-style React untuk memanggil variabel gambar
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <Navbar role={role} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home role={role} />} />

        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        <Route path="/register" element={<Register />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />

        <Route
          path="/dashboard-hrd"
          element={
            role === "admin" ? <HRD_Dashboard /> : <Navigate to="/" replace />
          }
        />

        <Route
          path="/job-posting"
          element={
            role === "admin" ? (
              <FormTambahLowongan />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
