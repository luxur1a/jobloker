import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterAdmin() {
  const [formData, setFormData] = useState({
    nama_perusahaan: "",
    username: "",
    password: "",
    role: "admin",
    email: "", // Langsung "kunci" role-nya sebagai admin
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
      className="bg-white/85 m-auto mt-10 w-full max-w-md p-10
      text-center flex flex-col justify-center items-center border 
      rounded border-slate-500 backdrop-blur-xs"
    >
      <div className="font-sans text-2xl font-bold">
        🏢 Buat Akun HRD / Perusahaan
      </div>

      {pesan && <p style={{ color: "red", textAlign: "center" }}>{pesan}</p>}

      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center
        gap-6 w-full mt-8"
      >
        <input
          type="nama_perusahaan"
          name="nama_perusahaan"
          placeholder="Nama Perusahaan Anda"
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
          placeholder="Username Admin"
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
          placeholder="Password Kuat"
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
          placeholder="example@email.com"
          onChange={handleChange}
          required
          className="p-2 w-100 border border-slate-300
          shadow-sm rounded font-sans
          focus:outline-none focus:border-green-400
          placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="px-8 py-2 bg-indigo-500
          rounded border border-indigo-500 text-white
          hover:text-indigo-500 hover:bg-transparent transition-all"
        >
          Daftarkan Perusahaan
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
        <Link to="/login" className="hover:underline">
          Kembali ke halaman Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterAdmin;
