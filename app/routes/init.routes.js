/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {

    var initialController = require('../controllers/init.controller.js');

    app.get('/api/init', initialController.init);
}