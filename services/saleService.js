const Sale = require("../models/Sale");
const {v4} = require("uuid");
const Seller = require("../models/Seller");
const Car = require("../models/Car");
const Client = require("../models/Client");

exports.index = (req, res, next) => {
  Sale.find({}, (err, sales) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!sales) res.status(400).send("Could not be get the sale's list");
    if (sales.length === 0) res.status(400).send("There's no sales available")
    res.status(200).send(sales);
  });
};

exports.create = (req, res, next) => {
  const sale = new Sale(req.body);
  Sale.findOne({ car: req.body.car, client: req.body.client, seller: req.body.seller }, async (err, s) => {
    if (err) res.status(400).send("Something happened, try again later");
    const car = await Car.findOne({carId: req.body.car}, (err, car) => {
      if (err) res.status(400).send("Something happened, try again later");
      if (!car) res.status(404).send("Car does not exists")
      const client = Client.findOne({clientId: req.body.client}, (err, client) => {
        if (err) res.status(400).send("Something happened, try again later");
        if (!client) res.status(404).send("Client does not exists")
        const seller = Seller.findOne({sellerId: req.body.seller}, (err, seller) => {
          if (err) res.status(400).send("Something happened, try again later");
          if (!seller) res.status(404).send("Seller does not exists")
          if (s) {
            return res.status(409).send("The car, " + req.body.car + ", was already sold");
          } else if (car != null && client != null && seller != null) {
            sale.saleId = v4()
            sale.date = new Date();
            sale.client = client
            sale.seller = seller
            sale.car = car
            sale.save((error) => {
              if (error) res.status(400).send("Something happened, try again later");
              res.status(201).send("Car, " + req.body.car + ", was sold to client " + req.body.client);
            });
          }
        })
      })
    })
  });
};

exports.find = (req, res, next) => {
  Sale.findOne({ saleId: req.params.id }, (err, sale) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!sale) {
      res.status(404).send("Sale not found");
    }
    res.status(200).json(sale);
  });
};

exports.findBySeller = (req, res, next) => {
  Sale.find({ seller: req.params.seller }, (err, sale) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!sale) {
      res.status(404).send("Sale not found");
    }
    if (sale.length > 0) {
      res.status(200).json(sale);
    } else {
      res.status(404).send(
        "There's not sales for the seller " + req.params.seller
      );
    }
  });
};

exports.findByClient = (req, res, next) => {
  Sale.find({ client: req.params.client }, (err, sale) => {
    if (err) throw Error();
    if (!sale) {
      res.status(404).send("Sale not found");
    }
    if (sale.length > 0) {
      res.status(200).send(sale);
    } else {
      res.status(404).send(
        "There's not sales for the client " + req.params.client
      );
    }
  });
};

exports.update = (req, res, next) => {
  Sale.updateOne({ _id: req.params.id }, { $set: req.body }, (err, sale) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!sale) {
      res.status(404).send("The sale " + req.params.id + " was not found");
    }
    res.send("Sale " + req.params.id + " was updated");
  });
};

exports.delete = (req, res, next) => {
  Sale.findByIdAndDelete(req.params.id, (err, sale) => {
    if (err) throw Error();
    if (!sale) {
      res.status(404).send("The sale could not be deleted");
    }
    res.status(200).send("The sale " + sale.model + " was deleted");
  });
};

exports.filterDate = (req, res, next) => {
  Sale.find({}, {}, { sort: { date: -1 } }, (err, sales) => {
    if (err) throw Error();
    if (!sales) {
      res.status(400).send("The sale's list could not be sorted");
    }
    res.status(200).send(sales);
  });
};
