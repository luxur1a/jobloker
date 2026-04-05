import { useState, useEffect } from "react";
import FormTambahLowongan from "./FormTambahLowongan";

function Home({ role }) {
  const [lowongan, setLowongan] = useState([]);

  // Fungsi ini dipindah ke sini agar Home bisa mengambil data secara mandiri
  const ambilDataLowongan = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/lowongan");
      const data = await response.json();
      setLowongan(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    ambilDataLowongan();
  }, []);

  const handleLamar = async (lowongan_id) => {
    console.log(lowongan_id);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login terlebih dahulu!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/lamaran", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lowongan_id: lowongan_id }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.pesan);
      } else {
        alert(`Gagal: ${data.pesan}`);
      }
    } catch (error) {
      console.error("Gagal mengirim lamaran:", error);
      alert("Gagal terhubung dengan server.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📢 Selamat Datang di JobLoker</h1>
      <p>Temukan pekerjaan impian Anda di bawah ini.</p>
      {role === "admin" && (
        <div
          style={{
            backgroundColor: "#f0f8ff",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <FormTambahLowongan onBerhasilTambah={ambilDataLowongan} />
        </div>
      )}
      <h3>Daftar Posisi Terbuka:</h3>
      <ul>
        {lowongan.map((item) => (
          <li className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <strong>{item.judul}</strong> (Perusahaan: {item.nama_perusahaan})
            <br />
            {role === "pelamar" && (
              <button
                className="mt-3 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition-colors"
                onClick={() => handleLamar(item.id)}
              >
                Lamar Posisi Ini
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
