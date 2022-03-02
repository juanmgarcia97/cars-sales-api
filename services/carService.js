const Car = require("../models/Car");
const boom = require("@hapi/boom");
const { v4 } = require("uuid");

exports.index = (req, res, next) => {
  Car.find({}, (err, cars) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!cars) res.status(400).send("Could not get the car list");
    if (cars.length === 0) res.status(400).send("There's no cars available")
    res.status(200).json(cars);
  });
};

exports.create = (req, res, next) => {
  const car = new Car(req.body);
  Car.findOne(
    { model: req.body.model, plate: req.body.plate, brand: req.body.brand },
    (err, c) => {
      if (err) res.status(400).send("Something happened, try again later");
      if (c) {
        res.status(409).send(
            "The car, " +
              req.body.brand +
              " " +
              req.body.model +
              ", is already created"
          );
      } else {
        car.carId = v4();
        car.save((error) => {
          if (error) res.status(400).send("The car could not be created");
          res
            .status(201)
            .send(
              "Car, " + req.body.brand + " " + req.body.model + ", was created"
            );
        });
      }
    }
  );
};

exports.find = (req, res, next) => {
  Car.findOne({ carId: req.params.id }, (err, car) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!car) {
      res.status(404).send("Car not found");
    }
    res.status(200).json(car);
  });
};

exports.update = (req, res, next) => {
  Car.updateOne({ _id: req.params.id }, { $set: req.body }, (err, c) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!c) {
      res.status(404).send("The car " + req.body.model + " was not found");
    }
    res.send("Car " + req.body.model + " was updated");
  });
};

exports.delete = (req, res, next) => {
  Car.findOneAndDelete({carId: req.params.id}, (err, car) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!car) {
      res.status(404).send("The car could not be deleted");
    }
    res.status(200).send("The car " + car.model + " was deleted");
  });
};
