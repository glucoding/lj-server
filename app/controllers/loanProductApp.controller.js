/**
 * Created by gehao on 2019/3/29.
 */
const LoanProductApp = require('../models/loanProductApp.model.js');


// POST a Enterprise
exports.create = (req, res) => {
    // Create a Enterprise
    const loanProductApp = new LoanProductApp({
        //企业基本信息
        entId: req.body.entId, //企业id
        entName: req.body.entName, //企业名称
        rep: req.body.rep, //法定代表人
        repTel: req.body.repTel, //法定代表人电话
        repMobile: req.body.repMobile, //法定代表人移动电话
        contact: req.body.contact, //联系人
        contactTel: req.body.contactTel, //联系电话
        contactMobile: req.body.contactMobile, //联系移动电话
        address: req.body.address, //企业地址
        email: req.body.email, //电子邮件
        industry: req.body.industry, //所属行业
        numOfEmployees: req.body.numOfEmployees, //员工人数
        totalIncome: req.body.totalIncome, //税金
        totalAsset: req.body.totalAsset, //总资产

        //申请基本信息
        loanAmount:req.body.loanAmount, //借款金额
        duration: req.body.duration, //期限
        usage: req.body.usage, //借款用途
        orgId: req.body.orgId,
        productId: req.body.productId, //信贷品种
        repaymentBy: req.body.repaymentBy, //还款来源
        guaranteeBy: req.body.guaranteeBy, //担保方式
        selfBankLoan: req.body.selfBankLoan, //贷款人在本行过去贷款情况
        familyBankLoan: req.body.familyBankLoan, //贷款人家庭在本行过去贷款情况
        selfOtherBankLoan: req.body.selfOtherBankLoan, //贷款人在其他银行贷款情况
        familyOtherBankLoan: req.body.familyOtherBankLoan, //贷款人家庭在其他银行贷款情况
        attachments: req.body.attachments,


        submitTime: req.body.submitTime,
        remark: req.body.remark, //审核意见
        status: req.body.status //审核状态 1：申请中 2：已入库
    });

    // Save a Enterprise in the MongoDB
    loanProductApp.save()
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
    LoanProductApp.find()
        .then(loanProductApp => {
            res.send(loanProductApp);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllByBank = (req, res) => {
    LoanProductApp.find({'orgId':req.params.orgId})
        .then(loanProductApps => {
            res.send(loanProductApps);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllByEnt = (req, res) => {
    LoanProductApp.find({'entId':req.params.entId})
        .then(loanProductApps => {
            res.send(loanProductApps);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// FIND a Enterprise
exports.findOne = (req, res) => {
    LoanProductApp.findById(req.params._id)
        .then(loanProductApp => {
            if(!loanProductApp) {
                return res.status(404).send({
                    message: "Loan Product App not found with id " + req.params._id
                });
            }
            res.send(loanProductApp);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Loan Product App not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Loan Product App with id " + req.params._id
        });
    });
};

// UPDATE a Enterprise
exports.update = (req, res) => {
    // Find enterprise and update it
    LoanProductApp.findByIdAndUpdate(req.params._id, {
        //企业基本信息
        entId: req.body.entId, //企业id
        entName: req.body.entName, //企业名称
        rep: req.body.rep, //法定代表人
        repTel: req.body.repTel, //法定代表人电话
        repMobile: req.body.repMobile, //法定代表人移动电话
        contact: req.body.contact, //联系人
        contactTel: req.body.contactTel, //联系电话
        contactMobile: req.body.contactMobile, //联系移动电话
        address: req.body.address, //企业地址
        email: req.body.email, //电子邮件
        industry: req.body.industry, //所属行业
        numOfEmployees: req.body.numOfEmployees, //员工人数
        totalIncome: req.body.totalIncome, //税金
        totalAsset: req.body.totalAsset, //总资产

        //申请基本信息
        loanAmount:req.body.loanAmount, //借款金额
        duration: req.body.duration, //期限
        usage: req.body.usage, //借款用途
        orgId: req.body.orgId,
        productId: req.body.productId, //信贷品种
        repaymentBy: req.body.repaymentBy, //还款来源
        guaranteeBy: req.body.guaranteeBy, //担保方式
        selfBankLoan: req.body.selfBankLoan, //贷款人在本行过去贷款情况
        familyBankLoan: req.body.familyBankLoan, //贷款人家庭在本行过去贷款情况
        selfOtherBankLoan: req.body.selfOtherBankLoan, //贷款人在其他银行贷款情况
        familyOtherBankLoan: req.body.familyOtherBankLoan, //贷款人家庭在其他银行贷款情况
        attachments: req.body.attachments,


        submitTime: req.body.submitTime,
        remark: req.body.remark, //审核意见
        status: req.body.status
    }, {new: true})
        .then(loanProductApp => {
            if(!loanProductApp) {
                return res.status(404).send({
                    message: "Loan Product App not found with id " + req.params._id
                });
            }
            res.send(loanProductApp);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Loan Product App not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating Loan Product App with id " + req.params._id
        });
    });
};

// DELETE a Enterprise
exports.delete = (req, res) => {
    LoanProductApp.findByIdAndRemove(req.params._id)
        .then(loanProductApp => {
            if(!loanProductApp) {
                return res.status(404).send({
                    message: "Loan Product App not found with id " + req.params._id
                });
            }
            res.send({message: "Loan Product App deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Loan Product App not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete Loan Product with id " + req.params._id
        });
    });
};