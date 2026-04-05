const bcrypt = require("bcrypt");
const db = require("../db");

const registerPelamar = async (req, res) => {
  try {
    const { username, password, nama_lengkap, email } = req.body;

    // 1. Cek apakah ada data yang kosong
    if (!username || !password || !nama_lengkap || !email) {
      return res.status(400).json({ pesan: "Semua kolom wajib diisi!" });
    }

    // 2. Cek apakah username sudah dipakai orang lain
    const [cekUser] = await db.query(
      "SELECT * FROM Pelamar WHERE username = ?",
      [username],
    );
    if (cekUser.length > 0) {
      return res
        .status(400)
        .json({ pesan: "Username sudah terdaftar, pilih yang lain!" });
    }

    // 3. Masukkan password ke dalam "blender" (Hashing)
    // Angka 10 adalah tingkat putaran blendernya (semakin tinggi semakin aman, tapi lebih lambat)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan ke database Pelamar dengan password yang sudah hancur (hashed)
    await db.query(
      "INSERT INTO Pelamar (username, password, nama_lengkap, email) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, nama_lengkap, email],
    );

    res
      .status(201)
      .json({ pesan: "Akun pelamar berhasil dibuat! Silakan login." });
  } catch (error) {
    console.error("Gagal register:", error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

module.exports = { registerPelamar };
