/**
 * Created by gehao on 2019/3/29.
 */
const Role = require('../models/role.model.js');


exports.findAll = (req, res) => {
    Role.find()
        .then(roles => {
        res.send(roles);
}).catch(err => {
        res.status(500).send({
        message: err.message
    });
});
};