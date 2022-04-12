const { application } = require("express");
const { get } = require("mongoose");
const sauces = require("../models/sauces");
const { put } = require("../routes/sauces");

exports.getAllSauces = (req, res, next) => {
  console.log("route des sauces");
  sauces
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error: message }));
};
exports.putSauce = (req, res, next) => {
  console.log("route putSauce");
  sauces
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          manufacturer: req.body.manufacturer,
          description: req.body.description,
          mainPepper: req.body.mainPepper,
          imageUrl: req.body.imageUrl,
          heat: req.body.heat,
          likes: req.body.likes,
          dislikes: req.body.dislikes,
        },
      },
      { new: true }
    )
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error: message }));
};

exports.createSauce = (req, res, next) => {
  console.log(req.body.sauce);
  console.log(req.body.userId);
  console.log(req.userId);
  console.log("req.file", req.file.filename);
  const sauceParse = JSON.parse(req.body.sauce);
  const sauce = new sauces({
    ...sauceParse,
    imageUrl: "http://localhost:3000/images/" + req.file.filename,
    likes: 0,
    dislikes: 0,
    //userId: req.body.userId,
  });
  console.log(sauce);
  sauce
    .save()
    .then((sauce) => res.status(201).json(sauce))
    .catch((error) => console.log(error));
};
exports.get = (req, res, next) => {
  console.log("route get");
  sauces
    .findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error: message }));
};

exports.deleteSauce = (req, res, next) => {
  console.log("route delete sauce");
  console.log(req.params.id);
  sauces

    .findByIdAndDelete(req.params.id)
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};
exports.likes = (req, res, next) => {
  console.log("route likes");
  console.log(req.params.id);
  console.log(req.body.userId);
  console.log(req.userId);
  sauces
    .findById(req.params.id)
    .then((sauce) => {
      if (sauce.userId.toString() === req.body.userId) {
        return res
          .status(401)
          .json({ error: "Vous ne pouvez pas liker votre sauce !" });
      }
      sauce.likes = sauce.likes + 1;
      sauce
        .save()
        .then((sauce) => res.status(201).json(sauce))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.dislikes = (req, res, next) => {
  console.log("route dislikes");
  console.log(req.params.id);
  console.log(req.body.userId);
  console.log(req.userId);
  sauces
    .findById(req.params.id)
    .then((sauce) => {
      if (sauce.userId.toString() === req.body.userId) {
        return res
          .status(401)
          .json({ error: "Vous ne pouvez pas disliker votre sauce !" });
      }
      sauce.dislikes = sauce.dislikes + 1;
      sauce
        .save()
        .then((sauce) => res.status(201).json(sauce))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.updateSauce = (req, res, next) => {
  console.log("route update sauce");
  console.log(req.params.id);
  console.log(req.body.sauce);
  const sauceParse = JSON.parse(req.body.sauce);
  sauces
    .findByIdAndUpdate(req.params.id, { ...sauceParse })
    .then((sauce) => res.status(201).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};
exports.getOneSauce = (req, res, next) => {
  console.log("route get one sauce");
  console.log(req.params.id);
  sauces
    .findById(req.params.id)
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};
exports.getOneSauceByUser = (req, res, next) => {
  console.log("route get one sauce by user");
  console.log(req.params.id);
  sauces
    .find({ userId: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};
exports.getOneSauceByName = (req, res, next) => {
  console.log("route get one sauce by name");
  console.log(req.params.name);
  sauces
    .find({ name: req.params.name })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};
exports.getOneSauceByNameAndUser = (req, res, next) => {
  console.log("route get one sauce by name and user");
  console.log(req.params.name);
  console.log(req.params.userId);
  sauces
    .find({ name: req.params.name, userId: req.params.userId })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};
exports.getOneSauceByNameAndUserAndId = (req, res, next) => {
  console.log("route get one sauce by name and user and id");
  console.log(req.params.name);
  console.log(req.params.userId);
  console.log(req.params.id);
  sauces
    .find({
      name: req.params.name,
      userId: req.params.userId,
      _id: req.params.id,
    })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};
exports.getAllSauces = (req, res, next) => {
  console.log("route get all sauces");
  sauces
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
module.exports = exports;
