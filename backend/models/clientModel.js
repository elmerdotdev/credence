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
    position: {
        type: String
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
    active: {
        type: Boolean,
        default: true
    },
    pinned: {
        type: Boolean,
        default: false
    },
    labels: {
        type: Array
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