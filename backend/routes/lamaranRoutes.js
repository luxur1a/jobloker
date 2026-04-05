const express = require("express");
const router = express.Router();

// Panggil koki dan satpam yang dibutuhkan
const lamaranController = require("../controllers/lamaranController");

// Daftarkan rutenya di sini (Perhatikan betapa rapinya ini!)
router.get("/", lamaranController.getSemuaLamaran);
router.put("/", lamaranController.updateLamaran);
module.exports = router;
