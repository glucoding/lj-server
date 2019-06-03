/**
 * Created by gehao on 2019/3/29.
 */
const mongoose = require('mongoose');
Schema = mongoose.Schema;

const BankSchema = mongoose.Schema({
    bankName: String,
    address: String,
    contact: String,
    tel: String,
    status: String
});

module.exports = mongoose.model('Bank', BankSchema);