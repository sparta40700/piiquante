const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.userSignup = (req, res, next) => {
  console.log("je suis sur la route d'inscription");
  /*bcrypt.hash(req.body.password, 10).then((hash) => {
    console.log(hash);
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => res.status(200).json({ message: "utilisateur créer" }))
      .catch((error) => res.status(400).json({ error }));
  });*/
  console.log(req.body);
  next();
};
exports.login = (req, res, next) => {};
