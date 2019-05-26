module.exports = function(app) {

    let controller = require('../controllers/upload.controller.js')

    app.post('/api/uploadFiles', controller.uploadFiles);

    app.post('/api/uploadSingleFile', controller.uploadFile);
}