const express = require("express");
const router = express.Router();

// Panggil koki dan satpam yang dibutuhkan
const lowonganController = require("../controllers/lowonganController");
const verifyToken = require("../middleware/auth");

// Daftarkan rutenya di sini (Perhatikan betapa rapinya ini!)
router.get("/", lowonganController.getSemuaLowongan);
router.post("/", verifyToken, lowonganController.tambahLowongan);
router.delete("/:id", verifyToken, lowonganController.hapusLowongan);

module.exports = router;
