const mongoose = require('mongoose');

const LoanGuideAppSchema = mongoose.Schema({
    entId: String,//申请企业ID
    entName: String,//申请企业
    rep: String,//法定代表人
    registerAmount: String, //注册资本
    estTime: String, //成立时间
    contact: String, //联系人
    tel: String, //电话
    mobile: String, //手机
    totalAsset: String, //资产总额
    totalLoan: String, //负债总额
    assetLoanRate: String, //资产负债
    loanBank: String, //贷款银行
    contractNumber: String, //流动资金贷款合同号
    loanAmount: String, //流动资金贷款总额
    loanRange: String, //流动资金贷款时限
    loanAmountFromSociety: String, //民间借贷资金额
    appAmount: String, //申请使用民营企业信贷引导资金额
    entComment: String, //申请民营企业信贷引导资金企业意见
    bankComment: String, //贷款银行对企业流动资金贷款审核意见1
    countyComment: String, //县区主管部门审核意见2
    countyGuideGroupComment: String, //县区民营企业信贷引导资金工作协调领导小组办公室审核意见3
    municipalComment: String, //市主管部门审核意见4
    depComment: String, //经办科室5
    municipalGuideGroupComment: String, //市民营企业信贷引导资金工作协调领导小组办公室审核意见6
    //age: { type: Number, min: 18, max: 65, required: true }

    assetGuarantee: String,
    land: String,
    factory: String,
    house: String,
    machine: String,
    assetOther: String,
    promiseGuarantee: String,
    thirdParty: String,
    shareHolder: String,
    mortgageeOther: String,
    reevaluate: String,
    attachments: [],

    appStatus: String //1-6
});

module.exports = mongoose.model('LoanGuideApp', LoanGuideAppSchema);