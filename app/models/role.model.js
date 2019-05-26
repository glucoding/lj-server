/**
 * Created by gehao on 2019/3/29.
 */
const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Role', RoleSchema);