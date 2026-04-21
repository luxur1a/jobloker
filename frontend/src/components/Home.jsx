import { useState, useEffect } from "react";
import Logo from "../assets/hero.png";
import FormTambahLowongan from "./HRD_TambahLowongan";

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
    <div
      className="flex flex-col lg:px-28 md:px-18 sm:px-10 px-4
    "
    >
      {/* BARIS 1 */}
      <div className="mt-10">
        <h1 className="text-3xl font-sans font-bold mb-2">
          Selamat Datang di JobLoker!
        </h1>
        <p className="text-2xl mb-6">Temukan pekerjaan impian Anda di sini.</p>
      </div>
      <div>
        <h3>Daftar Posisi Terbuka:</h3>
      </div>

      {/* BARIS 2 */}
      <div
        className="w-full pt-2 mb-4
    flex flex-col items-center lg:items-start lg:flex-row lg:justify-between"
      >
        {/* // KOLOM 1 */}
        <div className="flex flex-col w-full lg:w-3/4 bg-white-500">
          <div
            className="grid grid-cols-1
       gap-6"
          >
            {lowongan.map((item) => (
              <div
                className="flex flex-row max-w-full lg:max-w-7/8 p-6 flex flex-col bg-transparent shadow-sm
          rounded-xl border border-gray-200
          hover:border-slate-600 hover:shadow-lg transition:all duration-300 "
              >
                <div className="w-32  h-32 border-r-1 pr-4">
                  <img src={Logo}></img>
                </div>
                <div key={item.id} className="pl-4 flex flex-1 flex-col">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {item.judul}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4">
                      {item.nama_perusahaan || "NA"}
                    </p>
                  </div>
                  {role === "pelamar" && (
                    <button
                      onClick={() => handleLamar(item.id)}
                      className="w-full mt-4 py-2 
              bg-green-500 text-white font-semibold rounded-md
              hover:bg-green-600 transition-color duration-200 focus:ring-2 focus:ring-green-300 outline-none"
                    >
                      Lamar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* // Kolom 2 */}
        <div className="flex flex-col items-start w-1/4 bg-green-500">
          <p>Selamat datang</p>
          <p>Full Name</p>
        </div>
        {/* 
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
      
       */}
      </div>
    </div>
  );
}

export default Home;
