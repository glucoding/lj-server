/**
 * Created by gehao on 2019/3/29.
 */
const config = require('../config/config.js');

const Role = require('../models/role.model.js');
const User = require('../models/user.model.js');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
let role = '';

exports.signup = (req, res) => {
    // Save User to Database
    console.log("Processing func -> SignUp");
    console.log(req.body);

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: bcrypt.hashSync(req.body.password, 8),
        region: req.body.region,
        orgId: req.body.orgId
    });

    // Save a User to the MongoDB
    user.save().then(savedUser => {
        Role.find({
            'name': { $in: req.body.roles.map(role => role.toUpperCase()) }
        }, (err, roles) => {
            if(err)
                res.status(500).send("Error -> " + err);

            // update User with Roles
            savedUser.roles = roles.map(role => role._id);
            savedUser.save(function (err) {
                if (err)
                    res.status(500).send("Error -> " + err);

                res.send("User registered successfully!");
            });
        });
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
}

exports.signin = (req, res) => {
    console.log("Sign-In");
    console.log(req.body);
    User.findOne({ username: req.body.username })
        .exec((err, user) => {
            if (err){
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        error: "User not found with Username = " + req.body.username,
                    });
                }
                return res.status(500).send({
                    error: "Error retrieving User with Username = " + req.body.username
                });
            }
            console.log(user.username);
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(200).send({ auth: false, accessToken: null, error: "InvalidCredentialsError" });
            }

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            Role.findOne({ _id: user.roles[0]}, function (err, doc){
                role = doc.name;
                console.log(doc)
                res.status(200).send({ auth: true, accessToken: token, username: user.username, role: role, region: user.region, uid: user._id, orgId: user.orgId});
            });
        });
}

exports.userContent = (req, res) => {
    User.findOne({ _id: req.userId })
        .select('-_id -__v -password')
        .populate('roles', '-_id -__v')
        .exec((err, user) => {
            if (err){
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with _id = " + req.userId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving User with _id = " + req.userId
                });
            }

            res.status(200).json({
                "description": "User Content Page",
                "user": user
            });
        });
}

exports.adminBoard = (req, res) => {
    User.findOne({ _id: req.userId })
        .select('-_id -__v -password')
        .populate('roles', '-_id -__v')
        .exec((err, user) => {
            if (err){
                if(err.kind === 'ObjectId') {
                    res.status(404).send({
                        message: "User not found with _id = " + req.userId
                    });
                    return;
                }

                res.status(500).json({
                    "description": "Can not access Admin Board",
                    "error": err
                });

                return;
            }

            res.status(200).json({
                "description": "Admin Board",
                "user": user
            });
        });
}

exports.managementBoard = (req, res) => {
    User.findOne({ _id: req.userId })
        .select('-_id -__v -password')
        .populate('roles', '-_id -__v')
        .exec((err, user) => {
            if (err){
                if(err.kind === 'ObjectId') {
                    res.status(404).send({
                        message: "User not found with _id = " + req.userId
                    });
                    return;
                }

                res.status(500).json({
                    "description": "Can not access PM Board",
                    "error": err
                });

                return;
            }

            res.status(200).json({
                "description": "PM Board",
                "user": user
            });
        });
}