/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {

    var loanProduct = require('../controllers/loanProduct.controller.js');

    // Create a new Customer
    app.post('/api/loanProduct', loanProduct.create);

    // Retrieve all Customer
    app.get('/api/loanProduct', loanProduct.findAll);

    app.get('/api/loanProductByBank/:orgId', loanProduct.findAllByBank);

    app.post('/api/loanProductByCondition', loanProduct.findAllByCondition);

    // Retrieve a single Customer by Id
    app.get('/api/loanProduct/:_id', loanProduct.findOne);

    // Update a Customer with Id
    app.put('/api/loanProduct/:_id', loanProduct.update);

    // Delete a Customer with Id
    app.delete('/api/loanProduct/:_id', loanProduct.delete);
}