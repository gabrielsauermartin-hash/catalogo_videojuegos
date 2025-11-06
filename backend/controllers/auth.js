const jwt = require('jsonwebtoken');
const utils = require('../utils');
const bcrypt = require('bcryptjs');

const db = require("../models");
const User = db.user;

exports.signin = (req, res) => {
    const user = req.body.username;
    const pwd = req.body.password;

    //return 400 status if username/password does not exist
    if(!user || !pwd) {
        return res.status(400).json({
            error: true,
            message: "Username or Password required"
        });
    }

    //return 401 status if the credential does not match
    User.findOne({ where: { username: user} })
        .then(data => {
            const result = bcrypt.compareSync(pwd, data.password);
            if(!result) return res.status(401).send('Password not valid');

            //generate token
            const token = utils.generateToken(data);
            //get basic user details
            const userObj = utils.getCleanUser(data);
            return res.json({ user: userObj, access_token: token});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving"
            });
        });
};

exports.isAuthenticated = (req, res, next) => {
    //check header, url parameters or post parameters for token
    var token = req.token;
    if(!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required"
        });
    }
    //check token that was passed by decoding token using secret
    //.env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if(err) return res.status(401).json({
            error: true,
            message: "Invalid token"
        });

        User.findByPK(user.id)
            .then(data => {
                //return 401 status if the userId does not match
                if(!user.id){
                    return res.status(401).json({
                        error: true,
                        message: "Invalid user"
                    });
                }
                //get basic user details
                next();
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving user with id=" + id
                });
            });
    });
};