const Router = require("express");
const express = require("express");
//const multer = require("multer");
const router = express.Router();
const userControllers = require("../controllers/user");
//const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");

router.post("/signup", userControllers.userSignup);
router.post("/login", userControllers.login);
module.exports = router;
