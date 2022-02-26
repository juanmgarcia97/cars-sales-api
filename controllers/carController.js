const Car = require("../models/Car");
const boom = require("@hapi/boom");

exports.index = (req, res, next) => {
  Car.find({}, (err, cars) => {
    if (err) throw Error();
    if (!cars) throw boom.badRequest("Could not get the car list");
    res.status(200).send(cars);
  });
};

exports.create = (req, res, next) => {
  const car = new Car(req.body);
  Car.findOne({ model: req.body.model }, (err, c) => {
    if (err) throw Error();
    if (c) {
      throw boom.conflict("The car " + req.body.model + " is already created");
    } else {
      car.save((error) => {
        if (error) throw boom.badRequest("The car could not be created");
        res.status(201).send("Car " + req.body.model + " was created");
      });
    }
  });
};

exports.find = (req, res, next) => {
  Car.findOne({ _id: req.params.id }, (err, car) => {
    if (err) throw Error();
    if (!car) {
      throw boom.notFound("Car not found");
    }
    res.status(200).send(car);
  });
};

exports.update = (req, res, next) => {
  Car.updateOne({ _id: req.params.id }, { $set: req.body }, (err, c) => {
    if (err) throw Error();
    if (!c) {
      throw boom.notFound("The car " + req.body.model + " was not found");
    }
    res.send("Car " + req.body.model + " was updated");
  });
};

exports.delete = (req, res, next) => {
  Car.findByIdAndDelete(req.params.id, (err, car) => {
    if (err) throw Error();
    if (!car) {
      throw boom.notFound("The car could not be deleted");
    }
    res.status(200).send("The car " + car.model + " was deleted");
  });
};
