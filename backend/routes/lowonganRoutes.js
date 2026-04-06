const express = require("express");
const router = express.Router();

const lowonganController = require("../controllers/lowonganController");
const verifyToken = require("../middleware/auth");

// Daftarkan rute
router.get("/", lowonganController.getSemuaLowongan);
router.post("/", verifyToken, lowonganController.tambahLowongan);
router.delete("/:id", verifyToken, lowonganController.hapusLowongan);

module.exports = router;
