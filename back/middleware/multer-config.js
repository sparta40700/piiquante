const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    console.log(file);
    //const name = file.originalname.split(" ").join("_");
    const name = file.originalname.split(".").join("_");
    console.log(name);
    const extension = MIME_TYPES[file.mimetype];
    console.log(name + Date.now() + "." + extension);
    callback(null, name[0] + Date.now() + "." + extension);
    //callback(null, name + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
