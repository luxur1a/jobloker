const bcrypt = require("bcrypt");
const db = require("../db");

const registerAdmin = async (req, res) => {
  try {
    const { nama_perusahaan, username, password, email } = req.body;

    // 1. Validasi Input (Admin hanya butuh username & password)
    if (!nama_perusahaan || !username || !password || !email) {
      return res.status(400).json({ pesan: "Form wajib diisi!" });
    }

    // 2. Cek apakah username sudah ada di tabel Admin
    const [cekAdmin] = await db.query(
      "SELECT * FROM Admin WHERE username = ?",
      [username],
    );
    if (cekAdmin.length > 0) {
      return res.status(400).json({
        pesan: "Username sudah terdaftar, silakan gunakan yang lain.",
      });
    }

    // 3. Masukkan password ke dalam "blender" (Hashing)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan ke database Admin
    await db.query(
      "INSERT INTO Admin (nama_perusahaan, username, password, email) VALUES (?, ?, ?, ?)",
      [nama_perusahaan, username, hashedPassword, email],
    );

    res.status(201).json({ pesan: "Akun HRD berhasil didaftarkan!" });
  } catch (error) {
    console.error("Gagal register admin:", error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

module.exports = { registerAdmin };
