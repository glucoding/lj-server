/**
 * Created by gehao on 2019/3/29.
 */
const mongoose = require('mongoose');

const EnterpriseSchema = mongoose.Schema({
    entName: String, //企业名称
    rep: String, //法定代表人
    registerAmount: String, //注册资本
    contact: String, //联系人
    tel: String, //联系电话
    mobile: String, //手机
    industryGrossProduce: String, //工业总产值
    salesAmount: String, //销售额
    profit: String, //利润
    taxContribute: String, //税金
    totalAsset: String, //总资产
    debtAmount: String, //负债总额
    debtRate: String, //资产负债率
    entIntroduction: String, //企业简介
    approveBy: String, //经办科室
    remark: String, //审核意见
    region: String,
    status: String, //审核状态 1：申请中 2：已入库


    //age: { type: Number, min: 18, max: 65, required: true }
});

module.exports = mongoose.model('Enterprise', EnterpriseSchema);