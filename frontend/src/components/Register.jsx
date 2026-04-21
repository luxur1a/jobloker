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
      className="bg-white/85 m-auto mt-10 w-full max-w-md p-10
      text-center flex flex-col justify-center items-center border 
      rounded border-slate-500 backdrop-blur-xs"
    >
      <div className="font-sans text-2xl font-bold">📝 Buat Akun Pelamar</div>

      {pesan && <p style={{ color: "red", textAlign: "center" }}>{pesan}</p>}

      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center
        gap-6 w-full mt-8"
      >
        <input
          type="text"
          name="nama_lengkap"
          placeholder="Nama Lengkap"
          onChange={handleChange}
          required
          className="p-2 w-100 border border-slate-300
          shadow-sm rounded font-sans
          focus:outline-none focus:border-green-400
          placeholder:text-gray-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="p-2 w-100 border border-slate-300
          shadow-sm rounded font-sans
          focus:outline-none focus:border-green-400
          placeholder:text-gray-400"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="p-2 w-100 border border-slate-300
          shadow-sm rounded font-sans
          focus:outline-none focus:border-green-400
          placeholder:text-gray-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="p-2 w-100 border border-slate-300
          shadow-sm rounded font-sans
          focus:outline-none focus:border-green-400
          placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="px-8 py-2 bg-green-500
          rounded border border-green-500 text-white
          hover:text-green-500 hover:bg-transparent transition-all"
        >
          Daftar Sekarang
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Sudah punya akun?{" "}
        <Link to="/login" className="hover:underline">
          Login di sini
        </Link>
      </p>
    </div>
  );
}

export default Register;
