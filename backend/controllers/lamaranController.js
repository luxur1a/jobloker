const db = require("../db");

const getLamaranUntukAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const query = `
            SELECT 
                l.id AS id_lamaran,
                l.status,
                l.tanggal_melamar,
                p.nama_lengkap,
                p.email AS email_pelamar,
                low.judul AS posisi_dilamar
            FROM Lamaran l
            JOIN Pelamar p ON l.pelamar_id = p.id
            JOIN Lowongan low ON l.lowongan_id = low.id
            WHERE low.created_by = ?
            ORDER BY l.tanggal_melamar DESC;
        `;

    const [rows] = await db.query(query, [adminId]);
    res.json(rows);
  } catch (error) {
    console.error("Gagal mengambil data lamaran:", error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

const tambahLamaran = async (req, res) => {
  try {
    const { lowongan_id } = req.body;
    const pelamar_id = req.user.id;

    // Jika kosong
    if (!lowongan_id) {
      return res.status(400).json({ pesan: "Pilih posisi yang akan dilamar!" });
    }

    const [cekLamaran] = await db.query(
      "SELECT * FROM Lamaran WHERE lowongan_id = ? AND pelamar_id = ?",
      [lowongan_id, pelamar_id],
    );

    // Jika sudah pernah melamar
    if (cekLamaran.length > 0) {
      return res.status(400).json({
        pesan: "Anda sudah melamar posisi ini!",
      });
    }

    // Kirim ke db
    const [result] = await db.query(
      "INSERT INTO Lamaran (lowongan_id, pelamar_id, status) VALUES (?, ?, ?)",
      [lowongan_id, pelamar_id, "Menunggu"],
    );

    res.status(201).json({
      pesan: "Lamaran berhasil terkirim!",
      id_baru: result.insertId,
    });
  } catch (error) {
    console.error("Gagal melamar:", error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

const getSemuaLamaran = async (req, res) => {
  try {
    // JOIN
    const query = `
            SELECT 
                Lamaran.id AS id_lamaran,
                Pelamar.nama_lengkap AS nama_pelamar,
                Lowongan.judul AS posisi_dilamar,
                Lamaran.status
            FROM Lamaran
            JOIN Pelamar ON Lamaran.pelamar_id = Pelamar.id
            JOIN Lowongan ON Lamaran.lowongan_id = Lowongan.id;
        `;

    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Gagal mengambil data lamaran:", error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

const updateStatusLamaran = async (req, res) => {
  try {
    const { id_lamaran } = req.params;
    const { status_baru } = req.body;
    const adminId = req.user.id;

    // Validasi
    const validStatus = [
      "Terikirim",
      "Diproses",
      "Wawancara",
      "Diterima",
      "Ditolak",
    ];
    if (!validStatus.includes(status_baru)) {
      return res.status(400).json({ pesan: "Status tidak valid!" });
    }

    const [cekKepemilikan] = await db.query(
      `SELECT l.id
      FROM Lamaran l
      JOIN Lowongan low ON l.lowongan_id = low.id
      WHERE l.id = ? AND low.created_by = ?`,
      [id_lamaran, adminId],
    );

    if (cekKepemilikan.length === 0) {
      return res.status(403).json({ pesan: "Anda tidak memiliki akses!" });
    }

    // Update di database
    await db.query("UPDATE Lamaran SET status = ? WHERE id = ?", [
      status_baru,
      id_lamaran,
    ]);

    res.json({ pesan: `Status lamaran ID ${id_lamaran} berhasil diubah!` });
  } catch (error) {
    console.error("Gagal mengupdate status lamaran", error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

const updateLamaran = async (req, res) => {
  try {
    // 1. Tangkap ID dari URL (misal: /api/lamaran/1)
    const lamaranId = req.params.id;

    // 2. Tangkap status baru dari body request (dari form React nanti)
    const { status } = req.body;

    // Validasi
    if (!status) {
      return res.status(400).json({ pesan: "Status baru wajib diisi!" });
    }

    // 3. Update data di database MariaDB
    const [result] = await db.query(
      "UPDATE Lamaran SET status = ? WHERE id = ?",
      [status, lamaranId],
    );

    // Cek apakah data dengan ID tersebut benar-benar ada
    if (result.affectedRows === 0) {
      return res.status(404).json({ pesan: "Data lamaran tidak ditemukan!" });
    }

    res.json({
      pesan: `Status lamaran ID ${lamaranId} berhasil diubah menjadi '${status}'`,
    });
  } catch (error) {
    console.error("Gagal mengupdate lamaran:", error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

module.exports = {
  tambahLamaran,
  getSemuaLamaran,
  updateLamaran,
  getLamaranUntukAdmin,
  updateStatusLamaran,
};
