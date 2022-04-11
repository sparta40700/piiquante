//const Router = require("express");
const express = require("express");
//const multer = "../middleware/multer-config";
const router = express.Router();
const saucesControllers = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, saucesControllers.getAllSauces);
router.post("/", auth, multer, saucesControllers.createSauce);
router.delete("/:id", auth, saucesControllers.deleteSauce);
router.put("/:id", auth, multer, saucesControllers.modifySauce);
router.post("/:id/like", auth, saucesControllers.likeSauce);
router.post("/:id/dislike", auth, saucesControllers.dislikeSauce);

//router.get("/:id", saucesControllers.login);
module.exports = router;
