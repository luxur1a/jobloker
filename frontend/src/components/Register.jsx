import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nama_lengkap: "",
    email: "",
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
      const response = await fetch(
        "http://localhost:5000/api/register-pelamar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Akun berhasil dibuat! Silakan login.");
        navigate("/login"); // Lempar ke halaman login
      } else {
        setPesan(data.pesan); // Tampilkan error dari backend
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
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>📝 Buat Akun Pelamar</h2>

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
          type="text"
          name="nama_lengkap"
          placeholder="Nama Lengkap"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Daftar Sekarang
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}

export default Register;
