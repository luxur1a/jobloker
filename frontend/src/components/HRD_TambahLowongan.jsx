import { useState } from "react";

function FormTambahLowongan() {
  const [judulBaru, setJudulBaru] = useState("");

  const tambahLowongan = async (e) => {
    e.preventDefault();

    if (judulBaru.trim() === "") {
      alert("Judul lowongan tidak boleh kosong!");
      return;
    }

    // Ambil token
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/lowongan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ judul: judulBaru }),
      });

      if (response.ok) {
        setJudulBaru("");
      } else {
        // Tangkap pesan error jika token kedaluwarsa/salah
        const errorData = await response.json();
        alert(`Gagal: ${errorData.pesan}`);
      }
    } catch (error) {
      console.error("Gagal mengirim data:", error);
    }
  };

  return (
    <div className="max w-full lg:px-28 md:px-18 sm:px-10 pt-10">
      <div className="p-8 flex flex-col justify-start gap-6 border rounded-lg">
        <h1 className="text-2xl font-bold font-sans">Tambah Lowongan Baru</h1>
        <form className="mt-4 flex flex-col gap-6" onSubmit={tambahLowongan}>
          <input
            className="p-2 w-100 border border-slate-300
            shadow-sm rounded font-sans
            focus:outline-none focus:border-green-400
            placeholder:text-gray-400"
            type="text"
            placeholder="Ketik nama posisi baru..."
            value={judulBaru}
            onChange={(e) => setJudulBaru(e.target.value)}
          />
          <button
            type="submit"
            className="self-end px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Posting Lowongan!
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormTambahLowongan;
