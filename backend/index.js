// require mengambil alat dari library
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
// Mengambil PORT dari .env, atau gunakan 5000 jika tidak ada
const port = process.env.PORT || 5000;

// === MIDDLEWARE ===
// Mengizinkan aplikasi React (yang nanti beda port) untuk mengambil data
app.use(cors());
// Mengizinkan Express untuk membaca data yang dikirim dalam format JSON
app.use(express.json());

// --- IMPORT ROUTES ---
const lowonganRoutes = require("./routes/lowonganRoutes");
const lamaranRoutes = require("./routes/lamaranRoutes");
const loginRoutes = require("./routes/loginRoutes");
const registerAdminRoutes = require("./routes/registerAdminRoutes");
const registerPelamarRoutes = require("./routes/registerPelamarRoutes");

// --- GUNAKAN ROUTES ---
app.use("/api/lowongan", lowonganRoutes);
app.use("/api/lamaran", lamaranRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/register-pelamar", registerPelamarRoutes);
app.use("/api/register-admin", registerAdminRoutes);

// === MENYALAKAN SERVER ===
app.listen(port, () => {
  console.log(`Server Express menyala di http://localhost:${port}`);
});
