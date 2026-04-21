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
        // 1. Simpan token di localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // 2. Login berhasil
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
      className="bg-white/85 m-auto mt-10 w-full max-w-md p-10
      text-center flex flex-col justify-center items-center border 
      rounded border-slate-500 backdrop-blur-xs"
    >
      <h2 className="font-sans text-2xl font-bold">🔐 Masuk JobLoker</h2>

      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center
        gap-6 w-full mt-8"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 w-100 border border-slate-300
          shadow-sm rounded font-sans
          focus:outline-none focus:border-green-400
          placeholder:text-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-100 border border-slate-300
          shadow-sm rounded font-sans
          focus:outline-none focus:border-green-400
          placeholder:text-gray-400"
        />
        {/* Jika ada pesan error, tampilkan dengan warna merah */}
        {errorPesan && (
          <p className="text-red-500 text-sm mt-2">{errorPesan}</p>
        )}

        <button
          type="submit"
          className="px-8 py-2 bg-green-500
          rounded border border-green-500 text-white
          hover:text-green-500 hover:bg-transparent transition-all"
        >
          Login
        </button>

        <p>
          Belum punya akun?{" "}
          <Link to="/register" className="hover:underline">
            Buat akun pelamar
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
