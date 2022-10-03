const mongoose = require('mongoose')

const Schema = mongoose.Schema

const clientSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    photo: {
        type: String
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Client', clientSchema)