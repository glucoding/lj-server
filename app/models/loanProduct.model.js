/**
 * Created by gehao on 2019/3/29.
 */
const mongoose = require('mongoose');

const LoanProductSchema = mongoose.Schema({
    orgId: String,
    orgName: String, //金融机构名称
    name: String, //产品名称
    type: String, //产品类型
    serviceFor: [], //适用对象
    guaranteeBy: [], //担保方式
    interestRate: String, //利率水平
    minimumAmount: String, //最低额度
    maximumAmount: String, //最高额度
    durationLimit: String, //融资期限
    remainingAmount: String, //融资余额
    approveBy: String, //审批权限
    intro: String, //产品简要介绍
    img: String, //产品图片
    remark: String, //备注

    //status: String, //审核状态 1：申请中 2：已入库


    //age: { type: Number, min: 18, max: 65, required: true }
});

module.exports = mongoose.model('LoanProduct', LoanProductSchema);