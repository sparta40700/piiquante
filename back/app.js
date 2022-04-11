const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const saucesRouter = require("./routes/sauces");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://sparta40:dragon405001@piquante.wttud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error .."));
db.once("open", function (e) {
  console.log("database connected");
});

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/api/auth", userRouter);
app.use("/api/sauces", saucesRouter);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
