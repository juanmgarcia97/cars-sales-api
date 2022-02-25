const Client = require("../models/Client");

exports.index = (req, res, next) => {
    Client.find({}, (err, clients) => {
        if (err) return res.status(400).send("Could not be get the client's list");
        res.status(200).send(clients);
    });
};

exports.create = (req, res, next) => {
    const client = new Client(req.body);
    Client.findOne({ cc: req.body.cc }, (err, c) => {
        if (c) {
            res.status(409).send("The client, with cc " + req.body.cc + ", is already created");
        } else {
            client.save((error) => {
                if (error) return next();
                res.status(201).send("Client " + req.body.name + " was created");
            });
        }
    });
};

exports.find = (req, res, next) => {
    Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(404).send("Client not found");
        }
        res.status(200).send(client);
    });
};

exports.update = (req, res, next) => {
    Client.updateOne({ _id: req.params.id }, { $set: req.body }, (err, c) => {
        if (err) {
            return res.status(404).send("The client " + req.body.name + " was not found");
        }
        res.send("Client " + req.body.name + " was updated");
    });
};

exports.delete = (req, res, next) => {
    Client.findByIdAndDelete(req.params.id, (err, client) => {
        if (err) {
            return res.status(404).send("The client could not be deleted");
        }
        res.status(200).send("The client " + client.name + " was deleted");
    });
};
