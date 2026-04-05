const jwt = require("jsonwebtoken");

// Ini adalah fungsi Satpam kita
const verifyToken = (req, res, next) => {
  // 1. Satpam meminta tiket dari tamu (membaca header 'Authorization')
  const authHeader = req.headers["authorization"];

  // Biasanya format tiket web adalah "Bearer nama_tokennya_disini"
  // Jadi kita pisahkan kata "Bearer" dan ambil tokennya saja
  const token = authHeader && authHeader.split(" ")[1];

  // 2. Jika tamu tidak bawa tiket sama sekali
  if (!token) {
    return res
      .status(401)
      .json({ pesan: "Akses ditolak! Anda tidak punya tiket (Token)." });
  }

  try {
    // 3. Satpam mengecek keaslian tiket menggunakan "Stempel Rahasia" di .env
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Jika asli, catat nama tamunya, lalu izinkan masuk (next)
    req.user = verified;
    next();
  } catch (error) {
    // Jika tiketnya palsu atau sudah kedaluwarsa (lebih dari 1 jam)
    res
      .status(403)
      .json({ pesan: "Tiket tidak valid atau sudah kedaluwarsa!" });
  }
};

module.exports = verifyToken;
