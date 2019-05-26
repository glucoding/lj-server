/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {
    var users = require('../controllers/user.controller.js');

    // Get All Users
    app.get('/api/users', users.findAll);

    // Find a single User by Name
    app.get('/api/users/:name', users.findByName);

    // Find all Users with a given role
    app.get('/api/users/role/:roleId', users.findByRoleId);

    app.put('/api/users/update/:_id', users.update);

    app.delete('/api/users/:_id', users.delete);
}