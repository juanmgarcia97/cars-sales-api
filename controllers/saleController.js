const Sale = require("../models/Sale");

exports.index = (req, res, next) => {
  Sale.find({}, (err, sales) => {
    if (err) return res.status(400).send("Could not be get the sale's list");
    res.status(200).send(sales);
  });
};

exports.create = (req, res, next) => {
  const sale = new Sale(req.body);
  Sale.findOne({ car: req.body.car }, (err, s) => {
    if (s) {
      res.status(409).send("The car " + req.body.car + ", was already sold");
    } else {
      sale.date = new Date();
      sale.save((error) => {
        if (error) return next();
        res.status(201).send("Car " + req.body.car + " was sold");
      });
    }
  });
};

exports.findBySeller = (req, res, next) => {
  Sale.find({ seller: req.params.seller }, (err, sale) => {
    if (err) {
      return res.status(404).send("Sale not found");
    }
    if (sale.length > 0) {
      res.status(200).send(sale);
    } else {
      return res
        .status(404)
        .send("There's not sales for the seller " + req.params.seller);
    }
  });
};

exports.findByClient = (req, res, next) => {
  Sale.find({ client: req.params.client }, (err, sale) => {
    if (err) {
      return res.status(404).send("Sale not found");
    }
    if (sale.length > 0) {
      res.status(200).send(sale);
    } else {
      return res
        .status(404)
        .send("There's not sales for the client " + req.params.client);
    }
  });
};

exports.update = (req, res, next) => {
  Sale.updateOne({ _id: req.params.id }, { $set: req.body }, (err, sale) => {
    if (err) {
      return res
        .status(404)
        .send("The sale " + req.params.id + " was not found");
    }
    res.send("Sale " + req.params.id + " was updated");
  });
};

exports.delete = (req, res, next) => {
  Sale.findByIdAndDelete(req.params.id, (err, sale) => {
    if (err) {
      return res.status(404).send("The sale could not be deleted");
    }
    res.status(200).send("The sale " + sale.model + " was deleted");
  });
};

exports.filterDate = (req, res, next) => {
  Sale.find({}, {}, { sort: { date: -1 } }, (err, sales) => {
    if (err) {
      return res.status(400).send("The sale's list could not be sorted");
    }
    res.status(200).send(sales);
  });
};
