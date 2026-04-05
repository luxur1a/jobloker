// require mengambil alat dari library
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const verifyToken = require("./middleware/auth");

const app = express();
// Mengambil PORT dari .env, atau gunakan 5000 jika tidak ada
const port = process.env.PORT || 5000;

// === MIDDLEWARE ===
// Mengizinkan aplikasi React (yang nanti beda port) untuk mengambil data
app.use(cors());
// Mengizinkan Express untuk membaca data yang dikirim dalam format JSON
app.use(express.json());

// --- IMPORT ROUTES DI SINI ---
const lowonganRoutes = require("./routes/lowonganRoutes");
const lamaranRoutes = require("./routes/lamaranRoutes");
const loginRoutes = require("./routes/loginRoutes");

// --- GUNAKAN ROUTES ---
app.use("/api/lowongan", lowonganRoutes);
app.use("/api/lamaran", lamaranRoutes);
app.use("/api/login", loginRoutes);

const { registerAdmin } = require("./controllers/registerAdminController");
app.post("/api/register-admin", registerAdmin);

const { registerPelamar } = require("./controllers/registerController");
app.post("/api/register", registerPelamar);

const { tambahLamaran } = require("./controllers/lamaranController");
app.post("/api/lamaran", verifyToken, tambahLamaran);

// === MENYALAKAN SERVER ===
app.listen(port, () => {
  console.log(`Server Express menyala di http://localhost:${port}`);
});
