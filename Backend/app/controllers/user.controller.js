// import User model
const User = require("../models/user.model");

const bcrypt = require('bcryptjs');

exports.test = (req, res) => {
    res.send("hello bitcessss");
}

// User Register function
exports.register = (req, res) => {
    let newUser = new User(req.body);
    User.findOne({mail: newUser.mail}, function (err, user) {
        if (user == null){
            //Crypter le mdp
            //newUser.password = bcrypt.hashSync(req.body.password, 10);
            newUser.save()
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
        }
        else {
            res.status(500).send()
        }
    })
};