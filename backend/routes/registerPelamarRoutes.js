const express = require("express");
const router = express.Router();

const registerPelamarController = require("../controllers/registerPelamarController");

router.post("/", registerPelamarController.registerPelamar);

module.exports = router;
