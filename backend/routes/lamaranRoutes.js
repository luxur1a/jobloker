const express = require("express");
const router = express.Router();

// Panggil koki dan satpam yang dibutuhkan
const lamaranController = require("../controllers/lamaranController");
const verifyToken = require("../middleware/auth");

// Daftarkan rutenya di sini (Perhatikan betapa rapinya ini!)
router.get("/", lamaranController.getSemuaLamaran);
router.put("/", lamaranController.updateLamaran);
router.post("/", verifyToken, lamaranController.tambahLamaran);

module.exports = router;
