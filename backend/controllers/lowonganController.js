const db = require("../db");

// Fungsi untuk GET semua lowongan
const getSemuaLowongan = async (req, res) => {
  try {
    // Kita gunakan klausa JOIN untuk menggabungkan tabel Lowongan dan Admin
    const query = `
            SELECT Lowongan.*, Admin.nama_perusahaan 
            FROM Lowongan 
            JOIN Admin ON Lowongan.created_by = Admin.id
        `;

    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

// Fungsi untuk POST lowongan baru
const tambahLowongan = async (req, res) => {
  try {
    const { judul } = req.body;

    const admin_id = req.user.id;

    if (!judul) {
      return res.status(400).json({ pesan: "Judul dan pembuat wajib diisi!" });
    }
    const [result] = await db.query(
      "INSERT INTO Lowongan (judul, created_by) VALUES (?, ?)",
      [judul, admin_id],
    );
    res
      .status(201)
      .json({ pesan: "Lowongan ditambahkan!", id_baru: result.insertId });
  } catch (error) {
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

// Fungsi untuk DELETE lowongan
const hapusLowongan = async (req, res) => {
  try {
    const lowonganId = req.params.id;
    const [result] = await db.query("DELETE FROM Lowongan WHERE id = ?", [
      lowonganId,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ pesan: "Lowongan tidak ditemukan!" });
    }
    res.json({ pesan: `Lowongan ID ${lowonganId} berhasil dihapus!` });
  } catch (error) {
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

// Ekspor semua fungsi agar bisa dipakai pelayan (routes)
module.exports = {
  getSemuaLowongan,
  tambahLowongan,
  hapusLowongan,
};
