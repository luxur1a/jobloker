import { useState } from "react";

// Perhatikan kata "onBerhasilTambah" di dalam kurung. Ini adalah Props (Kabel Komunikasi) dari App.jsx
function FormTambahLowongan({ onBerhasilTambah }) {
  const [judulBaru, setJudulBaru] = useState("");

  const tambahLowongan = async (e) => {
    e.preventDefault();

    if (judulBaru.trim() === "") {
      alert("Judul lowongan tidak boleh kosong!");
      return;
    }

    // 1. Ambil tiket (token) dari dalam brankas browser!
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/lowongan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 2. Sodorkan tiketnya ke satpam Backend menggunakan format "Bearer"
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ judul: judulBaru, created_by: 1 }),
      });

      if (response.ok) {
        setJudulBaru("");
        onBerhasilTambah();
      } else {
        // Tangkap pesan error dari satpam jika tiket kedaluwarsa/salah
        const errorData = await response.json();
        alert(`Gagal: ${errorData.pesan}`);
      }
    } catch (error) {
      console.error("Gagal mengirim data:", error);
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h3>Tambah Lowongan Baru</h3>
      <form onSubmit={tambahLowongan}>
        <input
          type="text"
          placeholder="Ketik nama posisi baru..."
          value={judulBaru}
          onChange={(e) => setJudulBaru(e.target.value)}
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 15px", cursor: "pointer" }}
        >
          Simpan ke Database
        </button>
      </form>
    </div>
  );
}

export default FormTambahLowongan;
