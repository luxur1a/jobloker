const express = require("express");
const router = express.Router();

const registerAdminController = require("../controllers/registerAdminController");
const verifyToken = require("../middleware/auth");

router.post("/", registerAdminController.registerAdmin);

module.exports = router;
