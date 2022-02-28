const Sale = require("../models/Sale");
const boom = require("@hapi/boom");
const Seller = require("../models/Seller");

exports.index = (req, res, next) => {
  Sale.find({}, (err, sales) => {
    if (err) throw Error();
    if (!sales) throw boom.badRequest("Could not be get the sale's list");
    res.status(200).send(sales);
  });
};

exports.create = (req, res, next) => {
  const sale = new Sale(req.body);
  Sale.findOne({ car: req.body.car }, (err, s) => {
    if (err) throw Error();
    if (s) {
      return res.status(409).send("The car, " + req.body.brand + " " + req.body.car + ", was already sold");
    } else {
      sale.date = new Date();
      sale.save((error) => {
        if (error) throw Error();
        res.status(201).send("Car, " + req.body.brand + " " + req.body.car + ", was sold");
      });
    }
  });
};

exports.find = (req, res, next) => {
  Seller.findOne({ _id: req.params.id }, (err, sale) => {
    if (err) throw Error();
    if (!sale) {
      throw boom.notFound("Sale not found");
    }
    res.status(200).send(sale);
  });
};

exports.findBySeller = (req, res, next) => {
  Sale.find({ seller: req.params.seller }, (err, sale) => {
    if (err) throw Error();
    if (!sale) {
      throw boom.notFound("Sale not found");
    }
    if (sale.length > 0) {
      res.status(200).send(sale);
    } else {
      throw boom.notFound(
        "There's not sales for the seller " + req.params.seller
      );
    }
  });
};

exports.findByClient = (req, res, next) => {
  Sale.find({ client: req.params.client }, (err, sale) => {
    if (err) throw Error();
    if (!sale) {
      throw boom.notFound("Sale not found");
    }
    if (sale.length > 0) {
      res.status(200).send(sale);
    } else {
      throw boom.notFound(
        "There's not sales for the client " + req.params.client
      );
    }
  });
};

exports.update = (req, res, next) => {
  Sale.updateOne({ _id: req.params.id }, { $set: req.body }, (err, sale) => {
    if (err) throw Error();
    if (!sale) {
      throw boom.notFound("The sale " + req.params.id + " was not found");
    }
    res.send("Sale " + req.params.id + " was updated");
  });
};

exports.delete = (req, res, next) => {
  Sale.findByIdAndDelete(req.params.id, (err, sale) => {
    if (err) throw Error();
    if (!sale) {
      throw boom.notFound("The sale could not be deleted");
    }
    res.status(200).send("The sale " + sale.model + " was deleted");
  });
};

exports.filterDate = (req, res, next) => {
  Sale.find({}, {}, { sort: { date: -1 } }, (err, sales) => {
    if (err) throw Error();
    if (!sales) {
      throw boom.badRequest("The sale's list could not be sorted");
    }
    res.status(200).send(sales);
  });
};
