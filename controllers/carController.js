const Car = require("../models/Car");

exports.index = (req, res, next) => {
  Car.find({}, (err, cars) => {
    if (err) return res.status(404).send("Could not get the car list");
    res.status(200).send(cars);
  });
};

exports.create = (req, res, next) => {
  const car = new Car(req.body);
  Car.findOne({ model: req.body.model }, (err, c) => {
    if (c) {
      res.status(409).send("The car " + req.body.model + " is already created");
    } else {
      car.save((error) => {
        if (error) return next();
        res.status(201).send("Car " + req.body.model + " was created");
      });
    }
  });
};

exports.find = (req, res, next) => {
  Car.findOne({ _id: req.params.id }, (err, car) => {
    if (err) {
      return res.status(404).send("Car not found");
    }
    // console.log(car)
    res.status(200).send(car);
  });
};

exports.update = (req, res, next) => {
  Car.updateOne({ _id: req.params.id }, { $set: req.body }, (err, c) => {
    if (err) {
      return res.status(404).send("The car " + req.body.model + " was not found");
      //   return next()
    }
    res.send("Car " + req.body.model + " was updated");
  });
};

exports.delete = (req, res, next) => {
  Car.findByIdAndDelete(req.params.id, (err, car) => {
    if (err) {
      return res.status(404).send("The car could not be deleted");
    }
    res.status(200).send("The car " + car.model + " was deleted");
  });
};
