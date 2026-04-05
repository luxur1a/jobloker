// 1. Panggil alat navigasi ajaib dari React Router
import { Link } from "react-router-dom";

function Navbar({ role, onLogout }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "10px 20px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* 2. Jadikan Logo sebagai tombol kembali ke Beranda */}
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          🏢 JobLoker
        </Link>
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {/* 3. Gunakan <Link to="..."> sebagai pengganti <a href="..."> */}
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Beranda
        </Link>

        {/* Tombol Login */}
        {!role && (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        )}

        {role && (
          <button
            onClick={onLogout}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
