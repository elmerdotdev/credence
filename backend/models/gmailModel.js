const mongoose = require('mongoose')
 
const Schema = mongoose.Schema

const gmailSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    emailTime: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    client_id: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Gmail', gmailSchema)












