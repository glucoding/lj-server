/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {

    var requirement = require('../controllers/requirement.controller.js');

    // Create a new Customer
    app.post('/api/requirement', requirement.create);

    // Retrieve all Customer
    app.get('/api/requirement', requirement.findAll);

    app.get('/api/requirement/:entId', requirement.findAllByEnt);

    app.post('/api/requirement', requirement.findAllByCondition);

    // Retrieve a single Customer by Id
    app.get('/api/requirement/:_id', requirement.findOne);

    // Update a Customer with Id
    app.put('/api/requirement/:_id', requirement.update);

    // Delete a Customer with Id
    app.delete('/api/requirement/:_id', requirement.delete);
}