/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {

    var enterprises = require('../controllers/enterprise.controller.js');

    // Create a new Customer
    app.post('/api/enterprises', enterprises.create);

    // Retrieve all Customer
    app.get('/api/enterprises', enterprises.findAll);

    app.get('/api/enterprisesByRegion', enterprises.findAllByRegion);

    // Retrieve a single Customer by Id
    app.get('/api/enterprises/:_id', enterprises.findOne);

    // Update a Customer with Id
    app.put('/api/enterprises/:_id', enterprises.update);

    // Delete a Customer with Id
    app.delete('/api/enterprises/:_id', enterprises.delete);
}