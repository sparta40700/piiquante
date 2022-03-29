const { application } = require("express");
const { get } = require("mongoose");
const sauces = require("../models/sauces");

exports.getAllSauces = (req, res, next) => {
  console.log("route des sauces");
  sauces
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error: message }));
};

exports.createSauce = (req, res, next) => {
  console.log(req.body);
  console.log("req.file", req.file);
  const sauce = new sauces({
    ...req.body,
    imageUrl: "http://localhost:3000/images/" + req.file.filename,
    userId: req.userId,
  });
  console.log(sauce);
  sauce
    .save()
    .then((sauce) => res.status(201).json(sauce))
    .catch((error) => console.log(error));
};
/*exports.get("/api/sauces", (req, res, next) => {
  console.log("route des sauces");
  sauces
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
});*/
