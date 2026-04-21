const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //  Cek apakah username dan password diisi
    if (!username || !password) {
      return res
        .status(400)
        .json({ pesan: "Username dan password wajib diisi!" });
    }

    // --- CEK TABEL ADMIN ---
    const [admin] = await db.query("SELECT * FROM Admin WHERE username = ?", [
      username,
    ]);

    if (admin.length > 0) {
      const isMatch = await bcrypt.compare(password, admin[0].password);

      if (isMatch) {
        const token = jwt.sign(
          {
            id: admin[0].id,
            username: admin[0].username,
            role: "admin",
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
        );
        return res.json({
          pesan: "Login sebagai Admin!",
          token: token,
          role: "admin",
        });
      } else {
        return res.status(401).json({ pesan: "Password salah!" });
      }
    }

    // --- CEK TABEL PELAMAR ---
    const [pelamar] = await db.query(
      "SELECT * FROM Pelamar WHERE username = ?",
      [username],
    );

    if (pelamar.length > 0) {
      const isMatch = await bcrypt.compare(password, pelamar[0].password);

      if (isMatch) {
        const token = jwt.sign(
          {
            id: pelamar[0].id,
            username: pelamar[0].username,
            role: "pelamar",
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
        );
        return res.json({
          pesan: "Login sebagai Pelamar!",
          token: token,
          role: "pelamar",
        });
      } else {
        return res.status(401).json({ pesan: "Password salah!" });
      }
    }

    return res.status(401).json({ pesan: "Username tidak terdaftar!" });
  } catch (error) {
    console.error("Gagal login:", error);
    res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let query = "";
    let values = [];

    if (role === "admin") {
      query =
        "SELECT nama_perusahaan as nama_lengkap, email FROM Admin WHERE id = ?";
      values = [userId];
    } else if (role === "pelamar") {
      query = "SELECT nama_lengkap, email FROM Pelamar WHERE id = ?";
      values = [userId];
    }

    const [user] = await db.query(query, values);

    if (user.length === 0) {
      return res.status(404).json({ pesan: "User tidak ditemukan!" });
    }

    res.json(user[0]);
  } catch (error) {
    console.error("Gagal mengambil profil");
  }
};

module.exports = {
  login,
  getProfile,
};
