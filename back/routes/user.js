const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");

router.post("/signup", userControllers.userSignup);
module.exports = router;
