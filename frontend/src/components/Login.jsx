import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorPesan, setErrorPesan] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorPesan(""); // Kosongkan error sebelumnya

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Simpan tiket (token) di brankas browser (localStorage)
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // 2. Beri tahu manajer (App.jsx) bahwa login berhasil!
        onLoginSuccess(data.role);
      } else {
        // Jika password salah atau user tidak ada
        setErrorPesan(data.pesan);
      }
    } catch (error) {
      console.error("Gagal login:", error);
      setErrorPesan("Gagal terhubung ke server");
    }
  };

  return (
    <div
      style={{
        maxWidth: "350px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h2>🔐 Masuk JobLoker</h2>

      {/* Jika ada pesan error, tampilkan dengan warna merah */}
      {errorPesan && (
        <p style={{ color: "red", fontSize: "14px" }}>{errorPesan}</p>
      )}

      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Username (contoh: admin_hrd)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password (contoh: rahasia123)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#2c3e50",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
        <p style={{ marginTop: "15px" }}>
          Belum punya akun? <Link to="/register">Buat akun pelamar</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
