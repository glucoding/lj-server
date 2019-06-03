/**
 * Created by gehao on 2019/3/29.
 */
const LoanProduct = require('../models/loanproduct.model.js');


// POST a Enterprise
exports.create = (req, res) => {
    // Create a Enterprise
    const loanProduct = new LoanProduct({
        orgId: req.body.orgId,
        orgName: req.body.orgName, //金融机构名称
        name: req.body.name, //产品名称
        type: req.body.type, //产品类型
        serviceFor: req.body.serviceFor, //适用对象
        guaranteeBy: req.body.guaranteeBy, //担保方式
        interestRate: req.body.interestRate, //利率水平
        minimumAmount: req.body.minimumAmount, //最低额度
        maximumAmount: req.body.maximumAmount, //最高额度
        durationLimit: req.body.durationLimit, //融资期限
        remainingAmount: req.body.remainingAmount, //融资余额
        approveBy: req.body.approveBy, //审批权限
        intro: req.body.intro, //产品简要介绍
        img: req.body.img, //产品图片
        remark: req.body.remark //备注
    });

    // Save a Enterprise in the MongoDB
    loanProduct.save()
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
    LoanProduct.find()
        .then(loanProducts => {
            res.send(loanProducts);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllByBank = (req, res) => {
    LoanProduct.find({'orgId':req.params.orgId})
        .then(loanProducts => {
            res.send(loanProducts);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllByCondition = (req, res) => {
    console.log(req.body)
    LoanProduct.where('orgName').equals(req.body.orgName).where('type').equals(req.body.type).where('serviceFor').in(req.body.serviceFor).where('guaranteeBy').in(req.body.guaranteeBy)
        .then(loanProducts => {
            if(!loanProducts) {
                return res.status(404).send({
                    message: "Loan Products not found"
                });
            }
            res.send(loanProducts);
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
    LoanProduct.findById(req.params._id)
        .then(loanProduct => {
            if(!loanProduct) {
                return res.status(404).send({
                    message: "Loan Product not found with id " + req.params._id
                });
            }
            res.send(loanProduct);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Loan Product not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Loan Product with id " + req.params._id
        });
    });
};

// UPDATE a Enterprise
exports.update = (req, res) => {
    // Find enterprise and update it
    LoanProduct.findByIdAndUpdate(req.params._id, {
        orgId: req.body.orgId,
        orgName: req.body.orgName, //金融机构名称
        name: req.body.name, //产品名称
        type: req.body.type, //产品类型
        serviceFor: req.body.serviceFor, //适用对象
        guaranteeBy: req.body.guaranteeBy, //担保方式
        interestRate: req.body.interestRate, //利率水平
        minimumAmount: req.body.minimumAmount, //最低额度
        maximumAmount: req.body.maximumAmount, //最高额度
        durationLimit: req.body.durationLimit, //融资期限
        approveBy: req.body.approveBy, //审批权限
        intro: req.body.intro, //产品简要介绍
        img: req.body.img, //产品图片
        remark: req.body.remark //备注
    }, {new: true})
        .then(loanProduct => {
            if(!loanProduct) {
                return res.status(404).send({
                    message: "Loan Product not found with id " + req.params._id
                });
            }
            res.send(loanProduct);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Loan Product not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating Loan Product with id " + req.params._id
        });
    });
};

// DELETE a Enterprise
exports.delete = (req, res) => {
    LoanProduct.findByIdAndRemove(req.params._id)
        .then(enterprise => {
            if(!enterprise) {
                return res.status(404).send({
                    message: "Loan Product not found with id " + req.params._id
                });
            }
            res.send({message: "Loan Product deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Loan Product not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete Loan Product with id " + req.params._id
        });
    });
};