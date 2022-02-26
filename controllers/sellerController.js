const Seller = require("../models/Seller");
const boom = require("@hapi/boom");

exports.index = (req, res, next) => {
  Seller.find({}, (err, sellers) => {
    if (err) throw Error();
    if (!sellers) throw boom.badRequest("Could not get the seller's list");
    res.status(200).send(sellers);
  });
};

exports.create = (req, res, next) => {
  const seller = new Seller(req.body);
  Seller.findOne({ cc: req.body.cc }, (err, s) => {
    if (err) throw Error();
    if (s) {
      throw boom.conflict(
        "The seller, with cc " + req.body.cc + ", is already created"
      );
    } else {
      seller.save((error) => {
        if (error) throw Error();
        res.status(201).send("Seller " + req.body.name + " was created");
      });
    }
  });
};

exports.find = (req, res, next) => {
  Seller.findOne({ _id: req.params.id }, (err, seller) => {
    if (err) throw Error();
    if (!seller) {
      throw boom.notFound("Seller not found");
    }
    res.status(200).send(seller);
  });
};

exports.update = (req, res, next) => {
  Seller.updateOne(
    { _id: req.params.id },
    { $set: req.body },
    (err, seller) => {
      if (err) throw Error();
      if (!seller) {
        throw boom.notFound(
          "The seller, with cc " + req.body.cc + ", was not found"
        );
      }
      res.send("Seller " + req.body.name + " was updated");
    }
  );
};

exports.delete = (req, res, next) => {
  Seller.findByIdAndDelete(req.params.id, (err, seller) => {
    if (err) throw Error();
    if (!seller) {
      throw boom.notFound("The seller could not be deleted");
    }
    res.status(200).send("The seller " + seller.name + " was deleted");
  });
};
