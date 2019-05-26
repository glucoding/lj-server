/**
 * Created by gehao on 2019/3/29.
 */
const Role = require('../models/role.model.js');
const User = require('../models/user.model.js');

exports.init = (req, res) => {

    // Add Subject to MongoDB
    var math = new Role({
        id: '01',
        name: 'Admin'
    });

    var computer = new Role({
        id: "02",
        name: 'M-User'
    });

    math.save(function (err){
        if(err) return console.error(err.stack)
        console.log("Math is added")
    });

    computer.save(function(err){
        if(err) return console.error(err.stack);
        console.log("Computer is added")
    })

    // Add Students to MongoDB
    var jack = new User({
        name: 'Jack',
        username: 'Davis',
        email: 'glu@ynu.edu.cn',
        password: 'fuck'
    });
    jack.roles.push(math._id, computer._id);

    var peter = new User({
        name: 'Peter',
        username: 'Thomas',
        email: 'glu@china.com',
        password:'fuck2'
    })
    peter.roles.push(math._id);

    peter.save(function(err){
        if(err) return console.log(err.stack);
        console.log("Peter is added")
    });

    jack.save(function(err){
        if(err) return console.log(err.stack);
        console.log("Jack is added");
    });

    // Return Message
    res.send("Done Initial Data!");
}