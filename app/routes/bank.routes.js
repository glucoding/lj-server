/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {

    var banks = require('../controllers/bank.controller.js');

    // Create a new Customer
    app.post('/api/banks', banks.create);

    // Retrieve all Customer
    app.get('/api/banks', banks.findAll);

    // Retrieve a single Customer by Id
    app.get('/api/banks/:_id', banks.findOne);

    app.get('/api/banks/:bankName', banks.findOneByName);

    // Update a Customer with Id
    app.put('/api/banks/:_id', banks.update);

    // Delete a Customer with Id
    app.delete('/api/banks/:_id', banks.delete);
}