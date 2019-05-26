/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {

    var loanGuideApp = require('../controllers/loanGuideApp.controller.js');

    // Create a new Customer
    app.post('/api/loanGuideApp', loanGuideApp.create);

    // Retrieve all Customer
    app.get('/api/loanGuideApps', loanGuideApp.findAll);

    // Retrieve a single Customer by Id
    app.get('/api/loanGuideApps/:_id', loanGuideApp.findOne);

    // Update a Customer with Id
    app.put('/api/loanGuideApps/:id', loanGuideApp.update);

    // Delete a Customer with Id
    app.delete('/api/loanGuideApps/:id', loanGuideApp.delete);
}