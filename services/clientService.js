const Client = require("../models/Client");
const { v4 } = require("uuid");

exports.index = (req, res, next) => {
  Client.find({}, (err, clients) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!clients) res.status(400).send("Could not be get the client's list");
    if (clients.length === 0) res.status(400).send("There's no clients available")
    res.status(200).send(clients);
  });
};

exports.create = (req, res, next) => {
  const client = new Client(req.body);
  Client.findOne({ cc: req.body.cc }, (err, c) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (c) {
      res
        .status(409)
        .send(
          "The client " + c.firstname + ", with cc " + req.body.cc + ", is already created"
        );
    } else {
      client.clientId = v4();
      client.save((error) => {
        if (error) res.status(400).send("The client could not be created");
        res
          .status(201)
          .send(
            "Client " +
              req.body.firstname.concat(req.body.lastname) +
              " with id " +
              req.body.clientId +
              " was created"
          );
      });
    }
  });
};

exports.find = (req, res, next) => {
  Client.findOne({ clientId: req.params.id }, (err, client) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!client) {
      res
        .status(404)
        .send("Client with id " + req.params.id + " was not found");
    }
    res.status(200).send(client);
  });
};

exports.update = (req, res, next) => {
  Client.updateOne(
    { clientId: req.params.id },
    { $set: req.body },
    (err, c) => {
      if (err) res.status(400).send("Something happened, try again later");
      if (!c) {
        res
          .status(404)
          .send("The client with id " + req.params.id + " was not found");
      }
      res.send("Client with id " + req.params.id + " was updated");
    }
  );
};

exports.delete = (req, res, next) => {
  Client.findOneAndDelete({ clientId: req.params.id }, (err, client) => {
    if (err) res.status(400).send("Something happened, try again later");
    if (!client) {
      res.status(404).send("The client could not be deleted");
    }
    res
      .status(200)
      .send("The clientwith id " + client.clientId + " was deleted");
  });
};
