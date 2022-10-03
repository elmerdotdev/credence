const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    lastLoggedIn: {
        type: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)