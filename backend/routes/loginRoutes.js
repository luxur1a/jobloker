const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");
const { verify } = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

router.post("/", loginController.login);
router.get("/me", verifyToken, loginController.getProfile);

module.exports = router;
