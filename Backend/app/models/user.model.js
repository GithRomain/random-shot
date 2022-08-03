const mongoose = require("mongoose");

//clef secrete
const key = "sqetrdytufigkjbhgfifukgiomoiuxghcj";

// import bcryptjs - hashing function
const bcrypt = require('bcryptjs');
// import jsonwebtoken
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    nom: {
        type: String,
        trim: true,
        required: true
    },

    prenom: {
        type: String,
        trim: true,
        required: true
    },

    mail: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },

    password: {  //est chiffré
        type: String,
        required: true
    },

    history: {
        type: [Object],
        default: []
    }
})

//Create a Schema method to compare password
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

//Fonction qui génere un token qu'on vérifiera par la suite
UserSchema.methods.generateAuthToken = function(){
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            mail: user.mail,
            password: user.password,
            dateDeNaissance: user.dateDeNaissance,
            local: user.local,
            urlImage: user.urlImage,
            subscription: user.subscription,
            numElecteur: user.numElecteur,
            autorisedElections: user.autorisedElections,
            createdElections: user.createdElections,
        }, key
    );
    return token;
}

//Fonction qui vérifie le token
UserSchema.methods.authorization = function () {
    const token = this.generateAuthToken();
    try {
        jwt.verify(token, key);
        return true
    } catch (err) {
        return false;
    }
}

module.exports = mongoose.model("User", UserSchema);