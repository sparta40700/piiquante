const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

const schema = new passwordValidator();
// password validation
exports.form = [
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 5 })
    .withMessage("password must be minimum 5 length")
    .matches(/(?=.*?[A-Z])/)
    .withMessage("At least one Uppercase")
    .matches(/(?=.*?[a-z])/)
    .withMessage("At least one Lowercase")
    .matches(/(?=.*?[0-9])/)
    .withMessage("At least one Number")
    .matches(/(?=.*?[#?!@$%^&*-])/)
    .withMessage("At least one special character")
    .not()
    .matches(/^$|\s+/)
    .withMessage("White space not allowed"),
  // confirm password validation
  check("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password Confirmation does not match password");
      }
      return true;
    })
    .withMessage("Password Confirmation does not match password"),
  // email validation
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Email is invalid"),
];

exports.userSignup = (req, res, next) => {
  console.log("je suis sur la route d'inscription");
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(200).json({ message: "utilisateur créer" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  console.log("route login");
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "iughgu48U9ughou", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getUser = (req, res, next) => {
  console.log("route getUser");
  User.findOne({ _id: req.body.userId })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign({ userId: user._id }, "iughgu48U9ughou", {
          expiresIn: "24h",
        }),
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.UpdateUser = (req, res, next) => {
  console.log("route UpdateUser");
  User.findOne({ _id: req.body.userId })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      user.email = req.body.email;
      user.password = req.body.password;
      user
        .save()
        .then(() => res.status(200).json({ message: "utilisateur modifié" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.DeleteUser = (req, res, next) => {
  console.log("route DeleteUser");
  User.findOne({ _id: req.body.userId })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      user
        .delete()
        .then(() => res.status(200).json({ message: "utilisateur supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getAllUsers = (req, res, next) => {
  console.log("route getAllUsers");
  User.find()
    .then((users) => {
      if (!users) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json({
        users,
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getUserById = (req, res, next) => {
  console.log("route getUserById");
  User.findOne({ _id: req.body.userId })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json({
        user,
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getUserByEmail = (req, res, next) => {
  console.log("route getUserByEmail");
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json({
        user,
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getUserByPassword = (req, res, next) => {
  console.log("route getUserByPassword");
  User.findOne({ password: req.body.password })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json({
        user,
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getUserByEmailAndPassword = (req, res, next) => {
  console.log("route getUserByEmailAndPassword");
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json({
        user,
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getUserByEmailAndPasswordAndId = (req, res, next) => {
  console.log("route getUserByEmailAndPasswordAndId");
  User.findOne({
    email: req.body.email,
    password: req.body.password,
    _id: req.body.userId,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      res.status(200).json({
        user,
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports = exports;

//login, userSignup, getUser, UpdateUser, DeleteUser, getAllUsers;
