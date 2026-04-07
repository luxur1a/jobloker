import { useState, useEffect } from "react";

function DashboardHRD() {
  const [daftarLamaran, setDaftarLamaran] = useState([]);

  const [pesan, setPesan] = useState("");

  const fetchLamaran = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/admin/lamaran", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok) {
        setDaftarLamaran(data);
      } else {
        setPesan(data.pesan || "Gagal mengambil data lamaran.");
      }
    } catch (error) {
      setPesan("Gagal terhubung ke server.");
    }
  };

  useEffect(() => {
    fetchLamaran();
  }, []);

  const handleUbahStatus = async (lamaran_id, statusBaru) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/lamaran/${id_lamaran}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: statusBaru }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setDaftarLamaran((prevLamaran) =>
          prevLamaran.map((lamaran) =>
            lamaran.id_lamaran === id_lamaran
              ? { ...lamaran, status: statusBaru }
              : lamaran,
          ),
        );
      } else {
        alert(data.pesan);
      }
    } catch (error) {
      alert("Gagal memperbarui status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Terkirim":
        return "bg-gray-100 text-gray-800";
      case "Diproses":
        return "bg-blue-100 text-blue-800";
      case "Wawancara":
        return "bg-yellow-100 text-yellow-800";
      case "Diterima":
        return "bg-green-100 text-green-800";
      case "Ditolak":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">
        Kelola Pelamar Masuk
      </h2>

      {pesan && <p className="text-red-500 mb-4">{pesan}</p>}

      {daftarLamaran.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500">Belum ada lamaran yang masuk.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-200 text-slate-600">
                <th className="p-4 font-semibold">Nama Pelamar</th>
                <th className="p-4 font-semibold">Posisi</th>
                <th className="p-4 font-semibold">Tanggal</th>
                <th className="p-4 font-semibold">Status Saat Ini</th>
                <th className="p-4 font-semibold">Aksi (Ubah Status)</th>
              </tr>
            </thead>
            <tbody>
              {daftarLamaran.map((item) => (
                <tr
                  key={item.id_lamaran}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="font-medium text-slate-800">
                      {item.nama_lengkap}
                    </div>
                    <div className="text-sm text-slate-500">
                      {item.email_pelamar}
                    </div>
                  </td>
                  <td className="p-4 text-slate-700">{item.posisi_dilamar}</td>
                  <td className="p-4 text-slate-600 text-sm">
                    {new Date(item.tanggal_melamar).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {/* Menggunakan elemen select agar HRD bisa langsung memilih status baru */}
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleUbahStatus(item.id_lamaran, e.target.value)
                      }
                      className="p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-sm"
                    >
                      <option value="Terkirim">Terkirim</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Wawancara">Wawancara</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DashboardHRD;
