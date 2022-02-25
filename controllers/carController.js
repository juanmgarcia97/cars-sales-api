const Car = require("../models/Car");

exports.index = (req, res, next) => {
  Car.findOne({}, (err, cars) => {
    if (err) return next();
    res.send(cars);
  });
};

exports.create = async (req, res, next) => {
  const car = new Car(req.body);
  Car.findOne({ model: req.body.model }, (err, findedCar) => {
    if (err) {
      car.save((error) => {
        if (error) return next();
        res.send("New car created");
      });
    } else {
        res.status(409).send("The car " + findedCar["model"] + " is already created")
    }
  });

};

exports.find = (req, res, next) => {
  Car.findOne({ _id: req.params.id }, (err, car) => {
      if(err) {
          res.status(404).send("Car not found")
      }
      res.status(200).send(car)
  });
};

exports.delete = (req, res, next) => {
    Car.findOneAndDelete({_id: req.params.id}, )
}
