const { where } = require("sequelize");
const db = require("../models");
const Videogame = db.videogames;
const Op = db.Sequelize.Op;

//Create and Save a new videogame
exports.create = (req, res) => {
    //Validate request
    if (!req.body.title || !req.body.genre || !req.body.developer ||
    !req.body.price || !req.body.description || !req.body.requirements) {
    res.status(400).send({
        message: "All fields must be provided!"
    });
    return;
    }

    /*
    if (!req.body.title){
        res.status(400).send({
        message: "Content can not be empty!"
       });
       return;
    }
    */

    //Create a videogame
    const videogame = {
        title: req.body.title,
        genre: req.body.genre,
        developer: req.body.developer,
        price: req.body.price,
        description: req.body.description,
        requirements: req.body.requirements
    };

    //Save videogame in the database
    Videogame.create(videogame)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while creating the videogame."
            });
        });
};

//Retrieve all videogames from the database
exports.findAll = (req, res) => {
    Videogame.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving videogames."
            });
        });
};

//Find a single videogame with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Videogame.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Videogame with id=${id} not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving videogame with id=${id}`
            });
        });
};

//Update a videogame by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    //Verifies the body of the request is not empty
    if (!req.body || Object.keys(req.body).length === 0){
        return res.status(400).send({
            message: "Request body cannot be empty!"
        });
    }

    Videogame.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Videogame was updated succesfully."
            });
        } else {
            res.status(404).send({
                message: `Cannot update videogame with id=${id}. Maybe videogame was not found or request body is empty`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error updating videogame with id=${id}`
        });
    });
};

//Delete a videogame with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Videogame.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num === 1) {
            res.send({
                message: "Videogame was deleted succesfully!"
            });
        } else {
            res.status(404).send({
                message: `Bicycle with id=${id} not found.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Could not delete videogame with id=${id}`
        });
    });
};