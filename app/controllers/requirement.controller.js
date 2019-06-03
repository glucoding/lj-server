/**
 * Created by gehao on 2019/3/29.
 */
const Requirement = require('../models/requirement.model.js');


// POST a Enterprise
exports.create = (req, res) => {
    // Create a Enterprise
    const requirement = new Requirement({
        entId: req.body.entId,
        entName: req.body.entName, //企业名称
        loanAmount: req.body.loanAmount, //融资金额
        loanTime: req.body.loanTime, //预计融资时间
        loanWay: req.body.loanWay,//融资方式
        entType: req.body.entType, //企业类型
        loanUsage: req.body.loanUsage, //融资用途
        guaranteeBy: req.body.guaranteeBy,//担保方式
        time: req.body.time //发布时间
    });

    // Save a Enterprise in the MongoDB
    requirement.save()
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
    Requirement.find()
        .then(requirements => {
            res.send(requirements);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllByRegion = (req, res) => {
    Requirement.find({'region':req.params.region})
        .then(enterprises => {
            res.send(enterprises);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllByEnt = (req, res) => {
    Requirement.find({'entId':req.params.entId})
        .then(requirements => {
            res.send(requirements);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllByCondition = (req, res) => {
    console.log(req.body)
    Requirement.where('orgName').equals(req.body.orgName).where('type').equals(req.body.type).where('serviceFor').in(req.body.serviceFor).where('guaranteeBy').in(req.body.guaranteeBy)
        .then(requirements => {
            if(!requirements) {
                return res.status(404).send({
                    message: "Loan Products not found"
                });
            }
            res.send(requirements);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Loan Product not found"
            });
        }
        return res.status(500).send({
            message: "Error to find Loan Products"
        });
    })
};


// FIND a Enterprise
exports.findOne = (req, res) => {
    Requirement.findById(req.params._id)
        .then(requirement => {
            if(!requirement) {
                return res.status(404).send({
                    message: "Requirement not found with id " + req.params._id
                });
            }
            res.send(requirement);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Requirement not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Requirement with id " + req.params._id
        });
    });
};

// UPDATE a Enterprise
exports.update = (req, res) => {
    // Find enterprise and update it
    Requirement.findByIdAndUpdate(req.params._id, {
        entId: req.body.entId,
        entName: req.body.entName, //企业名称
        loanAmount: req.body.loanAmount, //融资金额
        loanTime: req.body.loanTime, //预计融资时间
        loanWay: req.body.loanWay,//融资方式
        entType: req.body.entType, //企业类型
        loanUsage: req.body.loanUsage, //融资用途
        guaranteeBy: req.body.guaranteeBy,//担保方式
        time: req.body.time
    }, {new: true})
        .then(requirement => {
            if(!requirement) {
                return res.status(404).send({
                    message: "Requirement not found with id " + req.params._id
                });
            }
            res.send(requirement);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Requirement not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating requirement with id " + req.params._id
        });
    });
};

// DELETE a Enterprise
exports.delete = (req, res) => {
    Requirement.findByIdAndRemove(req.params._id)
        .then(requirement => {
            if(!requirement) {
                return res.status(404).send({
                    message: "Requirement not found with id " + req.params._id
                });
            }
            res.send({message: "Requirement deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Requirement not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete requirement with id " + req.params._id
        });
    });
};