import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterAdmin from "./components/RegisterAdmin";
import HRD_Dashboard from "./components/HRD_Dashboard";
import { useState } from "react";
import FormTambahLowongan from "./components/HRD_TambahLowongan";

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
    <div style={{ fontFamily: "sans-serif", margin: 0, padding: 0 }}>
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
