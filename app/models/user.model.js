/**
 * Created by gehao on 2019/3/29.
 */
const mongoose = require('mongoose');
const Role = require('../models/role.model.js');
Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    mobile: String,
    password: String,
    roles : [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    region: String,
    orgId: String
});

module.exports = mongoose.model('User', UserSchema);