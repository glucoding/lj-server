/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {

    var roles = require('../controllers/role.controller.js')

    app.get('/api/roles', roles.findAll);
}