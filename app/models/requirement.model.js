/**
 * Created by gehao on 2019/3/29.
 */
const mongoose = require('mongoose');

const RequirementSchema = mongoose.Schema({
    entId: String,
    entName: String, //企业名称
    loanAmount: String, //融资金额
    loanTime: String, //预计融资时间
    loanWay: String,//融资方式
    entType: String, //企业类型
    loanUsage: String, //融资用途
    guaranteeBy: [],//可接受担保方式
    time: String
    //age: { type: Number, min: 18, max: 65, required: true }
});

module.exports = mongoose.model('Requirement', RequirementSchema);