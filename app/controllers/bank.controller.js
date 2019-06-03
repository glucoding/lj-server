/**
 * Created by gehao on 2019/3/29.
 */
const Bank = require('../models/bank.model.js');


// POST a Enterprise
exports.create = (req, res) => {
    // Create a Enterprise
    const bank = new Bank({
        bankName: req.body.bankName,
        address: req.body.address,
        contact: req.body.contact,
        tel: req.body.tel,
        status: req.body.status
    });

    // Save a Enterprise in the MongoDB
    bank.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// FETCH all Enterprises
exports.findAll = (req, res) => {
    Bank.find()
        .then(banks => {
            res.send(banks);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// FIND a Enterprise
exports.findOne = (req, res) => {
    Bank.findById(req.params._id)
        .then(bank => {
            if(!bank) {
                return res.status(404).send({
                    message: "Bank not found with id " + req.params._id
                });
            }
            res.send(bank);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Bank not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Bank with id " + req.params._id
        });
    });
};

exports.findOneByName = (req, res) => {
    Bank.find({'bankName': req.params.bankName})
        .then(bank => {
            res.send(bank);
        }).catch(err => {
            res.status(500).send({
            message: err.message
        });

    });
};

// UPDATE a Enterprise
exports.update = (req, res) => {
    // Find enterprise and update it
    Bank.findByIdAndUpdate(req.params._id, {
        bankName: req.body.bankName,
        address: req.body.address,
        contact: req.body.contact,
        tel: req.body.tel,
        status: req.body.status
    }, {new: true})
        .then(bank => {
            if(!bank) {
                return res.status(404).send({
                    message: "Bank not found with id " + req.params._id
                });
            }
            res.send(bank);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Bank not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating bank with id " + req.params._id
        });
    });
};

// DELETE a Enterprise
exports.delete = (req, res) => {
    Bank.findByIdAndRemove(req.params._id)
        .then(bank => {
            if(!bank) {
                return res.status(404).send({
                    message: "Bank not found with id " + req.params._id
                });
            }
            res.send({message: "Bank deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Bank not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete bank with id " + req.params._id
        });
    });
};