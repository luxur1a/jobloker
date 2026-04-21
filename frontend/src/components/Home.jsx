import { useState, useEffect } from "react";
import Logo from "../assets/hero.png";
import FormTambahLowongan from "./HRD_TambahLowongan";

function Home({ role }) {
  const [lowongan, setLowongan] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

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

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok) {
        setProfileName(data.nama_lengkap);
        setProfileEmail(data.email);
      } else {
        alert(`Gagal: ${data.pesan}`);
      }
    } catch (error) {
      console.error("Gagal mengambil data profil:", error);
    }
  };

  useEffect(() => {
    ambilDataLowongan();
    fetchProfile();
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
    <div // Posisi BG
    >
      <div
        className="flex flex-col lg:px-28 md:px-18 sm:px-10 px-4
    "
      >
        {/* BARIS 1 */}
        <div className="mt-10 bg-transparent">
          <h1 className="text-3xl font-sans font-bold mb-2">
            Selamat Datang di JobLoker!
          </h1>
          <h2 className="text-2xl mb-6">
            Temukan pekerjaan impian Anda di sini.
          </h2>
        </div>
        <div>
          <h3>Daftar Posisi Terbuka:</h3>
        </div>

        {/* BARIS 2 */}
        <div
          className="w-full pt-2 mb-4
    flex flex-col items-center lg:items-stretch lg:flex-row lg:justify-between"
        >
          {/* // KOLOM 1 */}
          <div className="flex flex-col w-full lg:w-3/4 bg-white-500">
            <div
              className="grid grid-cols-1
       gap-6"
            >
              {lowongan.map((item) => (
                <div
                  className="flex flex-row max-w-full lg:max-w-7/8 p-6 flex flex-col shadow-sm
          rounded-xl border border-gray-200 backdrop-blur-xs bg-linear-to-r from-white/80 from-90% to-indigo-600/50
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
          <div
            className="flex flex-1 flex-col w-1/4 bg-linear-to-b from-indigo-700/90 to-slate-800/90 p-4 py-8 rounded-lg
          backdrop-blur-xs "
          >
            {role === "pelamar" && (
              <>
                <div className="flex flex-col">
                  <div className="text-white">Selamat datang!</div>
                  <img
                    className="h-32 w-32 my-4 rounded-full self-center"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-white">{profileName}</div>
                  <div className="text-slate-400 text-sm">{profileEmail}</div>

                  <br />

                  <br />
                </div>
              </>
            )}
            {role === "admin" && (
              <>
                <div className="flex flex-col">
                  <div className="text-white">Selamat datang!</div>
                  <img
                    className="h-32 w-32 my-4 rounded-full self-center"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-white">{profileName}</div>
                  <div className="text-slate-400 text-sm">{profileEmail}</div>

                  <br />

                  <br />
                </div>
              </>
            )}
            {!role && (
              <>
                <div className="flex flex-col text-white">
                  Anda belum login. Silakan login atau buat akun!
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
