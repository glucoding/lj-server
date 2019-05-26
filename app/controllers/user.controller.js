/**
 * Created by gehao on 2019/3/29.
 */
const User = require('../models/user.model.js');
const Role = require('../models/role.model.js');

// Get All Users
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
        res.send(users);
}).catch(err => {
        res.status(500).send({
        message: err.message
    })
});
};

// Find a Student by firstname
exports.findByName = (req, res) => {
    User.findOne({ name: req.params.name })
        .populate('roles')
        .exec(function (err, user) {
            if (err){
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with given name " + req.params.name
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Student with given name" + req.params.name
                });
            }

            res.send(user);
        });
};

// Find all student learnt a given subject
exports.findByRoleId = (req, res) => {
    User.find({ roles : req.params.roleId })
        .exec(function (err, users) {
            if (err){
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with given Role Id " + req.params.roleId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving User with given role Id " + req.params.roleId
                });
            }

            res.send(users);
        });
};

// UPDATE a Enterprise
exports.update = (req, res) => {
    // Find enterprise and update it
    User.findByIdAndUpdate(req.params._id, {
        'username': req.body.username,
        'name': req.body.name,
        'password': req.body.password,
        'email': req.body.email,
        'mobile': req.body.mobile,
        'roles': req.body.roles
    }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params._id
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params._id
        });
    });
};

// DELETE a User
exports.delete = (req, res) => {
    console.log(req.params._id)
    User.findOneAndDelete({'_id': req.params._id})
        .then(user => {
            console.log(user);
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params._id
        });
    });
};