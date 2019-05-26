var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//跨域访问设置
var cors = require('cors');
const corsConfig = {
    origin: '*',//http://localhost:8080',
    //credentials: true
};
app.use(cors(corsConfig));
app.options('*', cors());
//app.use(cors());

// Configuring the database
const config = require('./app/config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url).then(() => {
    console.log('Successfully connected to MongoDB.');
    //初始化角色,已内置角色，此句注释！
    //initial();
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes/router.js')(app);
require('./app/routes/enterprise.routes.js')(app);
require('./app/routes/role.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/init.routes.js')(app);
require('./app/routes/loanGuideApp.routes.js')(app);
require('./app/routes/upload.routes.js')(app);
require('./app/routes/article.routes.js')(app);
require('./app/routes/loanProduct.routes.js')(app);
require('./app/routes/loanProductApp.routes.js')(app);

// Create a Server
var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)

})

const Role = require('./app/models/role.model.js');
function initial(){
    Role.count( (err, count) => {
        if(!err && count === 0) {
            // USER Role ->
            new Role({
                name: 'USER'
            }).save( err => {
                if(err) return console.error(err.stack)
                console.log("USER_ROLE is added")
            });

            // ADMIN Role ->
            new Role({
                name: 'ADMIN'
            }).save( err => {
                if(err) return console.error(err.stack)
                console.log("ADMIN_ROLE is added")
            });

            // PM Role ->
            new Role({
                name: 'PM'
            }).save(err => {
                if(err) return console.error(err.stack)
                console.log("PM_ROLE is added")
            });
        }
    });
}