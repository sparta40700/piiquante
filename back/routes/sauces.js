//const Router = require("express");
const express = require("express");
//const multer = "../middleware/multer-config";
const router = express.Router();
const saucesControllers = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, saucesControllers.getAllSauces);
router.post("/", auth, multer, saucesControllers.createSauce);

//router.get("/:id", saucesControllers.login);
module.exports = router;
