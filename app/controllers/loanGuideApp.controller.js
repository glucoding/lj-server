/**
 * Created by gehao on 2019/3/29.
 */
const LoanGuideApp = require('../models/loanGuideApp.model.js');
//const uuidv4 = require('uuid/v4');


// POST a Enterprise
exports.create = (req, res) => {
    // Create a Enterprise
    const loanGuideApp = new LoanGuideApp({
        entId: req.body.entId,//申请企业ID
        entName: req.body.entName,//申请企业
        rep: req.body.rep,//法定代表人
        registerAmount: req.body.registerAmount, //注册资本
        estTime: req.body.estTime, //成立时间
        contact: req.body.contact, //联系人
        tel: req.body.tel, //电话
        mobile: req.body.mobile, //手机
        totalAsset: req.body.totalAsset, //资产总额
        totalLoan: req.body.totalLoan, //负债总额
        assetLoanRate: req.body.assetLoanRate, //资产负债
        loanBank: req.body.loanBank, //贷款银行
        contractNumber: req.body.contractNumber, //流动资金贷款合同号
        loanAmount: req.body.loanAmount, //流动资金贷款总额
        loanRange: req.body.loanRange, //流动资金贷款时限
        loanAmountFromSociety: req.body.loanAmountFromSociety, //民间借贷资金额
        //guarantee: req.body.guarantee, //担保方式
        //mortgagee: req.body.mortgagee, //抵押物是否需重新评估
        appAmount: req.body.appAmount, //申请使用民营企业信贷引导资金额
        entComment: req.body.entComment, //申请民营企业信贷引导资金企业意见
        bankComment: req.body.bankComment, //贷款银行对企业流动资金贷款审核意见1
        countyComment: req.body.countyComment, //县区主管部门审核意见2
        countyGuideGroupComment: req.body.countyGuideGroupComment, //县区民营企业信贷引导资金工作协调领导小组办公室审核意见3
        municipalComment: req.body.municipalComment, //市主管部门审核意见4
        depComment: req.body.depComment, //经办科室5
        municipalGuideGroupComment: req.body.municipalGuideGroupComment, //市民营企业信贷引导资金工作协调领导小组办公室审核意见6
        //age: { type: Number, min: 18, max: 65, required: true }

        assetGuarantee: req.body.assetGuarantee,
        land: req.body.land,
        factory: req.body.factory,
        house: req.body.house,
        machine: req.body.machine,
        assetOther: req.body.assetOther,
        promiseGuarantee: req.body.promiseGuarantee,
        thirdParty: req.body.thirdParty,
        shareHolder: req.body.shareHolder,
        mortgageeOther: req.body.mortgageeOther,
        reevaluate: req.body.reevaluate,
        attachments: req.body.attachments,

        appStatus: req.body.appStatus //1-6
    });

    // Save a Enterprise in the MongoDB
    loanGuideApp.save()
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
    console.log("in loanGuideApp")
    LoanGuideApp.find()
        .then(loanGuideApps => {
            res.send(loanGuideApps);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// FIND a Enterprise
exports.findOne = (req, res) => {
    LoanGuideApp.findById(req.params._id)
        .then(loanGuideApp => {
            if(!loanGuideApp) {
                return res.status(404).send({
                    message: "LoanGuideApp not found with id " + req.params._id
                });
            }
            res.send(loanGuideApp);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "LoanGuideApp not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving LoanGuideApp with id " + req.params._id
        });
    });
};

// UPDATE a Enterprise
exports.update = (req, res) => {
    // Find enterprise and update it
    console.log("got the request")
    LoanGuideApp.findOneAndUpdate(req.params._id, {
        entId: req.body.entId,//申请企业ID
        entName: req.body.entName,//申请企业
        rep: req.body.rep,//法定代表人
        registerAmount: req.body.registerAmount, //注册资本
        estTime: req.body.estTime, //成立时间
        contact: req.body.contact, //联系人
        tel: req.body.tel, //电话
        mobile: req.body.mobile, //手机
        totalAsset: req.body.totalAsset, //资产总额
        totalLoan: req.body.totalLoan, //负债总额
        assetLoanRate: req.body.assetLoanRate, //资产负债
        loanBank: req.body.loanBank, //贷款银行
        contractNumber: req.body.contractNumber, //流动资金贷款合同号
        loanAmount: req.body.loanAmount, //流动资金贷款总额
        loanRange: req.body.loanRange, //流动资金贷款时限
        loanAmountFromSociety: req.body.loanAmountFromSociety, //民间借贷资金额
        appAmount: req.body.appAmount, //申请使用民营企业信贷引导资金额
        entComment: req.body.entComment, //申请民营企业信贷引导资金企业意见
        bankComment: req.body.bankComment, //贷款银行对企业流动资金贷款审核意见1
        countyComment: req.body.countyComment, //县区主管部门审核意见2
        countyGuideGroupComment: req.body.countyGuideGroupComment, //县区民营企业信贷引导资金工作协调领导小组办公室审核意见3
        municipalComment: req.body.municipalComment, //市主管部门审核意见4
        depComment: req.body.depComment, //经办科室5
        municipalGuideGroupComment: req.body.municipalGuideGroupComment, //市民营企业信贷引导资金工作协调领导小组办公室审核意见
        appStatus:req.body.appStatus,
        assetGuarantee: req.body.assetGuarantee,
        land: req.body.land,
        factory: req.body.factory,
        house: req.body.house,
        machine: req.body.machine,
        assetOther: req.body.assetOther,
        thirdParty: req.body.thirdParty,
        shareHolder: req.body.shareHolder,
        mortgageeOther: req.body.mortgageeOther,
        reevaluate: req.body.reevaluate,
        attachments: req.body.attachments
    }, {new: true})
        .then(loanGuideApp => {
            console.log(loanGuideApp)
            if(!loanGuideApp) {
                return res.status(404).send({
                    message: "LoanGuideApp not found with id " + req.params._id
                });
            }
            res.send(loanGuideApp);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "LoanGuideApp not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating loanGuideApp with id " + req.params._id
        });
    });
};

// DELETE a Enterprise
exports.delete = (req, res) => {
    LoanGuideApp.findByIdAndRemove(req.params._id)
        .then(loanGuideApp => {
            if(!loanGuideApp) {
                return res.status(404).send({
                    message: "LoanGuideApp not found with id " + req.params._id
                });
            }
            res.send({message: "LoanGuideApp deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "LoanGuideApp not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete loanGuideApp with id " + req.params._id
        });
    });
};