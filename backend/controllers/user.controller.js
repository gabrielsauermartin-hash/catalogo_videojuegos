const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const utils = require("../utils");
const bcrypt = require('bcryptjs');

//create and save a new user
exports.create = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const isAdmin = req.body.isAdmin ? req.body.isAdmin : false;

    // Validar que username y password existen
    if (!username) {
        return res.status(400).send({ message: "username is not defined" });
    }
    if (!password) {
        return res.status(400).send({ message: "password is not defined" });
    }

    console.log(req.body);

    //create a user
    let user = {
        username: username,
        password: password,
        name: name,
        isAdmin: isAdmin
    };

    User.findOne({ where: { username: user.username } })
        .then(data => {
            if (data) {
                const result = bcrypt.compareSync(user.password, data.password);
                if (!result) {
                    return res.status(401).send('Password not valid');
                }
                const token = utils.generateToken(data);
                //get basic user details
                const userObj = utils.getCleanUser(data);
                //return the token along with user details
                return res.json({ user: userObj, access_token: token });
            }

            user.password = bcrypt.hashSync(req.body.password);

            //user not found, save a new user in the database
            User.create(user)
                .then(data => {
                    const token = utils.generateToken(data);
                    //get basic user details
                    const userObj = utils.getCleanUser(data);
                    //return the token along with user details
                    return res.json({ user: userObj, access_token: token });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error ocurred while creating the user"
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving"
            });
        });
};


//retrieve all users from the database
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving"
            });
        });
};

//find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};

//update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully"
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

// // Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Find user by username and password
exports.findUserByUsernameAndPassword = (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  User.findOne({ where: { username: user, password: pwd } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     });
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   User.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };