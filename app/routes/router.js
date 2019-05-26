/**
 * Created by gehao on 2019/3/29.
 */
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
const cors = require('cors')

module.exports = function(app) {

    const controller = require('../controllers/verify.controller.js');

    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail/*, verifySignUp.checkRolesExisted*/], controller.signup);

    app.post('/api/auth/signin', cors(), controller.signin);

    app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);

    app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);

    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}