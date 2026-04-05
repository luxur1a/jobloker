import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterAdmin() {
  const [formData, setFormData] = useState({
    nama_perusahaan: "",
    username: "",
    password: "",
    role: "admin", // Langsung "kunci" role-nya sebagai admin
  });
  const [pesan, setPesan] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setPesan("");

    try {
      const response = await fetch("http://localhost:5000/api/register-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Akun HRD berhasil dibuat! Silakan login.");
        navigate("/login");
      } else {
        setPesan(data.pesan);
      }
    } catch (error) {
      setPesan("Gagal terhubung ke server");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #3498db",
        borderRadius: "8px",
        fontFamily: "sans-serif",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>
        🏢 Buat Akun HRD / Perusahaan
      </h2>

      {pesan && <p style={{ color: "red", textAlign: "center" }}>{pesan}</p>}

      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="nama_perusahaan"
          name="nama_perusahaan"
          placeholder="Nama Perusahaan Anda"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />

        <input
          type="text"
          name="username"
          placeholder="Username Admin"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password Kuat"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Daftarkan Perusahaan
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
        <Link to="/login">Kembali ke halaman Login</Link>
      </p>
    </div>
  );
}

export default RegisterAdmin;
