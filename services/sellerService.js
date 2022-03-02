const Seller = require("../models/Seller");
const { v4 } = require("uuid");

exports.index = (req, res, next) => {
  Seller.find({}, (err, sellers) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!sellers) res.status(400).send("Could not get the seller's list");
    if (sellers.length === 0)
      res.status(400).send("There's no sellers available");
    res.status(200).send(sellers);
  });
};

exports.create = (req, res, next) => {
  const seller = new Seller(req.body);
  Seller.findOne({ cc: req.body.cc }, (err, s) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (s) {
      res
        .status(409)
        .send(
          "The seller " +
            s.firstname +
            ", with cc " +
            req.body.cc +
            ", is already created"
        );
    } else {
      seller.sellerId = v4();
      seller.save((error) => {
        if (error) res.status(400).send("Something happened, try again later");
        res.status(201).send("Seller " + req.body.firstname + " was created");
      });
    }
  });
};

exports.find = (req, res, next) => {
  Seller.findOne({ cc: req.params.cc }, (err, seller) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!seller) {
      res
        .status(404)
        .send("Seller with id " + req.params.cc + " was not found");
    }
    res.status(200).json(seller);
  });
};

exports.update = (req, res, next) => {
  Seller.updateOne(
    { sellerId: req.params.id },
    { $set: req.body },
    (err, seller) => {
      if (err) res.status(400).send("Something happened, try again later");
      if (!seller) {
        res
          .status(404)
          .send(
            "The seller " +
              req.body.firstname +
              ", with cc " +
              req.body.cc +
              ", was not found"
          );
      }
      res.send(
        "Seller " +
          req.body.firstname +
          " with id " +
          req.params.id +
          " was updated"
      );
    }
  );
};

exports.delete = (req, res, next) => {
  Seller.findOneAndDelete({ sellerId: req.params.id }, (err, seller) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!seller) {
      res
        .status(404)
        .send("The seller with id " + req.params.id + " could not be deleted");
    }
    res
      .status(200)
      .send("The seller with id " + seller.sellerId + " was deleted");
  });
};
