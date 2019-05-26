/**
 * Created by gehao on 2019/3/29.
 */
const Enterprise = require('../models/enterprise.model.js');


// POST a Enterprise
exports.create = (req, res) => {
    // Create a Enterprise
    const enterprise = new Enterprise({
        entName: req.body.entName, //企业名称
        rep: req.body.rep, //法定代表人
        registerAmount: req.body.registerAmount, //注册资本
        contact: req.body.contact, //联系人
        tel: req.body.tel, //联系电话
        mobile: req.body.mobile, //手机
        industryGrossProduce: req.body.industryGrossProduce, //工业总产值
        salesAmount: req.body.salesAmount, //销售额
        profit: req.body.profit, //利润
        taxContribute: req.body.taxContribute, //税金
        totalAsset: req.body.totalAsset, //总资产
        debtAmount: req.body.debtAmount, //负债总额
        debtRate: req.body.debtRate, //资产负债率
        entIntroduction: req.body.entIntroduction, //企业简介
        approveBy: req.body.approveBy, //经办科室
        remark: req.body.remark, //审核意见
        region:req.body.region, //所属区县
        status: req.body.status, //审核状态 1：申请中 2：已入库
    });

    // Save a Enterprise in the MongoDB
    enterprise.save()
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
    Enterprise.find()
        .then(enterprises => {
        res.send(enterprises);
}).catch(err => {
        res.status(500).send({
        message: err.message
    });
});
};

exports.findAllByRegion = (req, res) => {
    Enterprise.find({'region':req.params.region})
        .then(enterprises => {
            res.send(enterprises);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// FIND a Enterprise
exports.findOne = (req, res) => {
    Enterprise.findById(req.params._id)
        .then(enterprise => {
        if(!enterprise) {
        return res.status(404).send({
            message: "Enterprise not found with id " + req.params._id
        });
    }
    res.send(enterprise);
}).catch(err => {
        if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Enterprise not found with id " + req.params._id
        });
    }
    return res.status(500).send({
        message: "Error retrieving Enterprise with id " + req.params._id
    });
});
};

// UPDATE a Enterprise
exports.update = (req, res) => {
    // Find enterprise and update it
    Enterprise.findByIdAndUpdate(req.params._id, {
        entName: req.body.entName, //企业名称
        rep: req.body.rep, //法定代表人
        registerAmount: req.body.registerAmount, //注册资本
        contact: req.body.contact, //联系人
        tel: req.body.tel, //联系电话
        mobile: req.body.mobile, //手机
        industryGrossProduce: req.body.industryGrossProduce, //工业总产值
        salesAmount: req.body.salesAmount, //销售额
        profit: req.body.profit, //利润
        taxContribute: req.body.taxContribute, //税金
        totalAsset: req.body.totalAsset, //总资产
        debtAmount: req.body.debtAmount, //负债总额
        debtRate: req.body.debtRate, //资产负债率
        entIntroduction: req.body.entIntroduction, //企业简介
        approveBy: req.body.approveBy, //经办科室
        remark: req.body.remark, //审核意见
        region: req.body.region, //所属区县
        status: req.body.status, //审核状态 1：申请中 2：已入库
    }, {new: true})
        .then(enterprise => {
        if(!enterprise) {
        return res.status(404).send({
            message: "Enterprise not found with id " + req.params._id
        });
    }
    res.send(enterprise);
}).catch(err => {
        if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Enterprise not found with id " + req.params._id
        });
    }
    return res.status(500).send({
        message: "Error updating enterprise with id " + req.params._id
    });
});
};

// DELETE a Enterprise
exports.delete = (req, res) => {
    Enterprise.findByIdAndRemove(req.params._id)
        .then(enterprise => {
        if(!enterprise) {
        return res.status(404).send({
            message: "Enterprise not found with id " + req.params._id
        });
    }
    res.send({message: "Enterprise deleted successfully!"});
}).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "Enterprise not found with id " + req.params._id
        });
    }
    return res.status(500).send({
        message: "Could not delete enterprise with id " + req.params._id
    });
});
};