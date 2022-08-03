const mongoose = require("mongoose");

//clef secrete
const key = "uiaezhf§è!çseufh6789GZzufhzuidfh7Z7DçGFZçZIFZFUZG31261&&&dbhzjd";

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

module.exports = mongoose.model("User", UserSchema);