const express = require("express");
const router = express.Router();

// Panggil koki dan satpam yang dibutuhkan
const lamaranController = require("../controllers/lamaranController");
const verifyToken = require("../middleware/auth");

// Daftarkan rutenya di sini (Perhatikan betapa rapinya ini!)
router.get("/lamaran/", verifyToken, lamaranController.getLamaranUntukAdmin);
router.put(
  "/lamaran/:id_lamaran",
  verifyToken,
  lamaranController.updateStatusLamaran,
);

module.exports = router;
