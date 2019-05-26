/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {

    var loanProductApp = require('../controllers/loanProductApp.controller.js');

    // Create a new Customer
    app.post('/api/loanProductApp', loanProductApp.create);

    // Retrieve all Customer
    app.get('/api/loanProductApp', loanProductApp.findAll);

    app.get('/api/loanProductAppByBank/:orgId', loanProductApp.findAllByBank);

    app.get('/api/loanProductAppByEnt/:entId', loanProductApp.findAllByEnt);

    // Retrieve a single Customer by Id
    app.get('/api/loanProductApp/:_id', loanProductApp.findOne);

    // Update a Customer with Id
    app.put('/api/loanProductApp/:_id', loanProductApp.update);

    // Delete a Customer with Id
    app.delete('/api/loanProductApp/:_id', loanProductApp.delete);
}