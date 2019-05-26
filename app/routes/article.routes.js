/**
 * Created by gehao on 2019/3/29.
 */
module.exports = function(app) {

    var article = require('../controllers/article.controller.js');

    // Create a new Customer
    app.post('/api/article', article.create);

    // Retrieve all Customer
    app.get('/api/articles', article.findAll);

    app.get('/api/articlesByType/:type', article.findAllByType);

    // Retrieve a single Customer by Id
    app.get('/api/articles/:_id', article.findOne);

    // Update a Customer with Id
    app.put('/api/articles/:_id', article.update);

    // Delete a Customer with Id
    app.delete('/api/articles/:_id', article.delete);
}