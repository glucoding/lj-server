/**
 * Created by gehao on 2019/3/29.
 */
const mongoose = require('mongoose');

const LoanProductAppSchema = mongoose.Schema({
    //企业基本信息
    entId: String, //企业id
    entName: String, //企业名称
    rep: String, //法定代表人
    repTel: String, //法定代表人电话
    repMobile: String, //法定代表人移动电话
    contact: String, //联系人
    contactTel: String, //联系电话
    contactMobile: String, //联系移动电话
    address: String, //企业地址
    email: String, //电子邮件
    industry: String, //所属行业
    numOfEmployees: String, //员工人数
    totalIncome: String, //税金
    totalAsset: String, //总资产

    //申请基本信息
    loanAmount:String, //借款金额
    duration: String, //期限
    usage: String, //借款用途
    orgId: String,
    productId: String, //信贷品种
    repaymentBy: String, //还款来源
    guaranteeBy: String, //担保方式
    selfBankLoan: String, //贷款人在本行过去贷款情况
    familyBankLoan: String, //贷款人家庭在本行过去贷款情况
    selfOtherBankLoan: String, //贷款人在其他银行贷款情况
    familyOtherBankLoan: String, //贷款人家庭在其他银行贷款情况
    attachments: [],


    submitTime: String,
    remark: String, //审核意见
    status: String, //审核状态 1：申请中 2：已入库

    //age: { type: Number, min: 18, max: 65, required: true }
});

module.exports = mongoose.model('LoanProductApp', LoanProductAppSchema);